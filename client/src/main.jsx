import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UsuarioContextComponent } from "./contexts/UsuarioContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "@fontsource/poppins"; // Importa Poppins con todos los pesos por defecto
import "./index.css"; // Asegúrate de que esta línea exista para aplicar estilos globales

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsuarioContextComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsuarioContextComponent>
  </StrictMode>
);
