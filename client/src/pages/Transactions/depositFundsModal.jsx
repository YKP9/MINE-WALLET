import { Modal, Form } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apiCalls/transaction";
import { checkoutSession } from "../../apiCalls/transaction";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { useSelector } from "react-redux";

export function DepositMoneyModal({
  showDepositModal,
  setShowDepositModal,
  reloadData,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  // const onToken = async (token) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await DepositFunds({
  //       token,
  //       amount: form.getFieldValue("amount"),
  //     });

  //     dispatch(HideLoading());

  //     if (response.success) {

  //       setShowDepositModal(false);
  //       message.success(response.message);
  //       reloadData();
  //     } else {
  //       message.error(response.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  const handleCheckout = async () => {
    try {
      dispatch(ShowLoading());
      const amount = form.getFieldValue("amount");
      const userId = user._id

      const { data: sessionData } = await checkoutSession({ amount, userId });

      dispatch(HideLoading());

      if (sessionData.url) {
        window.location.href = sessionData.url; // Redirect to Stripe Checkout
      } else {
        message.error("Unable to create checkout session");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
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
            <button className="primary-outlined-btn" onClick={() => setShowDepositModal(false)}>Cancel</button>

            <button className="primary-contained-btn" onClick={handleCheckout}>Deposit</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
