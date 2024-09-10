import { Form, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apiCalls/users";

export function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      
      if(response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/")
        // window.location.href = "/";

      }else{
        message.error(response.message);
      }

    } catch (error) {
      // message.error(error.message);
      const errorMessage = error.response?.data?.message || error.message;
      message.error(errorMessage);
  
    }

  };

  return (
    <div className="montserrat bg-primary flex justify-center item-center h-screen">
      <div className="card w-400 p-2">
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className="text-2xl text-center"> MINEWALLET - LOGIN </h1>

          <hr />

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <input type="email" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password" name="password">
                <input type="password" />
              </Form.Item>
            </Col>
          </Row>

          <button className="primary-contained-btn w-100" type="submit">
            Login
          </button>
          <Link to={"/register"} pa>
            <div className="text-sm underline text-center mt-2">REGISTER </div>
          </Link>
        </Form>
      </div>
    </div>
  );
}
