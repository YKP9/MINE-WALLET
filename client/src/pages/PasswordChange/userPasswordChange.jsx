import { PageHeading } from "../../components/pageTitle";
import { Form, message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../../apiCalls/profile";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

export function ModifyPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async(values) => {
        try {
            dispatch(ShowLoading());
            const response = await ChangePassword(values);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                navigate("/");
            } else {
                message.error(response.message);
            }
            
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
     }
  return (
    <div className="monserrat">
      <PageHeading title="Change Password" />
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          className="mt-5"
        >
          <Form.Item label="Old Password" name="oldPassword">
            <Input type="password" />
          </Form.Item>

          <Form.Item label="New Password" name="newPassword">
            <Input type="password" />
          </Form.Item>

          {/* <Form.Item label="Confirm Password" name="confirmPassword">   
            <input type="password" />           
          </Form.Item> */}

          <div className="flex gap-2 text-center justify-center  mt-3">
            <button className="primary-contained-btn" >Save</button>
            <button className="primary-outlined-btn" onClick={() => navigate("/")} >Cancel</button>
        </div>
        </Form>
      </div>
    </div>
  );
}
