import React, { useState, useContext, useEffect } from "react";
import { addAtencion, putAtencion } from "../../api/atencion.Service.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { fetchFichasPacientes } from "../../api/fichapacienteServices.js";
import { fetchAtencionID } from "../../api/atencion.Service.js";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AtencionFormStyle.css";
import { IoArrowBackCircle } from "react-icons/io5";

const AtencionForm = () => {
  const { terapeuta } = useContext(UsuarioContext);
  const { id } = useParams();
  const navegar = useNavigate();
  const { input, pacienteElegido } = location.state || {};
  console.log("input es:", input);
  console.log("pacienteElegido es:", pacienteElegido);
  console.log("terapeuta id es:", terapeuta.id);
  console.log("id params es es:", id);

  const initialValues = {
    id_paciente: "",
    id_terapeuta: terapeuta.id,
    fecha: "",
    hora: "",
    introduccion: "",
    datosAtencion: "",
    diagnosticoHipotesis: "",
    estadoDiagnostico: "",
    indicaciones: "",
    imagenes: [],
  };

  const [formData, setFormData] = useState(initialValues);
  const [pacientesTerapeuta, setPacientesTerapeuta] = useState([]);

  useEffect(() => {
    const buscarFichasPacientes = async () => {
      const totalFichas = await fetchFichasPacientes(id); // Corregido nombre de la función
      console.log("totalFichas", totalFichas);
      const pacientesTerapeuta = totalFichas
        .filter((ficha) => ficha.terapeutaAsignado === terapeuta.id)
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      setPacientesTerapeuta(pacientesTerapeuta);
    };
    buscarFichasPacientes();
  }, [id, terapeuta.id]);

  useEffect(() => {
    const buscarAtencionPorID = async () => {
      const atencionSegunID = await fetchAtencionID(id); // Asegúrate de esperar la respuesta
      console.log("atencionSegunID es:", atencionSegunID);
      setFormData(atencionSegunID); // Actualiza correctamente el formData con los datos de la atención
    };
    console.log("id en params es:", id);
    buscarAtencionPorID();
  }, [id]);

  function formatDateToHTMLDate(mongoDate) {
    if (!mongoDate) return ""; // Manejo de casos nulos o indefinidos
    const date = new Date(mongoDate); // Convierte la cadena en un objeto Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Añade el 0 si es necesario
    const day = String(date.getDate()).padStart(2, "0"); // Añade el 0 si es necesario
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato YYYY-MM-DD
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagenes") {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Simplificado el manejo del FormData
      if (key === "imagenes") {
        Array.from(value).forEach((file) =>
          formDataToSubmit.append("imagenes", file)
        );
      } else {
        formDataToSubmit.append(key, value);
      }
    });

    console.log("formDataToSubmit es:", formDataToSubmit);
    const response = await putAtencion(id, formDataToSubmit);
    console.log("response es:", response);

    // Reset form
    setFormData(response);
  };

  return (
    <div className="nueva-atencion">
      <div className="nueva-atencion-header">
        <h3>Actualizar Atención</h3>
        <button
          onClick={() =>
            navegar("/ver_atenciones", {
              state: {
                input, // Restaurar el valor del buscador
                pacienteElegido, // Restaurar el paciente seleccionado
              },
            })
          }
          className="actualizar-atencion-back-button"
        >
          {" "}
          <IoArrowBackCircle size={35} />
        </button>
      </div>
      <div className="nueva-atencion-form-container">
        <form
          className="nueva-atencion-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="id_paciente">Paciente:</label>
          <select
            name="id_paciente"
            value={formData.id_paciente}
            onChange={handleInputChange}
            disabled
          >
            <option value="" disabled>
              {" "}
              Paciente{" "}
            </option>
            {pacientesTerapeuta.map((paciente) => (
              <option
                key={paciente._id}
                value={paciente._id}
                onChange={handleInputChange}
              >
                {paciente.nombre} {paciente.apellidoUno} {paciente.apellidoDos}{" "}
                - {paciente.run}
              </option>
            ))}
          </select>

          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formatDateToHTMLDate(formData.fecha)}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="introduccion">Introducción:</label>
          <textarea
            name="introduccion"
            value={formData.introduccion}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="datosAtencion">Datos de la Atención:</label>
          <textarea
            name="datosAtencion"
            value={formData.datosAtencion}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="diagnosticoHipotesis">Diagnóstico / Hipótesis:</label>
          <select
            name="diagnosticoHipotesis"
            value={formData.diagnosticoHipotesis}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un diagnóstico / hipótesis</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Hipotesis">Hipotesis</option>
            <option value="De alta">De alta</option>
            <option value="Cierre de caso">Cierre de caso</option>
          </select>

          <label htmlFor="estadoDiagnostico">Estado del Diagnóstico:</label>
          <input
            type="text"
            name="estadoDiagnostico"
            value={formData.estadoDiagnostico}
            onChange={handleInputChange}
          />

          <label htmlFor="indicaciones">Indicaciones:</label>
          <textarea
            name="indicaciones"
            value={formData.indicaciones}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="imagenes">Subir Imágenes:</label>
          <input
            type="file"
            name="imagenes"
            multiple
            onChange={handleInputChange}
          />

          <button type="submit">Actualizar Atención</button>
        </form>
      </div>
    </div>
  );
};

export default AtencionForm;
