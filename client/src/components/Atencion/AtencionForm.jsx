import React, { useState, useContext, useEffect } from "react";
import { addAtencion } from "../../api/atencion.Service.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { fetchFichasPacientes } from "../../api/fichapacienteServices.js";
import "./AtencionFormStyle.css";

const AtencionForm = () => {
  const { terapeuta } = useContext(UsuarioContext);
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
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const buscarFichasPacientes = async () => {
      const totalFichas = await fetchFichasPacientes();
      console.log("totalFichas", totalFichas);
      const pacientesTerapeuta = totalFichas
        .filter((ficha) => ficha.terapeutaAsignado === terapeuta.id)
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      setPacientesTerapeuta(pacientesTerapeuta);
    };
    buscarFichasPacientes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagenes") {
      const fileArray = Array.from(files);
      setFormData({
        ...formData,
        [name]: fileArray,
      });
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log("form data es:", formData);
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imagenes: newImages,
    });
    setImagePreviews(newPreviews);
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
    setImagePreviews([]);
  };

  return (
    <div className="nueva-atencion">
      <h3>Crear Atención</h3>
      <div className="nueva-atencion-form-container">
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
              Seleccione un paciente{" "}
            </option>
            {pacientesTerapeuta.map((paciente) => (
              <option key={paciente._id} value={paciente._id}>
                {paciente.nombre} {paciente.apellidoUno} {paciente.apellidoDos}{" "}
                -{paciente.run}
              </option>
            ))}
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
          <div className="image-previews">
            {imagePreviews.map((src, index) => (
              <div key={index} className="image-preview">
                <img src={src} alt={`preview ${index}`} />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <button type="submit">Crear Atención</button>
        </form>
      </div>
    </div>
  );
};

export default AtencionForm;
