import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter gives every component below it access to the URL */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
