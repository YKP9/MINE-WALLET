import { axiosInstance } from ".";

// Get All Requests For a User

export const GetAllRequests = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/requests/get-all-requests"
    );
    return data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { success: false, message: "Network error" };
  }
};

// Send Request To Another User

export const SendRequest = async (requests) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/requests/send-request",
      requests
    );
    return data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { success: false, message: "Network error" };
  }
};
