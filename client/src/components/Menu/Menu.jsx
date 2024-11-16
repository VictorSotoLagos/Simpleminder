import { NavLink } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { logout } from "../../api/authServices.js";
import { isTokenExpired } from "../../helpers/istokenexpired.js";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);
  const { token } = useContext(UsuarioContext);
  console.log("usuario es:", usuario);
  const navigate = useNavigate();

  useEffect(() => {
    const ObtenerToken = localStorage.getItem("token");
    if (isTokenExpired(ObtenerToken)) {
      console.log(ObtenerToken);
      console.log("Token expirado");
      handleSalir();
      setUsuario(null);
      navigate("/login");
    }
  }, [navigate]);

  const handleSalir = async () => {
    try {
      await logout();
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      setUsuario(null);
      console.log("Usuario deslogeado");
    } catch (error) {
      console.log("Error en logout:", error);
    }
  };

  useEffect(() => {
    if (!usuario) {
      handleSalir();
    }
  }, [usuario]);

  if (!usuario) return null;

  return (
    <nav className="menu">
      <ul>
        <li>
          <h1>Libros</h1>
        </li>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-on" : "nav-link"
            }
          >
            <h3>Todos Los Libros</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/datos1/agregardato1"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-on" : "nav-link"
            }
          >
            <h3>Agregar Libro</h3>
          </NavLink>
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
