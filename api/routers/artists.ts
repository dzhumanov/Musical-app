import express from "express";
import mongoose, { Types } from "mongoose";
import { imageUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import Artist from "../models/Artist";
import permit from "../middleware/permit";

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

    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post(
  "/",
  auth,
  imageUpload.single("photo"),
  async (req: RequestWithUser, res, next) => {
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

artistsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const artist = await Artist.findById(req.params.id);
      if (!artist) {
        return res.status(404).send({ error: "Artist not found!" });
      }
      artist.isPublished = !artist.isPublished;
      await artist.save();
      res.send(artist);
    } catch (error) {
      next(error);
    }
  }
);

artistsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const artistId = req.params.id;

      const artist = await Artist.findById(artistId);
      if (!artist) {
        return res.status(404).send({ error: "Artist not found!" });
      }

      await Artist.findByIdAndDelete(artistId);

      return res.send({ message: "Artist deleted." });
    } catch (e) {
      next(e);
    }
  }
);

export default artistsRouter;
