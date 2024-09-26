import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min : [1, "Amount Must Be Atleast 1"]
    },
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

    reference: {
      type: String,
      default: "no reference",
      max : [255, "Reference is too long"]

    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "success", "failed"],
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
