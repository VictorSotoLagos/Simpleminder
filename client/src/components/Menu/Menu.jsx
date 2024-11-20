import { NavLink } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { logout } from "../../api/authServices.js";
import { isTokenExpired } from "../../helpers/istokenexpired.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/simpleminder-logo-01.png";
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
    <main className="menu-container">
      <nav className="menu">
        <ul>
          <li>
            <img className="logo" src={logo} alt="Logo Simple Minder" />
          </li>
          <li>
            <h2>Portal Pacientes</h2>
          </li>
          <li>
            <NavLink
              to="/inicio_pacientes"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-on" : "nav-link"
              }
            >
              <h3>Inicio</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/actualizar_datos_paciente"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-on" : "nav-link"
              }
            >
              <h3>Actualizar Mis Datos</h3>
            </NavLink>
          </li>

          <li>
            <form className="logout-form">
              <button type="button" className="logout" onClick={handleSalir}>
                Salir del Sistema
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default Menu;
