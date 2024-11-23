import React, { useState } from "react";
import { validateTerapeuta } from "../../helpers/terapeutavalidations";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import PropTypes from "prop-types";
import "./NuevoTerapeuta.css";
import { addTerapeuta } from "../../api/terapeutaServices";

const NuevoTerapeuta = ({ agregarTerapeuta }) => {
  const initialValues = {
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    email: "",
    telefono: "",
    run: "",
    fecha_nacimiento: "",
    password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();

  const [newTerapeuta, setNewTerapeuta] = useState(initialValues);
  const { setToken, setTerapeuta } = useContext(UsuarioContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setNewTerapeuta({
      ...newTerapeuta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log("newTerapeuta en handleSubmit es:", newTerapeuta);
    const error = validateTerapeuta(newTerapeuta);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const response = await addTerapeuta(newTerapeuta);
    if (response.error) {
      if (response.error.includes("email")) {
        setErrorMessage(
          `El correo "${newTerapeuta.email}" ya está registrado. Por favor, elige otro.`
        );
        return;
      }
      return setErrorMessage(response.error);
    } else {
      const data = response.terapeuta;
      console.log("data en Registro Terapeuta es:", data);
      const tokenData = response.token;
      agregarTerapeuta(data);
      console.log("data en Registro Terapeuta es:", data);
      console.log("token en Registro Terapeuta es:", tokenData);
      console.log("response es:", response);

      const dataToken = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        id: data._id,
        tipo_usuario: data.tipo_usuario,
      };
      //FALTA cambiar la validación de usuario en MENU
      setTerapeuta(dataToken);
      setToken(tokenData);
      localStorage.setItem("terapeuta", JSON.stringify(dataToken));
      localStorage.setItem("token", response.token);
      console.log("dataToken es:", dataToken);
      setErrorMessage("El terapeuta ha sido creado");
      navigate("/inicio_terapeutas");
    }
  };

  return (
    <div className="nuevo-usuario">
      <h2>Registro Terapeutas</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form className="nuevo-usuario-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={newTerapeuta.nombre}
          onChange={handleInputChange}
        />
        <label htmlFor="apellidoUno">Apellido Paterno:</label>
        <input
          type="text"
          name="apellidoUno"
          placeholder="Ingresa tu apellido"
          value={newTerapeuta.apellidoUno}
          onChange={handleInputChange}
        />
        <label htmlFor="apellidoDos">Apellido Materno:</label>
        <input
          type="text"
          name="apellidoDos"
          placeholder="Ingresa tu apellido"
          value={newTerapeuta.apellidoDos}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newTerapeuta.email}
          onChange={handleInputChange}
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={newTerapeuta.telefono}
          onChange={handleInputChange}
        />
        <label htmlFor="run">Rut:</label>
        <input
          type="text"
          name="run"
          placeholder="Rut"
          value={newTerapeuta.run}
          onChange={handleInputChange}
        />
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={newTerapeuta.fecha_nacimiento}
          onChange={handleInputChange}
        />

        <label htmlFor="genero">Género:</label>
        <select
          name="genero"
          value={newTerapeuta.genero}
          onChange={handleInputChange}
        >
          <option value="Selecciona genero"> Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={newTerapeuta.password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirm_password">Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirmar Contraseña"
          value={newTerapeuta.confirm_password}
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

export default NuevoTerapeuta;

NuevoTerapeuta.propTypes = {
  agregarTerapeuta: PropTypes.func.isRequired,
};
