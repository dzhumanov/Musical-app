import { Schema, model } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Artist = model("Artist", ArtistSchema);

export default Artist;
