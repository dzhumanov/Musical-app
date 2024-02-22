import express from "express";
import mongoose from "mongoose";
import { imageUpload } from "../multer";
import Track from "../models/Track";
import Album from "../models/Album";

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

tracksRouter.post("/", imageUpload.single("image"), async (req, res, next) => {
  try {
    const trackData = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      trackNumber: req.body.trackNumber,
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
});

export default tracksRouter;
