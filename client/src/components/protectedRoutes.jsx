import { useState, useEffect } from "react";
import { GetUserInfo } from "../apiCalls/users";
import { message } from "antd";

import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  
  const navigate = useNavigate();
  
  const getData = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        setUserData(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if(localStorage.getItem("token")) {
      getData();
    }else{
      navigate("/login")
    }
   
  }, []);

  return <div>{props.children}</div>;
}
