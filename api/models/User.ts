import mongoose, { Schema, model, Types, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { UserFields, UserMethods, UserModel } from "../types";
import { randomUUID } from "crypto";

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (
          this: HydratedDocument<UserFields>,
          email: string
        ) {
          if (!this.isModified("email")) return true;
          const user = await User.findOne({ email: email });
          if (user) return false;
          return true;
        },
        message: "This user is already registered!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    token: {
      type: String,
      required: true,
    },
    displayName: String,
    googleID: String,
  },
  {
    versionKey: false,
  }
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model<UserFields, UserModel>("User", UserSchema);

export default User;
