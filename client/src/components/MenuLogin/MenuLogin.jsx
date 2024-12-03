import { NavLink } from "react-router-dom";
import logo from "../../assets/simpleminder-logo-01.png";
import "./menulogin.css";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";

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
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <RiLoginCircleFill size={"20px"} /> Login
                    </span>
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
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaUserPlus size={"20px"} /> Registro Terapeutas
                    </span>
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
