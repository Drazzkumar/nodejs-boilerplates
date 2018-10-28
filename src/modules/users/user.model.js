import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import { hashSync, compareSync } from "bcrypt-nodejs";

import { passwordReg } from "./user.validations";
import constants from "../../config/constants";

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
    required: [true, "Email is required!"],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "{VALUE} is not valid email!"
    }
  },
  firstName: {
    type: String,
    required: [true, "FirstName is required!"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "LastName is required!"],
    trim: true
  },
  address: {
    type: String,
    required: [true, "LastName is required!"],
    trim: true
  },
  userName: {
    type: String,
    required: [true, "UserName is required!"],
    trim: true,
    index: { unique: true }
  },
  credits: {
    type: Number,
    default: 0
  },
  joinAt: {
    type: Date,
    default: Date.now
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
    trim: true,
    minlength: [6, "Password need to be longer!"],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message:
        "{VALUE} is not a valid password!. Password most contain capital letter special character and Numerical values"
    }
  }
});

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});
UserSchema.methods = {
  // Hasing and varifying password
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  // jwt methods
  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET, {
      expiresIn: 60 * 60
    });
  },
  toAuthJSON() {
    return {
      credits: this.credits,
      email: this.email,
      userName: this.userName,
      name: `${this.firstName} ${this.lastName}`
    };
  },
  toReceiverJSON() {
    return {
      id: this.id,
      receiver: `${this.firstName} ${this.lastName}`
    };
  },
  toJSON() {
    return {
      token: `JWT ${this.createToken()}`
    };
  }
};

export default mongoose.model("User", UserSchema);
