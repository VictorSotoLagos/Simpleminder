import React, { useState } from "react";
import { validateUser } from "../../helpers/uservalidations";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/userServices";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import PropTypes from "prop-types";
import "./NuevoUsuario.css";
import { set } from "mongoose";

const NuevoUsuario = ({ agregarUsuario }) => {
  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    whatsapp: "",
    rut: "",
    fecha_nacimiento: "",
    genero: "",
    estado_civil: "",
    isapre: "",
    password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState(initialValues);
  const { setUsuario, setToken } = useContext(UsuarioContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const error = validateUser(newUser);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const response = await addUser(newUser);
    if (response.error) {
      if (response.error.includes("email")) {
        setErrorMessage(
          `El correo "${newUser.email}" ya está registrado. Por favor, elige otro.`
        );
        return;
      }
      return setErrorMessage(response.error);
    } else {
      const data = response.usuario;
      const tokenData = response.token;
      agregarUsuario(data);
      console.log("data en Registro Usuario es:", data);
      console.log("data en Registro Usuario es:", tokenData);
      console.log("response es:", response);

      const dataToken = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        id: data._id,
        tipo: data.tipo_usuario,
      };
      //FALTA cambiar la validación de usuario en MENU
      setUsuario(dataToken);
      setToken(tokenData);
      localStorage.setItem("usuario", JSON.stringify(dataToken));
      localStorage.setItem("token", response.token);
      console.log("dataToken es:", dataToken);
      setErrorMessage("El usuario ha sido creado");
      navigate("/peliculas");
    }
  };

  return (
    <div className="nuevo-usuario">
      <h2>Registro Pacientes</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form className="nuevo-usuario-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={newUser.nombre}
          onChange={handleInputChange}
        />
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          name="apellido"
          placeholder="Ingresa tu apellido"
          value={newUser.apellido}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirm_password">Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirmar Contraseña"
          value={newUser.confirm_password}
          onChange={handleInputChange}
        />
        <button type="submit">Crear cuenta</button>
      </form>
      <p>¿Ya estás registrado? Ingresa como usuario:</p>
      <button
        className="boton-ir-login"
        onClick={() => (window.location.href = "/login")}
      >
        Ir al Login
      </button>
    </div>
  );
};

export default NuevoUsuario;

NuevoUsuario.propTypes = {
  agregarUsuario: PropTypes.func.isRequired,
};
