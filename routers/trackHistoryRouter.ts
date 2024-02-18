import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req, res, next) => {
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
      res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default trackHistoryRouter;
