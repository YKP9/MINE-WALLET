import { Modal, Form, message } from "antd";
import { checkoutSession } from "../../apiCalls/transaction";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { DepositFunds } from "../../apiCalls/transaction";

export function DepositMoneyModal({
  showDepositModal,
  setShowDepositModal,
  reloadData,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleCheckout = async () => {
    try {
      dispatch(ShowLoading());
      const amount = form.getFieldValue("amount");
      const userId = user._id;

      const response = await checkoutSession({ amount, userId });
      console.log("Api Response:", response); // Add this line to check the response

      if (response && response.data && response.data.success) {
        const url = response.data.data.url;
        console.log("Session URL:", url); // Verify the URL
        if (url) {
          window.location.href = url; // Redirect to Stripe Checkout
        } else {
          message.error("Checkout session URL is missing.");
        }
      } else {
        message.error("No data found in API response.");
      }

      // Call DepositFunds after successful payment
    const depositResponse = await DepositFunds({ amount });
    if (depositResponse.success) {
      message.success(depositResponse.message);
      reloadData(); // Reload the data to show updated balance
    } else {
      message.error(depositResponse.message);
    }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Checkout session error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again."; // Provide a more informative error message

      message.error(errorMessage);
    }
  };
  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex flex-col gap-1">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter a valid amount" }]}
          >
            <input
              type="number"
              //   value={amount}
              //   onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Item>

          <div className="flex gap-1 justify-end">
            <button
              className="primary-outlined-btn"
              onClick={() => setShowDepositModal(false)}
            >
              Cancel
            </button>

            <button className="primary-contained-btn" onClick={handleCheckout}>
              Deposit
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
