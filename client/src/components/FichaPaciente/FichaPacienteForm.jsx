import React, { useState } from "react";
import { addFichaPaciente } from "../../api/fichapacienteServices.js";
import "./FichaPacienteFormStyle.css";

const FichaPacienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    nombreSocial: "",
    apellidoUno: "",
    apellidoDos: "",
    email: "",
    telefono: "",
    run: "",
    fecha_nacimiento: "",
    genero: "",
    estado_civil: "",
    prevision: "",
    discapacidad: "",
    accidenteRelevante: "",
    medicamentos: "",
    educacion: "",
    modalidad: "",
    trabajando: "",
    legalizado: "",
    tipoDeTrabajo: "",
    cantidadFamiliares: "",
    comparteCama: "",
    nivelEducacionPadre: "",
    nivelEducacionMadre: "",
    ocupacionPadre: "",
    ocupacionMadre: "",
    ocupacionPareja: "",
    comorbilidades: "",
    diagnosticoHipotesis: "",
    motivoConsulta: "",
    derivadoPor: "",
    derivadoHacia: "",
    otrosPersonal: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = {
        ...formData,
        legalizado:
          formData.legalizado === "true" || formData.legalizado === true,
        comparteCama:
          formData.comparteCama === "Si" || formData.comparteCama === true,
      };
      await addFichaPaciente(formDataToSubmit);
      // Reset form
      setFormData({
        nombre: "",
        nombreSocial: "",
        apellidoUno: "",
        apellidoDos: "",
        email: "",
        telefono: "",
        run: "",
        fecha_nacimiento: "",
        genero: "",
        estado_civil: "",
        prevision: "",
        discapacidad: "",
        accidenteRelevante: "",
        medicamentos: "",
        educacion: "",
        modalidad: "",
        trabajando: false,
        legalizado: false,
        tipoDeTrabajo: "",
        cantidadFamiliares: "",
        comparteCama: false,
        nivelEducacionPadre: "",
        nivelEducacionMadre: "",
        ocupacionPadre: "",
        ocupacionMadre: "",
        ocupacionPareja: "",
        comorbilidades: "",
        diagnosticoHipotesis: "",
        motivoConsulta: "",
        derivadoPor: "",
        derivadoHacia: "",
        otrosPersonal: "",
        terapeutaAsignado: "",
      });
    } catch (error) {
      console.error("Error al crear ficha de paciente:", error);
    }
  };

  return (
    <div className="ficha-paciente">
      <h2>Crear Ficha de Paciente</h2>
      <form className="ficha-paciente-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreSocial">Nombre Social:</label>
          <input
            type="text"
            name="nombreSocial"
            value={formData.nombreSocial}
            onChange={handleInputChange}
            placeholder="Nombre Social"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidoUno">Apellido Paterno:</label>
          <input
            type="text"
            name="apellidoUno"
            value={formData.apellidoUno}
            onChange={handleInputChange}
            placeholder="Apellido Paterno"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidoDos">Apellido Materno:</label>
          <input
            type="text"
            name="apellidoDos"
            value={formData.apellidoDos}
            onChange={handleInputChange}
            placeholder="Apellido Materno"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="run">RUN:</label>
          <input
            type="text"
            name="run"
            value={formData.run}
            onChange={handleInputChange}
            placeholder="RUN"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleInputChange}
            placeholder="Fecha de Nacimiento"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="estado_civil">Estado Civil:</label>
          <select
            name="estado_civil"
            value={formData.estado_civil}
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
        </div>
        <div className="form-group">
          <label htmlFor="prevision">Previsión:</label>
          <select
            name="prevision"
            value={formData.prevision}
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
        </div>
        <div className="form-group">
          <label htmlFor="discapacidad">Discapacidad:</label>
          <input
            type="text"
            name="discapacidad"
            value={formData.discapacidad}
            onChange={handleInputChange}
            placeholder="Discapacidad"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accidenteRelevante">Accidente Relevante:</label>
          <input
            type="text"
            name="accidenteRelevante"
            value={formData.accidenteRelevante}
            onChange={handleInputChange}
            placeholder="Accidente Relevante"
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicamentos">Medicamentos:</label>
          <input
            type="text"
            name="medicamentos"
            value={formData.medicamentos}
            onChange={handleInputChange}
            placeholder="Medicamentos"
          />
        </div>

        <div className="form-group">
          <label htmlFor="educacion">Nivel de estudios:</label>
          <select
            name="educacion"
            value={formData.educacion}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un nivel de educación</option>
            <option value="Basica">Básica</option>
            <option value="Media">Media</option>
            <option value="Tecnica">Técnica</option>
            <option value="Universitaria">Universitaria</option>
            <option value="Postgrado">Postgrado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="modalidad">Modalidad:</label>
          <select
            name="modalidad"
            value={formData.modalidad}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una modalidad</option>
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
            <option value="Mixta">Mixta</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="trabajando">Trabajando:</label>
          <select
            name="trabajando"
            value={formData.trabajando}
            onChange={handleInputChange}
          >
            <option value="Sin información">Sin información</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="legalizado"> Trabajo Legalizado:</label>
          <select
            name="legalizado"
            value={formData.legalizado}
            onChange={handleInputChange}
          >
            <option value="Sin información">Sin información</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tipoDeTrabajo">Tipo de Trabajo:</label>
          <select
            name="tipoDeTrabajo"
            value={formData.tipoDeTrabajo}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un tipo de trabajo</option>
            <option value="Independiente">Independiente</option>
            <option value="Dependiente">Dependiente</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Jubilado">Jubilado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cantidadFamiliares">
            Cantidad de Familiares que vive:
          </label>
          <input
            type="number"
            name="cantidadFamiliares"
            value={formData.cantidadFamiliares}
            onChange={handleInputChange}
            placeholder="Cantidad de Familiares que vive"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comparteCama">Comparte Cama:</label>
          <select
            name="comparteCama"
            value={formData.comparteCama}
            onChange={handleInputChange}
          >
            <option value="Sin información">Sin información</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nivelEducacionPadre">
            Nivel de Educación del Padre:
          </label>
          <select
            name="nivelEducacionPadre"
            value={formData.nivelEducacionPadre}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un nivel de educación</option>
            <option value="Basica">Básica</option>
            <option value="Media">Media</option>
            <option value="Tecnica">Técnica</option>
            <option value="Universitaria">Universitaria</option>
            <option value="Postgrado">Postgrado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nivelEducacionMadre">
            Nivel de Educación de la Madre:
          </label>
          <select
            name="nivelEducacionMadre"
            value={formData.nivelEducacionMadre}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un nivel de educación</option>
            <option value="Basica">Básica</option>
            <option value="Media">Media</option>
            <option value="Tecnica">Técnica</option>
            <option value="Universitaria">Universitaria</option>
            <option value="Postgrado">Postgrado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ocupacionPadre">Ocupación del Padre:</label>
          <input
            type="text"
            name="ocupacionPadre"
            value={formData.ocupacionPadre}
            onChange={handleInputChange}
            placeholder="Ocupación del Padre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ocupacionMadre">Ocupación de la Madre:</label>
          <input
            type="text"
            name="ocupacionMadre"
            value={formData.ocupacionMadre}
            onChange={handleInputChange}
            placeholder="Ocupación de la Madre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ocupacionPareja">Ocupación de la Pareja:</label>
          <input
            type="text"
            name="ocupacionPareja"
            value={formData.ocupacionPareja}
            onChange={handleInputChange}
            placeholder="Ocupación de la Pareja"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comorbilidades">Comorbilidades:</label>
          <input
            type="text"
            name="comorbilidades"
            value={formData.comorbilidades}
            onChange={handleInputChange}
            placeholder="Comorbilidades"
          />
        </div>
        <div className="form-group">
          <label htmlFor="diagnosticoHipotesis">Diagnóstico/Hipótesis:</label>
          <input
            type="text"
            name="diagnosticoHipotesis"
            value={formData.diagnosticoHipotesis}
            onChange={handleInputChange}
            placeholder="Diagnóstico/Hipótesis"
          />
        </div>
        <div className="form-group">
          <label htmlFor="motivoConsulta">Motivo de Consulta:</label>
          <input
            type="text"
            name="motivoConsulta"
            value={formData.motivoConsulta}
            onChange={handleInputChange}
            placeholder="Motivo de Consulta"
          />
        </div>
        <div className="form-group">
          <label htmlFor="derivadoPor">Derivado Por:</label>
          <input
            type="text"
            name="derivadoPor"
            value={formData.derivadoPor}
            onChange={handleInputChange}
            placeholder="Derivado Por"
          />
        </div>
        <div className="form-group">
          <label htmlFor="derivadoHacia">Derivado Hacia:</label>
          <input
            type="text"
            name="derivadoHacia"
            value={formData.derivadoHacia}
            onChange={handleInputChange}
            placeholder="Derivado Hacia"
          />
        </div>

        <div className="form-group">
          <label htmlFor="otrosPersonal">Otros (Personal):</label>
          <input
            type="text"
            name="otrosPersonal"
            value={formData.otrosPersonal}
            onChange={handleInputChange}
            placeholder="Otros (Personal)"
          />
        </div>
        <button type="submit">Crear Ficha</button>
      </form>
    </div>
  );
};

export default FichaPacienteForm;