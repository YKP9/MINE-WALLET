import { useState, useEffect } from "react";
import { Modal, Form, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verifyReceiverAccount } from "../../apiCalls/transaction";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { TransferFunds } from "../../apiCalls/transaction";

export function TransactionModal({
  showTransferFundsModal,
  setShowTransferFundsModal,
}) {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
 

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());

      const response = await verifyReceiverAccount({
        receiver: form.getFieldValue("receiver"),
      });

      dispatch(HideLoading());

      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message || "Verification failed");
      // message.error(error.message);
      setIsVerified("false");
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const payload = {
        ...values,
        sender: user._id,
        status: "success",
        amount: parseFloat(values.amount),
        reference: values.reference || "no reference",
      };
      

      const response = await TransferFunds(payload);

      

      if (response.success) {
        reloadData();
        setShowTransferFundsModal(false);
        message.success(response.message);
        dispatch(ReloadUser(true));
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showTransferFundsModal}
        onCancel={() => setShowTransferFundsModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex item-center">
            <Form.Item label="Account Number" name="receiver" className="w-100">
              <input type="text" />
            </Form.Item>

            <Button
              className="primary-contained-btn mt-1"
              type="button"
              onClick={verifyAccount}
            >
              VERIFY
            </Button>
          </div>
          {isVerified === "true" && (
            <div className="success-bg">Account verified</div>
          )}

          {isVerified === "false" && (
            <div className="error-bg">Invalid Account</div>
          )}

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please Enter Your Amount!",
              },
              {
                max: user.balance,
                message: "Insufficient Balance",
              },
            ]}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">CANCEL</button>
            {isVerified === "true" && (
              <button className="primary-contained-btn" type="submit">
                TRANSFER
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}
