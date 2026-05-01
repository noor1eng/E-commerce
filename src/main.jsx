import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import i18n from "./i18n.js";
import { RanderProvider } from "./components/dashboard/context/RanderContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RanderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RanderProvider>
    ,
  </StrictMode>,
);
