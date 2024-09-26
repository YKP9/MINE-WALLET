import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new ApiError(404, "Users not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch users");
  }
});

const updateUserVerificationStatus = asyncHandler(async (req, res) => {
  try {
    const { userId, isVerified } = req.body;

    // Find the user by ID and update their verification status
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.isVerified = isVerified;
    await user.save();

    const message = isVerified
      ? "User Verified Successfully"
      : "User Suspended Successfully";

    return res.status(200).json(new ApiResponse(200, user, message));
  } catch (error) {
    throw new ApiError(500, "Failed to verify User");
  }
});

const getAllUsersTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("sender", " firstName lastName email ")
      .populate("receiver", " firstName lastName email ");
    return res
      .status(200)
      .json(
        new ApiResponse(200, transactions, "Transactions Fetched Successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Failed to fetch transactions");
  }
});

export { getAllUsers, updateUserVerificationStatus, getAllUsersTransactions };
