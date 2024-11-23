import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/authServices.js";
import { validateLogin } from "../../helpers/loginvalidations.js";
import "./Login.css";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";

const LoginUser = () => {
  const { setPaciente, setTerapeuta, setToken } = useContext(UsuarioContext);

  const initialValues = {
    email: "",
    password: "",
  };
  const [logUser, setLogUser] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(validateLogin(logUser));
    console.log("logUser es:", logUser);
    try {
      const data = await login(logUser);

      // Guardar el token y datos del usuario en el contexto y localStorage
      localStorage.setItem("token", data.token);
      setToken(data.token);

      // Verificar el tipo de usuario
      const usuario = data.datosToken; // Asume que esto contiene los datos del usuario
      console.log("usuario es", usuario);
      if (usuario.tipo_usuario === "Paciente") {
        setPaciente(usuario);
        localStorage.setItem("paciente", JSON.stringify(usuario));
        navigate("/inicio_pacientes");
      } else if (usuario.tipo_usuario === "Terapeuta") {
        setTerapeuta(usuario);
        localStorage.setItem("terapeuta", JSON.stringify(usuario));
        navigate("/inicio_terapeutas");
      } else {
        throw new Error("Tipo de usuario desconocido");
      }
    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
      console.log("Error en login:", error);
    }
  };

  return (
    <div className="log-usuario">
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>Inicia sesión con tu cuenta:</p>
      <form className="log-usuario-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={logUser.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={logUser.password}
          onChange={handleInputChange}
        />
        <button className="log-usuario-form-button" type="submit">
          Log in
        </button>
      </form>
      <p>¿No tienes una cuenta aún? Crea tu usuario:</p>
      <Link to="/nuevopaciente">
        <button className="register-usuario-button" type="button">
          Crear un Usuario
        </button>
      </Link>
    </div>
  );
};

export default LoginUser;
