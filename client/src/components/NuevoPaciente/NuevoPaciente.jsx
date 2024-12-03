import React, { useState } from "react";
import { validatePaciente } from "../../helpers/pacientevalidations";
import { useNavigate } from "react-router-dom";
import { addPaciente } from "../../api/pacientesServices";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import PropTypes from "prop-types";
import "./NuevoPaciente.css";

const NuevoPaciente = ({ agregarPaciente }) => {
  const initialValues = {
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    email: "",
    telefono: "",
    run: "",
    fecha_nacimiento: "",
    genero: "",
    estado_civil: "",
    prevision: "",
    password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();

  const [newPaciente, setNewPaciente] = useState(initialValues);
  const { setPaciente, setToken } = useContext(UsuarioContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setNewPaciente({
      ...newPaciente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    ////console.log("newPaciente en handleSubmit es:", newPaciente);
    const error = validatePaciente(newPaciente);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const response = await addPaciente(newPaciente);
    if (response.error) {
      if (response.error.includes("email")) {
        setErrorMessage(
          `El correo "${newPaciente.email}" ya está registrado. Por favor, elige otro.`
        );
        return;
      }
      return setErrorMessage(response.error);
    } else {
      const data = response.paciente;
      const tokenData = response.token;
      agregarPaciente(data);
      ////console.log("data en Registro Paciente es:", data);
      ////console.log("token en Registro Paciente es:", tokenData);
      ////console.log("response es:", response);

      //YA NO VA Crear Ficha Clínica
      /*
      try {
        await crearFichaClinica(data); // Pasa todo el objeto data a la función crearFichaClinica
      } catch (error) {
        setErrorMessage(error.message); // Maneja el error de la ficha clínica
        return; // No continúa si falla la ficha clínica
      }
        */
      //YA NO VA. Fin Crear Ficha Clínica

      const dataToken = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        id: data._id,
        tipo_usuario: data.tipo_usuario,
      };
      //FALTA cambiar la validación de usuario en MENU
      setPaciente(dataToken);
      setToken(tokenData);
      localStorage.setItem("paciente", JSON.stringify(dataToken));
      localStorage.setItem("token", response.token);
      ////console.log("dataToken es:", dataToken);
      setErrorMessage("El paciente ha sido creado");
      navigate("/inicio_pacientes");
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
          value={newPaciente.nombre}
          onChange={handleInputChange}
        />
        <label htmlFor="apellidoUno">Apellido Paterno:</label>
        <input
          type="text"
          name="apellidoUno"
          placeholder="Ingresa tu apellido"
          value={newPaciente.apellidoUno}
          onChange={handleInputChange}
        />
        <label htmlFor="apellidoDos">Apellido Materno:</label>
        <input
          type="text"
          name="apellidoDos"
          placeholder="Ingresa tu apellido"
          value={newPaciente.apellidoDos}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newPaciente.email}
          onChange={handleInputChange}
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={newPaciente.telefono}
          onChange={handleInputChange}
        />
        <label htmlFor="run">Rut:</label>
        <input
          type="text"
          name="run"
          placeholder="Rut"
          value={newPaciente.run}
          onChange={handleInputChange}
        />
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={newPaciente.fecha_nacimiento}
          onChange={handleInputChange}
        />

        <label htmlFor="genero">Género:</label>
        <select
          name="genero"
          value={newPaciente.genero}
          onChange={handleInputChange}
        >
          <option value="Selecciona genero"> Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <label htmlFor="estado_civil">Estado Civil:</label>
        <select
          name="estado_civil"
          value={newPaciente.estado_civil}
          onChange={handleInputChange}
        >
          <option value="">Seleccione un estado civil</option>
          <option value="Soltero(a)">Soltero(a)</option>
          <option value="Casado(a)">Casado(a)</option>
          <option value="Divorciado(a)">Divorciado(a)</option>
          <option value="Viudo(a)">Viudo(a)</option>
          <option value="Separado(a)">Separado(a)</option>
          <option value="Otro">Otro</option>
        </select>
        <label htmlFor="prevision">Previsión:</label>
        <select
          name="prevision"
          value={newPaciente.prevision}
          onChange={handleInputChange}
        >
          <option value="">Seleccione una previsión</option>
          <option value="Fonasa">Fonasa</option>
          <option value="Banmédica">Banmédica</option>
          <option value="Colmena">Colmena</option>
          <option value="Consalud">Consalud</option>
          <option value="Cruz Blanca">Cruz Blanca</option>
          <option value="Nueva Masvida">Nueva Masvida</option>
          <option value="Vida Tres">Vida Tres</option>
        </select>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={newPaciente.password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirm_password">Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirmar Contraseña"
          value={newPaciente.confirm_password}
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

export default NuevoPaciente;

NuevoPaciente.propTypes = {
  agregarPaciente: PropTypes.func.isRequired,
};
