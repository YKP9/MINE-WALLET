import { useState, useEffect } from "react";
import { GetUserInfo } from "../apiCalls/users";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { AppLayout } from "./defaultLayout";

export function ProtectedRoute(props) {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // const getData = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await GetUserInfo();
  //     dispatch(HideLoading());

  //     if (response.success) {
  //       dispatch(SetUser(response.data));
  //     } else {
  //       message.error(error.message);
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //     navigate("/home");
  //   }
  // };

  // useEffect(() => {
  //   if (cookies.token) {
  //     getData();
  //   } else {
  //     navigate("/home");
  //   }
  // }, [cookies.token]);

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await GetUserInfo();
    dispatch(HideLoading());
    return response;  // Return response for useEffect to handle
  };
  
  useEffect(() => {
    if (cookies.token) {
      getData()
        .then((response) => {
          if (response.success) {
            dispatch(SetUser(response.data));
          } else {
            throw new Error(response.message);
          }
        })
        .catch((error) => {
          message.error(error.message);
          navigate("/home");
        });
    } else {
      navigate("/home");
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
