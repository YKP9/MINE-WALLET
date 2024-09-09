import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import{ ApiResponse } from "../utils/ApiResponse.js"; 
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong, While generating Refresh and Access Token"
    );
  }
};


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

const loginUser = asyncHandler(async (req, res) => {

  const { email, userName, password } = req.body

  if (!(userName || email)) {
    throw new ApiError(400, "UserName or Email is required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User Does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Check Password, Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  ); 

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );




})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser ,
         loginUser,
         logoutUser
       };
