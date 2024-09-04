import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    identificationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    identificationType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
    timestamps: true
 }
);

export const User = mongoose.model("User", userSchema);

// const userSchema = new mongoose.Schema({
//     phoneNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       validate: {
//         validator: function(v) {
//           return /^(\+91)?\d{10}$/.test(v);  // Validate Indian phone number format
//         },
//         message: props => `${props.value} is not a valid Indian phone number!`
//       },
//       set: v => {
//         // Normalize the phone number to always include the +91 country code
//         v = v.replace(/\D/g, '');  // Remove non-numeric characters
//         if (v.length === 10) {
//           return `+91${v}`;  // Add +91 if it's not there
//         }
//         return v;
//       }
//     }
//   });
