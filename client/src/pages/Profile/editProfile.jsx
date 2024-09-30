import { Form, message } from "antd";
import { PageHeading } from "../../components/pageTitle";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import { EditProfile } from "../../apiCalls/profile";
import { useNavigate } from "react-router-dom";

export function ProfileEditor() {

    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async(values) => {
        try {

            dispatch(ShowLoading());
            const response = await EditProfile(values);
            dispatch(HideLoading());

            if (response.success) {
                message.success(response.message);

                navigate("/profile");

            } else {    
                message.error(response.message);
            }
            
        } catch (error) {

            dispatch(HideLoading());
            message.error(error.message);
            
        }
        
    }
  return (
    <div className="montrserrat ">
      <PageHeading title="Edit Profile" />

      <div className="mt-3 ">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          initialValues={{ 
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address
           }}
          autoComplete="off"
          onFinish={onFinish}
          
        >
          <Form.Item label="User Name" name="userName">
            <input type="text" />
          </Form.Item>

          <Form.Item label="First Name" name="firstName">
            <input type="text" />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <input type="text" />
          </Form.Item>

          <Form.Item label="Mobile" name="phoneNumber">
            <input type="text" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <input type="text" />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <textarea></textarea>
          </Form.Item>

          <div className="flex gap-2 text-center justify-center  mt-3">
            <button className="primary-contained-btn" >Save</button>
            <button className="primary-outlined-btn" onClick={() => navigate("/profile")} >Cancel</button>
        </div>

        </Form>

        
      </div>
    </div>
  );
}
