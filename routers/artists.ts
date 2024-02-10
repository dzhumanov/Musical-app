import express from "express";
import mongoose, { mongo } from "mongoose";
import { imagesUpload } from "../multer";
import Artist from "../models/Artist";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post(
  "/",
  imagesUpload.single("photo"),
  async (req, res, next) => {
    try {
      const artistData = {
        name: req.body.name,
        info: req.body.info,
        photo: req.file ? req.file.filename : null,
      };

      const artist = new Artist(artistData);

      await artist.save();
      return res.send(artist);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  }
);

export default artistsRouter;
