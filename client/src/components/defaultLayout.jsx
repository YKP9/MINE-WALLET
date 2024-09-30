import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DownOutlined, ProfileOutlined, LockOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export function AppLayout(props) {
  const { user } = useSelector((state) => state.users);
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const userMenu = [
    {
      title: "Home",
      icon: <span className="ri-home-smile-fill icons"></span>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <span className="ri-bank-line icons"></span>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <span className="ri-hand-heart-fill icons"></span>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <span className="ri-account-circle-line icons"></span>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "LogOut",
      icon: <span className="ri-logout-circle-r-line icons"></span>,
      onClick: () => {
        removeCookie("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <span className="ri-home-smile-fill icons"></span>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <span className="ri-group-fill icons"></span>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <span className="ri-bank-line icons"></span>,
      onClick: () => navigate("/admin-transactions"),
      path: "/admin-transactions",
    },
    // {
    //   title: "Requests",
    //   icon: <span className="ri-hand-heart-fill icons"></span>,
    //   onClick: () => navigate("/requests"),
    //   path: "/requests",
    // },
    {
      title: "Profile",
      icon: <i class="ri-account-circle-line icons"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "LogOut",
      icon: <span className="ri-logout-circle-r-line icons"></span>,
      onClick: () => {
        removeCookie("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];

  const items = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
      icon: <ProfileOutlined />,
    },
    {
      key: "2",
      label: <Link to="/change-password">Change Password</Link>,
      icon: <LockOutlined />,
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="layout">
      <div className="sidebar text-white">
        <div className="menu">
          {menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;

            return (
              <div
                className={`menu-item ${isActive ? "active-menu-item" : ""} `}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapse && <h1 className="text-sm">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-body ">
        <div className="header flex justify-between item-center text-white">
          <div>
            {collapse && (
              <span
                onClick={() => setCollapse(!collapse)}
                className="ri-menu-unfold-3-fill text-secondary icons"
              ></span>
            )}

            {!collapse && (
              <span
                onClick={() => setCollapse(!collapse)}
                className="ri-close-large-line text-secondary icons"
              ></span>
            )}
          </div>

          <div>
            <div className="text-xl text-secondary">MINE WALLET</div>
            <div></div>
          </div>

          <div>
            <Dropdown menu={{ items }}>
              <Space>
                <h1 className="text-sm underline text-secondary">
                  {user.firstName} {user.lastName}
                  <DownOutlined className="text-secondary ms-1" />
                </h1>
              </Space>
            </Dropdown>
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
