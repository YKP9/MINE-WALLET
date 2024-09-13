import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AppLayout(props) {
  const { user } = useSelector((state) => state.users);
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();

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
        localStorage.removeItem("token");
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
      title: "Transaction",
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
      icon: <i class="ri-account-circle-line icons"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "LogOut",
      icon: <span className="ri-logout-circle-r-line icons"></span>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
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
            <h1 className="text-sm underline text-secondary">
              {user.firstName} {user.lastName}
              {/* {user.userName} */}
            </h1>
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
