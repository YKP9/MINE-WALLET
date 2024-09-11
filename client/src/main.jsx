import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./redux/store.js"; 


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
);
