import express from "express";
import mongoose, { mongo } from "mongoose";
import { imagesUpload } from "../multer";
import Album from "../models/Album";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res, next) => {
  try {
    let tracks;

    if (req.query.album) {
      tracks = await Track.find({ album: req.query.album }).populate(
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

tracksRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  try {
    const trackData = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
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
