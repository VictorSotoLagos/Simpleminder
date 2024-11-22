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
          <div className="botones-menu">
            <li>
              <NavLink to="/inicio_pacientes" end>
                {({ isActive }) => (
                  <button
                    type="button"
                    className={
                      isActive ? "btn-menu btn-menu-active" : "btn-menu"
                    }
                  >
                    Inicio
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/actualizar_datos_paciente" end>
                {({ isActive }) => (
                  <button
                    type="button"
                    className={
                      isActive ? "btn-menu btn-menu-active" : "btn-menu"
                    }
                  >
                    Actualizar Mis Datos
                  </button>
                )}
              </NavLink>
            </li>

            <li>
              <form className="logout-form">
                <button type="button" className="logout" onClick={handleSalir}>
                  Salir de SimpleMinder
                </button>
              </form>
            </li>
          </div>
        </ul>
      </nav>
    </main>
  );
};

export default Menu;
