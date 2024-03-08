import mongoose, { Schema, model, Types } from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const artist = await Artist.findById(value);
          return Boolean(artist);
        },
        message: "Artist does not exist!",
      },
    },
    date: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Album = model("Album", AlbumSchema);

export default Album;
