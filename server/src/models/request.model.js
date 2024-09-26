import mongoose from "mongoose";



const requestSchema = new mongoose.Schema(
    {
sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
        validator: function (v) {
          return v !== this.receiver;
        },
        message: "Sender and Receiver cannot be same person",
      }
    
},
receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
        validator: function (v) {
          return v !== this.sender;
        },
        message: "Receiver and Sender cannot be same person",
      }
},
amount: {
    type: Number,
    required: true,
},
description: {
    type: String,
    default: "no description",
    max : [255, "Description is too long"]
},
status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
},
    }
    ,
    {timestamps: true}
);

export const Request = mongoose.model("Requests", requestSchema)