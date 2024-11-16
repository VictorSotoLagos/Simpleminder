import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/authServices.js";
import { validateLogin } from "../../helpers/loginvalidations.js";
import "./Login.css";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { isTokenExpired } from "../../helpers/istokenexpired.js";

const LoginUser = () => {
  //THIS IS SIMPLEMINDER
  const { setUsuario } = useContext(UsuarioContext);
  const { token, setToken } = useContext(UsuarioContext);

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
    console.log("logUser es:", logUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("logUser en handleSubmit es:", logUser);
    setErrorMessage(validateLogin(logUser));
    const saveData = async () => {
      try {
        console.log("logUser en SaveData es:", logUser);
        const data = await login(logUser);
        localStorage.setItem("token", data.token);
        console.log("data es:", data);
        setUsuario(data.datosToken);

        setToken(data.token);

        console.log("LOGIN: data.datosToken es:", data.datosToken);
        console.log("Token es data.Token es:", data.token);
        console.log("Token de la variable de estado token es:", token);
        localStorage.setItem("usuario", JSON.stringify(data.datosToken)); //Aquí solo guardamos los datos del usuario en el local storage, deberíamos guardar el token en una segunda variable de contexto por ejemplo?

        navigate("/");
      } catch (error) {
        setErrorMessage("Usuario o contraseña incorrectos");
      }
    };
    saveData();
  };

  return (
    <div className="log-usuario">
      <h2>Login Pacientes</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
      <Link to="/newuser">
        <button className="register-usuario-button" type="submit">
          Crear un Usuario
        </button>
      </Link>
    </div>
  );
};

export default LoginUser;
