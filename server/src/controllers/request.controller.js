import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import mongoose from "mongoose";
// Get All Requests For a User

const getAllRequestsByUser = asyncHandler(async (req, res) => {
  try {
    const request = await Request.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender")
      .populate("receiver")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, request, "Requests Fetched Successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch requests");
  }
});

// Send Request To Another User

const sendRequest = asyncHandler(async (req, res) => {
  try {
    const { sender, receiver, amount, description, status } = req.body;

    if (!receiver || !amount || !description || !status) {
      throw new ApiError(400, "All fields are required");
    }

    const receiverUser = await User.findById(receiver);

    if (!receiverUser) {
      throw new ApiError(404, "Receiver not found");
    }

    const newRequest = new Request({
      sender,
      receiver,
      amount,
      description,
      status,
    });

    const request = await newRequest.save();

    return res
      .status(200)
      .json(new ApiResponse(201, request, "Request Sent Successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to send request");
  }
});

// Update Request

const updateRequest = asyncHandler(async (req, res) => {
  const { requestId, status } = req.body;
  console.log("Request ID:", requestId);
  console.log("Status:", status);

  // Check if request exists
  const request = await Request.findById(requestId)

    .populate("sender")
    .populate("receiver");

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  // Check if status is valid
  const validStatuses = ["accepted", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  // Start a transaction if the status is accepted
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (status === "accepted") {
      const sender = await User.findById(request.sender._id);
      const receiver = await User.findById(request.receiver._id);
      const parsedAmount = parseFloat(request.amount);

      // Log current balances
      console.log("Sender Balance Before Update:", sender.balance);
      console.log("Receiver Balance Before Update:", receiver.balance);

      // Check if sender has sufficient balance
      if (sender.balance < parsedAmount) {
        throw new ApiError(400, "Insufficient balance");
      }

      // Deduct from sender and add to receiver balance
      receiver.balance -= parsedAmount;
      sender.balance += parsedAmount;

      // Log updated balances
      console.log("Sender Balance After Update:", sender.balance);
      console.log("Receiver Balance After Update:", receiver.balance);

      await sender.save({ session });
      await receiver.save({ session });

      // Create a new transaction record
      const newTransaction = new Transaction({
        sender: receiver._id,
        receiver: sender._id,
        amount: parsedAmount,
        reference: "Request accepted",
        status: "success",
      });

      // Log the new transaction data
      console.log("New Transaction Data:", newTransaction);

      await newTransaction.save({ session });
    }

    // Update the request status
    request.status = status;
    await request.save({ session });

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new ApiResponse(200, request, `Request ${status} successfully`));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction error:", error); // Log the error details
    throw new ApiError(500, "Request update failed");
  }
});

export { getAllRequestsByUser, sendRequest, updateRequest };
