import express from "express";
import mongoose, { Types } from "mongoose";
import { imageUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import Album from "../models/Album";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
  try {
    let albums;

    if (req.query.artist) {
      albums = await Album.find({ artist: req.query.artist })
        .populate("artist", "name")
        .sort({ date: -1 });
    } else {
      albums = await Album.find().populate("artist", "name");
    }

    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const product = await Album.findById(_id).populate("artist", "name");

    if (!product) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(product);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      const albumData = {
        name: req.body.name,
        artist: req.body.artist,
        date: req.body.date,
        image: req.file ? req.file.filename : null,
        user: req.user?._id,
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
  }
);

albumsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).send({ error: "Artist not found!" });
      }
      album.isPublished = !album.isPublished;
      await album.save();
      res.send(album);
    } catch (error) {
      next(error);
    }
  }
);

albumsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const albumId = req.params.id;

      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).send({ error: "Album not found!" });
      }

      await Album.findByIdAndDelete(albumId);

      return res.send({ message: "Album deleted." });
    } catch (e) {
      next(e);
    }
  }
);

export default albumsRouter;
