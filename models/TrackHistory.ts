import { Schema, model } from "mongoose";

const TrackHistorySchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const TrackHistory = model("TrackHistory", TrackHistorySchema);

export default TrackHistory;
