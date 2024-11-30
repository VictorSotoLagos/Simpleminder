import React, { useState, useContext, useEffect } from "react";
import { addAtencion } from "../../api/atencion.Service.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { fetchFichasPacientes } from "../../api/fichapacienteServices.js";
import { fetchAtencionID } from "../../api/atencion.Service.js";
import { useParams } from "react-router-dom";
import "./AtencionFormStyle.css";

const AtencionForm = () => {
  const { terapeuta } = useContext(UsuarioContext);
  const { id } = useParams();
  console.log("terapeuta id es:", terapeuta.id);
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
      const totalFichas = await fetchFichasPacientesID(id);
      console.log("totalFichas", totalFichas);
      const pacientesTerapeuta = totalFichas
        .filter((ficha) => ficha.terapeutaAsignado === terapeuta.id)
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      setPacientesTerapeuta(pacientesTerapeuta);
    };
    buscarFichasPacientes();
  }, []);

  useEffect(() => {
    const buscarAtencionPorID = async () => {
      const atencionSegunID = fetchAtencionID(id);
      console.log("atencionSegunID es:", atencionSegunID);
      setFormData(atencionSegunID);
    };
    buscarAtencionPorID();
  }, []);

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
    console.log("form data es:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (key === "imagenes") {
        for (let i = 0; i < formData.imagenes.length; i++) {
          formDataToSubmit.append("imagenes", formData.imagenes[i]);
        }
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }
    console.log("formDataToSubmit es:", formDataToSubmit);
    const response = await addAtencion(formDataToSubmit);
    console.log("response es:", response);
    // Reset form
    setFormData({
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
    });
  };

  return (
    <div className="nueva-atencion">
      <h3>Actualizar Atención</h3>
      <form
        className="nueva-atencion-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="fecha">Paciente:</label>
        <select
          name="id_paciente"
          value={formData.id_paciente}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            {" "}
            Paciente{" "}
          </option>
          {pacientesTerapeuta.map((paciente) => (
            <option key={paciente._id} value={paciente._id}>
              {paciente.nombre} {paciente.apellidoUno} {paciente.apellidoDos} -
              {paciente.run}
            </option>
          ))}
          <option value="" disabled selected={!formData.id_paciente}>
            Paciente
          </option>
        </select>

        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
          placeholder="Fecha"
          required
        />
        <label htmlFor="hora">Hora:</label>
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleInputChange}
          placeholder="Hora"
          required
        />
        <label htmlFor="introduccion">Introducción:</label>
        <textarea
          name="introduccion"
          value={formData.introduccion}
          onChange={handleInputChange}
          placeholder="Introducción"
        ></textarea>
        <label htmlFor="datosAtencion">Datos de la Atención:</label>
        <textarea
          name="datosAtencion"
          value={formData.datosAtencion}
          onChange={handleInputChange}
          placeholder="Datos de la Atención"
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
          placeholder="Estado del Diagnóstico"
        />
        <label htmlFor="indicaciones">Indicaciones:</label>
        <textarea
          name="indicaciones"
          value={formData.indicaciones}
          onChange={handleInputChange}
          placeholder="Indicaciones"
        ></textarea>
        <label htmlFor="imagenes">Subir Imágenes:</label>
        <input
          type="file"
          name="imagenes"
          multiple
          onChange={handleInputChange}
        />
        <button type="submit">Crear Atención</button>
      </form>
    </div>
  );
};

export default AtencionForm;
