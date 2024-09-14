import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
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
      success_url: `${process.env.CLIENT_URL}/success`, // Redirect after successful payment
      cancel_url: `${process.env.CLIENT_URL}/cancel`,  // Redirect after cancellation
    });

    if (!session.url) {
      throw new ApiError(500, "Unable to create checkout session");
    }
    

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    throw new ApiError(500, "Failed to create checkout session");
  }
});

// // Deposit Funds In Wallet Using Stripe

// const depositFunds = asyncHandler(async (req, res) => {
  
// const userId = req.user._id;
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { amount } = req.body;

    

//     // // Create a customer on Stripe
//     // const customer = await stripe.customers.create({
//     //   email: token.email,
//     //   source: token.id,
//     // });

//      // Save the transaction

//      const newTransaction = new Transaction({
//       sender: userId,
//       receiver: userId,
//       amount: parseFloat(amount),
//       type: "deposit",
//       reference: "Stripe deposit",
//       status: "success",
//     });

//     await newTransaction.save({ session });

//     // Create a charge on Stripe
//     const charge = await stripe.charges.create(
//       {
//         amount: parsedAmount,
//         currency: "usd",
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `Deposit to MineWallet`,
//       },
//       {
//         idempotencyKey: uuidv4(), // Unique key to prevent duplicate charges
//       }
//     );

//     // Check if the charge was successful
//     if (charge.status === "succeeded") {
//       // Save the transaction
//       const newTransaction = new Transaction({
//         sender: userId,
//         receiver: userId, // For deposit, sender and receiver are the same
//         amount: parsedAmount / 100, // Convert back to dollars
//         type: "deposit",
//         reference: "Stripe deposit",
//         status: "success",
//       });
//       await newTransaction.save({ session });

// // Update the user's balance
// await User.findByIdAndUpdate(userId, {
//   $inc: { balance: parsedAmount / 100 }, // Increase balance
// }, { session });

// // Commit the transaction
// await session.commitTransaction();
// session.endSession();

// return res
// .status(201)
// .json( new ApiResponse(201, newTransaction, "Deposit successful"));
 
//     } else {
//       await session.abortTransaction();
//       session.endSession();

//       throw new ApiError(500, "Deposit failed");

//     }
//   } catch (error) {
//     console.error('Transaction error:', error); // Log error details
//     await session.abortTransaction();
//     session.endSession();

//     throw new ApiError(500, "Deposit failed");
//   }
// });

const depositFunds = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, userId } = req.body;

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
    await User.findByIdAndUpdate(userId, {
      $inc: { balance: parseFloat(amount) },
    }, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(new ApiResponse(201, newTransaction, "Deposit successful"));
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
