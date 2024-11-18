import { NavLink } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { logout } from "../../api/authServices.js";
import { isTokenExpired } from "../../helpers/istokenexpired.js";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
const Menu = () => {
  const { paciente, setPaciente } = useContext(UsuarioContext);
  const { token } = useContext(UsuarioContext);
  console.log("paciente es:", paciente);
  const navigate = useNavigate();

  useEffect(() => {
    const ObtenerToken = localStorage.getItem("token");
    if (isTokenExpired(ObtenerToken)) {
      console.log(ObtenerToken);
      console.log("Token expirado");
      handleSalir();
      setPaciente(null);
      navigate("/login");
    }
  }, [navigate]);

  const handleSalir = async () => {
    try {
      await logout();
      localStorage.removeItem("paciente");
      localStorage.removeItem("token");
      setPaciente(null);
      console.log("Paciente deslogeado");
    } catch (error) {
      console.log("Error en logout:", error);
    }
  };

  useEffect(() => {
    if (!paciente) {
      handleSalir();
    }
  }, [paciente]);

  if (!paciente) return null;

  return (
    <nav className="menu">
      <ul>
        <li>
          <h1>Inicio Pacientes</h1>
        </li>
        <li>
          <NavLink
            to="/inicio_pacientes"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-on" : "nav-link"
            }
          ></NavLink>
        </li>

        <li>
          <form className="logout-form">
            <button type="button" className="logout" onClick={handleSalir}>
              Logout
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
