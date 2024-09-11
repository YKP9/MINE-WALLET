import { useState, useEffect } from "react";
import { GetUserInfo } from "../apiCalls/users";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const getData = async () => {
    try {
      const response = await GetUserInfo();

      if (response.success) {
        setUserData(response.data);
      }else{
        message.error(error.message);
        navigate("/login");
        
      }
    } catch (error) {
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (cookies.token) {
      getData();
    } else {
      navigate("/login");
    }
  }, [cookies.token]);

  return <div>{props.children}</div>;
}
