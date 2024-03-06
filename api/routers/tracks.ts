import express from "express";
import mongoose from "mongoose";
import { imageUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import Track from "../models/Track";
import Album from "../models/Album";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res, next) => {
  try {
    let tracks;

    if (req.query.album) {
      tracks = await Track.find({ album: req.query.album })
        .populate("album", "name")
        .sort({ trackNumber: 1 });
    } else if (req.query.artist) {
      const albums = await Album.find({ artist: req.query.artist });
      const idArray = albums.map((album) => album._id);
      tracks = await Track.find({ album: { $in: idArray } }).populate(
        "album",
        "name"
      );
    } else {
      tracks = await Track.find().populate("album", "name");
    }

    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      const trackData = {
        name: req.body.name,
        album: req.body.album,
        duration: req.body.duration,
        trackNumber: req.body.trackNumber,
        user: req.user?._id,
      };

      const track = new Track(trackData);

      await track.save();
      return res.send(track);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  }
);

tracksRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const track = await Track.findById(req.params.id);
      if (!track) {
        return res.status(404).send({ error: "Artist not found!" });
      }
      track.isPublished = !track.isPublished;
      await track.save();
      res.send(track);
    } catch (error) {
      next(error);
    }
  }
);

tracksRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const trackId = req.params.id;

      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).send({ error: "Track not found!" });
      }

      await Track.findByIdAndDelete(trackId);

      return res.send({ message: "Track deleted." });
    } catch (e) {
      next(e);
    }
  }
);

export default tracksRouter;
