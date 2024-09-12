
import { axiosInstance } from "."; 


// Verify Receiver Account

export const verifyReceiverAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/transactions/verify-receiver",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
