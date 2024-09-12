import { useState } from "react";
import { Modal, Form, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { verifyReceiverAccount } from "../../apiCalls/transaction";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

export function TransactionModal({
  showTransferFundsModal,
  setShowTransferFundsModal,
}) {
  //   const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());

      const response = await verifyReceiverAccount({
        receiver: form.getFieldValue("receiver"),
      });
      console.log(response);

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

  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showTransferFundsModal}
        // onClose={() => setShowTransferFundsModal(false)}
        onCancel={() => setShowTransferFundsModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form}>
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

          <Form.Item label="Amount" name="amount">
            <input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">CANCEL</button>
            <button className="primary-contained-btn">TRANSFER</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
