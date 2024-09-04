import { Form, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

export function Login() {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    
    return(
        <div className="montserrat bg-primary flex justify-center item-center h-screen">
      <div className="card w-400 p-2">
        <Form layout="vertical" onFinish={onFinish} >
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
    )
}