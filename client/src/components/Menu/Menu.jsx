import { NavLink, useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { logout } from "../../api/authServices.js";
import { isTokenExpired } from "../../helpers/istokenexpired.js";
import logo from "../../assets/simpleminder-logo-01.png";

const Menu = () => {
  const { paciente, terapeuta, setPaciente, setTerapeuta } =
    useContext(UsuarioContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      console.log("Token expirado:", token);
      handleSalir();
    }
  }, [navigate]);

  const handleSalir = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("paciente");
      localStorage.removeItem("terapeuta");
      setPaciente(null);
      setTerapeuta(null);
      console.log("Sesión cerrada");
      navigate("/login");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const renderMenuPaciente = () => (
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
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
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
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  Actualizar Mis Datos
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <button type="button" className="logout" onClick={handleSalir}>
              Salir de SimpleMinder
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );

  const renderMenuTerapeuta = () => (
    <nav className="menu">
      <ul>
        <li>
          <img className="logo" src={logo} alt="Logo Simple Minder" />
        </li>
        <div className="botones-menu">
          <li>
            <NavLink to="/inicio_terapeutas" end>
              {({ isActive }) => (
                <button
                  type="button"
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  Inicio
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/actualizar_datos_terapeuta" end>
              {({ isActive }) => (
                <button
                  type="button"
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  Actualizar Mis Datos
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <button type="button" className="logout" onClick={handleSalir}>
              Salir de SimpleMinder
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );

  return (
    <main className="menu-container">
      {paciente ? renderMenuPaciente() : null}
      {terapeuta ? renderMenuTerapeuta() : null}
    </main>
  );
};

export default Menu;
