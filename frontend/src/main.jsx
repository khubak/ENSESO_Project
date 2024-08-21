import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
// StrictMode disabled due to running useEffect twice on mount therefore making multiple HTTP requests
//  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
//  </React.StrictMode>
);
