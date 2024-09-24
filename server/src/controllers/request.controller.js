import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";


// Get All Requests For a User

const getAllRequestsByUser = asyncHandler(async (req, res) => {
try {
    const request = await Request.find({
        $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
    .populate("sender")
    .populate("receiver");
    return res
    .status(200)
    .json(
        new ApiResponse(200, request, "Requests Fetched Successfully")
    );
} catch (error) {
    throw new ApiError(500, "Failed to fetch requests");
}
})

// Send Request To Another User

const sendRequest = asyncHandler(async (req, res) => {
    try {
        const { sender, receiver, amount, description, status } = req.body;

        if(!receiver || !amount || !description || !status) {
            throw new ApiError(400, "All fields are required");
        }

        const receiverUser = await User.findById(receiver);

        if(!receiverUser) {
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
})

// Update Request 

const updateRequest = asyncHandler(async (req, res) => {})



export { getAllRequestsByUser, sendRequest, updateRequest }