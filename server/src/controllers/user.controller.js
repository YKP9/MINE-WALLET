import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import{ ApiResponse } from "../utils/ApiResponse.js"; 
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, 
    firstName, 
    lastName, 
    email, 
    password, 
    phoneNumber, 
    identificationNumber, 
    identificationType, 
    address,
    balance } = req.body;

//   if (
//     [
//       firstName,
//       lastName,
//       userName,
//       email,
//       password,
//       phoneNumber,
//       identificationType,
//       identificationNumber,
//       address,
//     ].some((field) => field.trim() === "")
//   ) {
//     throw new ApiError(400, "All Fields are required");
//   }
if (
    [
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber,
      identificationType,
      identificationNumber,
      address,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User With UserName or Email already exists");
  }

  const user = await User.create({
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    identificationNumber,
    identificationType,
    address,
    balance,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken -phoneNumber -identificationNumber"
  );

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong");
  }
  console.log("User Created:", userCreated);

  return res
  .status(201)
  .json(new ApiResponse(200, userCreated, "User Registered Successfully"));

});

export { registerUser };
