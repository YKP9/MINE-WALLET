import { Form, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apiCalls/users";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import styles from "./login.module.css";
import  logo  from "../../assets/MINEWALLET.png";

export function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        setCookie("accessToken", response.data.accessToken, { path: "/" });

        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error("Login error:", error); // Log the entire error object
      const errorMessage = error.response?.data?.message || error.message || "UNKNOWN ERROR";
      message.error(errorMessage);
    }
  };

  return (
    <div className={`montserrat ${styles.loginBg} h-screen `}>
      <header className={`text-3xl text-white ${styles.header}`}>
        <img src={logo} style={{ width: "100px" }}  alt="MINEWALLET_LOGO" />
      </header>
     

      <div className="flex justify-end item-center h-100 gap-5   ">
      <div className={`text-white text-2xl flex flex-col gap-1 ${styles.quote}`}>
        <div>
          ”Do not save what is left after spending, but spend what is left after
          saving.”
        </div>
        <div className="text-end">– Warren Buffett.</div>
      </div>
        <div className={`card w-400 p-2 me-1 ${styles.loginForm}`}>
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

            <button
              className={`primary-contained-btn w-100 ${styles.loginBtn}`}
              type="submit"
            >
              Login
            </button>
            <Link to={"/register"}>
              <div className="text-sm underline text-center mt-2">
                REGISTER{" "}
              </div>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
