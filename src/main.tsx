import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
