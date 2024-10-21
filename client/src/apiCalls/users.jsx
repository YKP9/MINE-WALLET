import { axiosInstance } from ".";

// Login User

const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/v1/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// Register User

const RegisterUser = async (payload) => {
  try {
    const user = await axiosInstance.post("/api/v1/users/register", payload);
    return user.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get User Info

const GetUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/api/v1/users/current-user");
    return data;
  } catch (error) {
    return error.response.data;
  }
};



export {
  LoginUser,
  RegisterUser,
  GetUserInfo,
  
};
