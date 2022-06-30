import React from "react";
import ReactDOM from "react-dom/client";
import Test from "./Test";
import IOSDeviceScreen from "./SocketTest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IOSDeviceScreen />
  </React.StrictMode>
);
