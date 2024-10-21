import { axiosInstance } from ".";

// Login User

const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/login", payload);
    console.log("Login response:", response)
    return response.data;
  } catch (error) {
    return error.response.data || {
      success: false,
      message: "Network error",} ;
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
    console.log(data);
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
