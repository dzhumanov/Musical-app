import express from "express";
import mongoose, { Types } from "mongoose";
import { imageUpload } from "../multer";
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

artistsRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const product = await Artist.findById(_id);

    if (!product) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(product);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post("/", imageUpload.single("photo"), async (req, res, next) => {
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
});

export default artistsRouter;
