import mongoose, { set } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validate } from "uuid";
import e from "express";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      maxlength: [6, "Username max length is 6 characters"],
      validate: {
        validator: function (v) {
          const alphabetRegex = /^[a-zA-Z]/; // Only alphabets
          const numericRegex = /^\d+$/; // Only numbers
          const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric

          // Allow if only alphabets or alphanumeric, reject if only numbers
          if (numericRegex.test(v) || !alphabetRegex.test(v.charAt(0))) {
            return false; // Reject if username contains only numbers
          }
          return alphabetRegex.test(v) || alphanumericRegex.test(v); // Accept if only alphabets or alphanumeric
        },
        message: (props) => `${props.value} is not a valid username!`,
      },
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v); // Validate only alphabets
        },
        message: (props) => `${props.value} is not a valid name!`,
      },
      minlength: [3, "Name is too short"],
      maxlength: [20, "Name is too long"],
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v); // Validate only alphabets
        },
        message: (props) => `${props.value} is not a valid name!`,
      },
      minlength: [3, "Name is too short"],
      maxlength: [20, "Name is too long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Validate email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^(\+91)?\d{10}$/.test(v); // Validate Indian phone number format
        },
        message: (props) =>
          `${props.value} is not a valid Indian phone number!`,
      },
      set: (v) => {
        // Normalize the phone number to always include the +91 country code
        v = v.replace(/\D/g, ""); // Remove non-numeric characters
        if (v.length === 10) {
          return `+91${v}`; // Add +91 if it's not there
        }
        return v;
      },
    },
    identificationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    identificationType: {
      type: String,
      required: true,
      enum: ["Aadhar", "PAN"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Address is too short"],
      maxlength: [201, "Address is too long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#_$&?!*])[A-Za-z\d@#_$&?!*]{8,16}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid password!`,
      },
    },
    // profilePicture: {
    //     type: String,
    //     required : true,
    // },
    balance: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      lastName: this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
