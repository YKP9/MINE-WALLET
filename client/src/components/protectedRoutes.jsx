import { useState, useEffect } from "react";
import { GetUserInfo } from "../apiCalls/users";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { AppLayout } from "./DefaultLayout";

export function ProtectedRoute(props) {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserInfo();
      dispatch(HideLoading());

      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(error.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
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

  return (
    user && (
      <div>
        <AppLayout>{props.children}</AppLayout>
      </div>
    )
  );
}
