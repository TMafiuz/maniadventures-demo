import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { ToursProvider } from "./context/ToursContext"; // <-- TU provider real

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToursProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ToursProvider>
    </BrowserRouter>
  </React.StrictMode>
);
