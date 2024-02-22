import { Schema, model, Types } from "mongoose";
import Album from "./Album";

const TrackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const album = await Album.findById(value);
          return Boolean(album);
        },
        message: "Album does not exist!",
      },
    },
    duration: {
      type: String,
      required: true,
    },
    trackNumber: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Track = model("Track", TrackSchema);

export default Track;
