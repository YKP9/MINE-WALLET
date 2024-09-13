import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

// Transfer funds from one user to another.

const transferFunds = asyncHandler(async (req, res) => {
  const { sender, receiver, amount, reference, status } = req.body;

 

  // Convert amount to number

  const parsedAmount = parseFloat(amount);

 

  //check if sender and receiver exists
  const senderUser = await User.findById(sender);
  const receiverUser = await User.findById(receiver);

  if (!senderUser) {
    throw new ApiError(404, "Sender user not found");
  }

  if (!receiverUser) {
    throw new ApiError(404, "Receiver user not found");
  }

  // Check if sender has enough balance
  if (senderUser.balance < parsedAmount) {
    throw new ApiError(400, "Insufficient funds");
  }

  // Use Mongo DB Session for Atomic Opeartions

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newTransaction = new Transaction({
      sender,
      receiver,
      amount: parsedAmount,
      reference: reference || "no reference",
      status: status || "pending",
    });
    await newTransaction.save({ session });

    // Update Balance of sender and receiver
    senderUser.balance -= parsedAmount;
    receiverUser.balance += parsedAmount;
    await senderUser.save({ session });
    await receiverUser.save({ session });

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json(new ApiResponse(201, newTransaction, "Transaction successful"));
  } catch (error) {
    console.error("Transaction error:", error); // Log error details
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, "Transaction failed");
  }
});

// Verify Receiver Account.

const verifyReceiver = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.receiver);

  if (!user) {
    throw new ApiError(404, " Receiver Not Found");
  }

  return res.status(200).json(new ApiResponse(200, user, "Account Verified"));
});

export { transferFunds, verifyReceiver };
