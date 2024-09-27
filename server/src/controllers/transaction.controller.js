import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      type: "transfer",
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

    console.log("Sender new balance:", senderUser.balance);
    console.log("Receiver new balance:", receiverUser.balance);

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

// Get All Transactions For a User.

const getAllTransactionsByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transaction.find({
      $or: [{ receiver: userId }, { sender: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiver");

    return res
      .status(200)
      .json(
        new ApiResponse(200, transactions, " Transactions Fetched Successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Failed to fetch transactions");
  }
});

// Create a Stripe Checkout Session

const createCheckoutSession = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "MineWallet Deposit",
            },
            unit_amount: parseFloat(amount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/successful-transaction`,
      cancel_url: `http://localhost:5173/failed-transaction`,
    });

    if (session && session.url) {
      return res.status(200).json(new ApiResponse(200, { url: session.url }));
    } else {
      throw new ApiError(500, "Failed to create checkout session");
    }

    // res.status(200).json({ url: session.url });
  } catch (error) {
    throw new ApiError(500, "Failed to create checkout session");
  }
});

// Deposit Funds
const depositFunds = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount } = req.body;
    const userId = req.user._id;
    console.log("USERID : ", userId);
    console.log(`Amount to deposit: ${parseFloat(amount)}`); // Log amount
    console.log(`User ID: ${userId}`); // Log user ID

    // Save the transaction
    const newTransaction = new Transaction({
      sender: userId,
      receiver: userId,
      amount: parseFloat(amount),
      type: "deposit",
      reference: "Stripe deposit",
      status: "success",
    });

    await newTransaction.save({ session });

    // Update user's balance
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { balance: parseFloat(amount) },
      },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    console.log("Updated user balance:", updatedUser.balance); // Log updated balance

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { Transaction: newTransaction, newBalance: updatedUser.balance },
          "Deposit successful"
        )
      );
  } catch (error) {
    console.error("Transaction error:", error);
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, "Deposit failed");
  }
});

export {
  transferFunds,
  verifyReceiver,
  getAllTransactionsByUser,
  createCheckoutSession,
  depositFunds,
};
