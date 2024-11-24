import React, { useState } from "react";
import { addAtencion } from "../../api/atencion.Service.js";
import "./AtencionFormStyle.css";

const AtencionForm = () => {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    introduccion: "",
    datosAtencion: "",
    diagnosticoHipotesis: "",
    estadoDiagnostico: "",
    indicaciones: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAtencion(formData);
    // Reset form
    setFormData({
      fecha: "",
      hora: "",
      introduccion: "",
      datosAtencion: "",
      diagnosticoHipotesis: "",
      estadoDiagnostico: "",
      indicaciones: "",
    });
  };

  return (
    <div className="nueva-atencion">
      <h2>Crear Atención</h2>
      <form className="nueva-atencion-form" onSubmit={handleSubmit}>
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
        <button type="submit">Crear Atención</button>
      </form>
    </div>
  );
};

export default AtencionForm;
