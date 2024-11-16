import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UsuarioContextComponent } from "./contexts/UsuarioContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsuarioContextComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsuarioContextComponent>
  </StrictMode>
);
