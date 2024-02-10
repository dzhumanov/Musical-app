import express from "express";
import mongoose, { mongo } from "mongoose";
import { imagesUpload } from "../multer";
import Album from "../models/Album";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
  try {
    let albums;

    if (req.query.artist) {
      albums = await Album.find({ artist: req.query.artist }).populate(
        "artist",
        "name"
      );
    } else {
      albums = await Album.find().populate("artist", "name");
    }

    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  try {
    const albumData = {
      name: req.body.name,
      artist: req.body.artist,
      date: req.body.date,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);

    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default albumsRouter;
