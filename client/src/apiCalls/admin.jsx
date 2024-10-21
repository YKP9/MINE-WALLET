import { axiosInstance } from ".";

// Get All Users

const GetAllUsers = async () => {
    try {
      const { data } = await axiosInstance.post("/api/v1/admin/get-all-users");
      return data;
    } catch (error) {
      return error.response.data;
    }
  };
  
  // Update User Verification Status
  
  const UpdateUserVerificationStatus = async (payload) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/admin/update-user-verification-status",
        payload
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  // Get All Users Transactions

  const GetAllUsersTransactions = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/admin/get-all-users-transactions"
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  };
  
  export { GetAllUsers, UpdateUserVerificationStatus, GetAllUsersTransactions }