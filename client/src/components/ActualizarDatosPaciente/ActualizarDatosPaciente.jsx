import { fetchPacienteID, patchPaciente } from "../../api/pacientesServices";
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import "./ActualizarDatosPaciente.css";

const ActualizarDatosPaciente = () => {
  const initialValues = {
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    email: "",
    telefono: "",
  };
  const { paciente, setPaciente } = useContext(UsuarioContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pacienteActualizado, setPacienteActualizado] = useState(initialValues);

  //paciente actualizado tiene que ir a buscar al paciente en función del ID, no del token.

  useEffect(() => {
    ////console.log("paciente loggeado es:", paciente);
    encontrarPaciente();
  }, []);

  useEffect(() => {
    ////console.log("paciente actualizado es:", pacienteActualizado);
  }, [pacienteActualizado]);
  const encontrarPaciente = async () => {
    try {
      const encontrarPaciente = await fetchPacienteID(paciente.id);
      ////console.log("encontrarPaciente es:", encontrarPaciente);
      setPacienteActualizado(encontrarPaciente);
      //const { password, ...rest } = encontrarPaciente;
      //SetPacienteActualizado(rest);
      //////console.log("rest es:", rest);
      ////console.log("paciente actualizado es:", pacienteActualizado);
    } catch (error) {
      ////console.log("error en encontrarPaciente es:", error);
      setErrorMessage(error);
    }
  };

  const handleChange = (e) => {
    setPacienteActualizado({
      ...pacienteActualizado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ////console.log("datos a actualizar paciente", pacienteActualizado);
    const response = await patchPaciente(
      pacienteActualizado._id,
      pacienteActualizado
    );
    const datosPacienteFinales = response.datos;
    ////console.log("respuesta data + body es:", response);
    if (response.error) {
      setErrorMessage(response.error);
      ////console.log("error es:", response.error);
      return;
    } else {
      setErrorMessage("Paciente actualizado exitosamente");
      const pacienteActualizadoContext = {
        ...paciente,
        nombre: datosPacienteFinales.nombre,
        apellido: datosPacienteFinales.apellidoUno,
      };
      setPaciente(pacienteActualizadoContext);
      localStorage.setItem(
        "paciente",
        JSON.stringify(pacienteActualizadoContext)
      );
      ////console.log("Paciente actualizado es:", pacienteActualizadoContext);
    }
  };

  return (
    <div className="actualizar-paciente">
      <h2>Actualizar Datos del Paciente</h2>
      {errorMessage && <p style={{ color: "red" }}>{String(errorMessage)}</p>}
      <form className="actualizar-paciente-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">
          Nombre:
          <input
            type="text"
            name="nombre"
            value={pacienteActualizado.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido Uno:
          <input
            type="text"
            name="apellidoUno"
            value={pacienteActualizado.apellidoUno}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido Dos:
          <input
            type="text"
            name="apellidoDos"
            value={pacienteActualizado.apellidoDos}
            onChange={handleChange}
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={pacienteActualizado.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Teléfono de Contacto:
          <input
            type="string"
            name="telefono"
            value={pacienteActualizado.telefono}
            onChange={handleChange}
          />
        </label>
        <button className="boton-actualizar" type="submit">
          Actualizar Mis Datos
        </button>
      </form>
    </div>
  );
};

export default ActualizarDatosPaciente;
