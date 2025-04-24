import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { StateContextProvider } from "./Context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* ✅ Ensure Router is only applied here */}
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </BrowserRouter>
);
