import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./router";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { store } from "./redux/store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    {console.log(store)}
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
