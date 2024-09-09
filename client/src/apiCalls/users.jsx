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
      const { data } = await axiosInstance.post("/api/v1/users/register", payload);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  export  { LoginUser, RegisterUser }