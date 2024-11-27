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
          <div className="botones-menu">
            <li>
              <NavLink to="/login" end>
                {({ isActive }) => (
                  <button
                    type="button"
                    className={
                      isActive ? "btn-menu btn-menu-active" : "btn-menu"
                    }
                  >
                    Login
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/nuevoterapeuta" end>
                {({ isActive }) => (
                  <button
                    type="button"
                    className={
                      isActive ? "btn-menu btn-menu-active" : "btn-menu"
                    }
                  >
                    Registro Terapeutas
                  </button>
                )}
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default MenuLogin;
