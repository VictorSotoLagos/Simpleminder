import { NavLink, useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { logout } from "../../api/authServices.js";
import { isTokenExpired } from "../../helpers/istokenexpired.js";
import logo from "../../assets/simpleminder-logo-01.png";
import { IoHome } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaFileMedicalAlt } from "react-icons/fa";
import { RiPsychotherapyFill } from "react-icons/ri";
import { IoMdRefreshCircle } from "react-icons/io";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Menu = () => {
  const { paciente, terapeuta, setPaciente, setTerapeuta } =
    useContext(UsuarioContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (isTokenExpired(token)) {
        console.log("Token expirado:", token);
        handleSalir();
      }
    };

    // Llamada inicial al cargar el componente
    checkToken();

    // Temporizador para verificar el token cada 5 minutos (300,000 ms)
    const interval = setInterval(checkToken, 300000); // 5 minutos

    // Limpieza al desmontar el componente
    return () => clearInterval(interval);
  }, [navigate]);

  /*

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      console.log("Token expirado:", token);
      handleSalir();
    }
  }, [navigate]);
  */

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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",

                      gap: "10px",
                    }}
                  >
                    <IoHome style={{ fontSize: "18px" }} /> Inicio
                  </span>
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/ver_pacientes" end>
              {({ isActive }) => (
                <button
                  type="button"
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <BsFillPeopleFill style={{ fontSize: "18px" }} /> Ver
                    Pacientes
                  </span>
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/crear_ficha_paciente" end>
              {({ isActive }) => (
                <button
                  type="button"
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FaFileMedicalAlt style={{ fontSize: "18px" }} /> Crear
                    Ficha Paciente
                  </span>
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/crear_atencion" end>
              {({ isActive }) => (
                <button
                  type="button"
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <RiPsychotherapyFill size={"20px"} /> Crear Atención
                  </span>
                </button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/ver_atenciones" end>
              {({ isActive }) => (
                <button
                  type="button"
                  className={isActive ? "btn-menu btn-menu-active" : "btn-menu"}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <RiPsychotherapyFill size={"20px"} /> Ver Atenciones
                  </span>
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <IoRefreshCircleSharp size={"20px"} /> Actualizar Mis Datos
                  </span>
                </button>
              )}
            </NavLink>
          </li>

          <li>
            <button type="button" className="logout" onClick={handleSalir}>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <IoLogOut size={"20px"} /> Salir
              </span>
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
