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

// Transfer Funds

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/transactions/transfer-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// Get All Transactions For a User

export const GetTransactionsOfUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/transactions/get-transactions"
    );
    return data;

  } catch (error) {
    return error.response ? error.response.data : { success: false, message: "Network error" };

  }
};

//
export const checkoutSession = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/transactions/create-checkout-session",
      payload
    )
    return data
  } catch (error) {
    return error.response.data
  }
}

// Deposit Funds

export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/transactions/deposit-funds",payload
    )
    return data
  } catch (error) {
    return error.response.data
  }
}
