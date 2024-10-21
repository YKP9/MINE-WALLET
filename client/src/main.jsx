import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./redux/store.js"; 

import 'remixicon/fonts/remixicon.css'


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CookiesProvider>
      <StyleProvider>
      <App />
      </StyleProvider>
    </CookiesProvider>
  </Provider>
);
