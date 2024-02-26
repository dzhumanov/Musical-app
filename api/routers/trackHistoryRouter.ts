import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import auth, { RequestWithUser } from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get("/", auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;

    const tracks = await TrackHistory.find({ username: userId })
      .sort({ datetime: -1 })
      .populate("artist track", "name title");

    const result = tracks.map((track) => ({
      _id: track._id,
      track: track.track,
      artist: track.artist,
      datetime: track.datetime,
    }));

    res.send(result);
  } catch (e) {
    next(e);
  }
});

trackHistoryRouter.post("/", auth, async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ error: "You are not authorized!" });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).send({ error: "Incorrect token!" });
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
    });

    await trackHistory.save();
    console.log(trackHistory)
    res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default trackHistoryRouter;
