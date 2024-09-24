import { useState } from "react";
import { Modal, Form, Button, message, Descriptions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verifyReceiverAccount } from "../../apiCalls/transaction";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { SendRequest } from "../../apiCalls/request";


export function NewRequestModal({
  showNewRequestModal,
  setShowNewRequestModal,
}) {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [data, setData] = useState([]);
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
        status: "pending",
        amount: parseFloat(values.amount),
        description: values.description || "no description",
      };
      
      console.log("Payload to send request:", payload); // Debugging payload

      const response = await SendRequest(payload);
      console.log("Send Request Response:", response); // Debug response


      

      if (response.success) {
        // reloadData();
        setShowNewRequestModal(false);
        message.success(response.message);
        // dispatch(ReloadUser(true));
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
        open={showNewRequestModal}
        onCancel={() => setShowNewRequestModal(false)}
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

          <Form.Item label="Description" name="description">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">CANCEL</button>
            {isVerified === "true" && (
              <button className="primary-contained-btn" type="submit">
                Request
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

