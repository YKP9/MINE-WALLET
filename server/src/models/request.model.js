import mongoose from "mongoose";



const requestSchema = new mongoose.Schema(
    {
sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
amount: {
    type: Number,
    required: true,
},
description: {
    type: String,
    default: "no description",
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