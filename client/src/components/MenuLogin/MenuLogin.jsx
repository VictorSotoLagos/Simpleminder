import { NavLink } from "react-router-dom";
import logo from "../../assets/simpleminder-logo-01.png";
import "./menulogin.css";

const MenuLogin = () => {
  return (
    <div className="menulogin">
      <nav>
        <ul>
          <li>
            <img className="logo" src={logo} alt="Logo Simple Minder" />
          </li>
          <li>
            <NavLink
              to="/login"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-on" : "nav-link"
              }
            >
              <h3>Login Pacientes</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newuser"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-on" : "nav-link"
              }
            >
              <h3>Registro Nuevos Pacientes</h3>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuLogin;
