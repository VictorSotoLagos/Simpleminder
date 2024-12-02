import { addFichaPaciente } from "../../api/fichapacienteServices.js";
import { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { patchTerapeuta } from "../../api/terapeutaServices.js";
import { patchFichaPaciente } from "../../api/fichapacienteServices.js";
import useFichaPaciente from "../../hooks/usefichapaciente";
import { fetchFichasPacientesID } from "../../api/fichapacienteServices.js";
import { useParams, useNavigate } from "react-router-dom";
import "./FichaPacienteFormStyle.css";
import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { validateFichaPaciente } from "../../helpers/fichapacientevalidations.js";

const ActualizarFichaPaciente = () => {
  const { terapeuta, setTerapeuta } = useContext(UsuarioContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});
  const { id } = useParams(); // Desestructuración del objeto que te devuelve useParams
  const navegar = useNavigate();
  console.log("id es:", id); // Aquí accedes directamente al valor del parámetro
  const [referrer, setReferrer] = useState("");

  /*
  useEffect(() => {
    // Detecta la URL de referencia
    const referrerUrl = document.referrer;
    setReferrer(referrerUrl);
    console.log("URL de referencia:", referrerUrl);
    console.log("setReferrer es:", referrer);
  }, []);
  */

  const obtenerFichaPaciente = async () => {
    const fichaEncontrada = await fetchFichasPacientesID(id);
    setFormData(fichaEncontrada);
    return fichaEncontrada;
  };

  function formatDateToHTMLDate(mongoDate) {
    if (!mongoDate) return ""; // Manejo de casos nulos o indefinidos
    const date = new Date(mongoDate); // Convierte la cadena en un objeto Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Añade el 0 si es necesario
    const day = String(date.getDate()).padStart(2, "0"); // Añade el 0 si es necesario
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato YYYY-MM-DD
  }

  useEffect(() => {
    obtenerFichaPaciente();
    console.log(formData);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateFichaPaciente(formData);
    if (error) {
      setErrorMessage(error);
      return;
    }
    try {
      const fichaActualizada = await patchFichaPaciente(id, formData);
      console.log("ficha actualizada es: ", fichaActualizada);

      if (!fichaActualizada) {
        console.error("Error al actualizar la ficha del paciente.");
        return;
      }

      setErrorMessage("Ficha de paciente actualizada exitosamente");
    } catch (error) {
      console.error("Error al asignar la ficha del paciente:", error);
      setErrorMessage("Error al asignar la ficha del paciente");
    }
  };

  return (
    <div className="ficha-paciente">
      <div className="ficha-paciente-header-container">
        <h2>Ver / Actualizar Ficha de Paciente</h2>
        <button
          onClick={() => navegar("/ver_pacientes")}
          className="ficha-paciente-back-btn"
        >
          <IoArrowBackCircle size={30} />
        </button>
      </div>

      <p
        style={{
          color: "red",
          fontSize: "15px",
          marginTop: "0px",
          marginBottom: "5px",
        }}
      >
        {errorMessage ? errorMessage : "\u00A0"}
      </p>

      <form className="ficha-paciente-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreSocial">Nombre Social:</label>
          <input
            type="text"
            name="nombreSocial"
            value={formData.nombreSocial || ""}
            onChange={handleInputChange}
            placeholder="Nombre Social"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidoUno">
            Apellido Paterno:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="apellidoUno"
            value={formData.apellidoUno || ""}
            onChange={handleInputChange}
            placeholder="Apellido Paterno"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidoDos">
            Apellido Materno:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="apellidoDos"
            value={formData.apellidoDos || ""}
            onChange={handleInputChange}
            placeholder="Apellido Materno"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">
            Teléfono:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono || ""}
            onChange={handleInputChange}
            placeholder="Teléfono"
          />
        </div>
        <div className="form-group">
          <label htmlFor="run">
            RUN: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="run"
            value={formData.run || ""}
            onChange={handleInputChange}
            placeholder="RUN"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_nacimiento">
            Fecha de Nacimiento:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formatDateToHTMLDate(formData.fecha_nacimiento) || ""}
            onChange={handleInputChange}
            placeholder="Fecha de Nacimiento"
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">
            Género:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="genero"
            value={formData.genero || ""}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="estado_civil">
            Estado Civil:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="estado_civil"
            value={formData.estado_civil || ""}
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
          <label htmlFor="prevision">
            Previsión:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="prevision"
            value={formData.prevision || ""}
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
            value={formData.discapacidad || ""}
            onChange={handleInputChange}
            placeholder="Discapacidad"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accidenteRelevante">Accidente Relevante:</label>
          <input
            type="text"
            name="accidenteRelevante"
            value={formData.accidenteRelevante || ""}
            onChange={handleInputChange}
            placeholder="Accidente Relevante"
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicamentos">Medicamentos:</label>
          <input
            type="text"
            name="medicamentos"
            value={formData.medicamentos || ""}
            onChange={handleInputChange}
            placeholder="Medicamentos"
          />
        </div>

        <div className="form-group">
          <label htmlFor="educacion">Nivel de estudios:</label>
          <select
            name="educacion"
            value={formData.educacion || ""}
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
            value={formData.modalidad || ""}
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
            value={formData.trabajando || ""}
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
            value={formData.legalizado || ""}
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
            value={formData.tipoDeTrabajo || ""}
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
            value={formData.cantidadFamiliares || ""}
            onChange={handleInputChange}
            placeholder="Cantidad de Familiares que vive"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comparteCama">Comparte Cama:</label>
          <select
            name="comparteCama"
            value={formData.comparteCama || ""}
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
            value={formData.nivelEducacionPadre || ""}
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
            value={formData.nivelEducacionMadre || ""}
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
            value={formData.ocupacionPadre || ""}
            onChange={handleInputChange}
            placeholder="Ocupación del Padre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ocupacionMadre">Ocupación de la Madre:</label>
          <input
            type="text"
            name="ocupacionMadre"
            value={formData.ocupacionMadre || ""}
            onChange={handleInputChange}
            placeholder="Ocupación de la Madre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ocupacionPareja">Ocupación de la Pareja:</label>
          <input
            type="text"
            name="ocupacionPareja"
            value={formData.ocupacionPareja || ""}
            onChange={handleInputChange}
            placeholder="Ocupación de la Pareja"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comorbilidades">Comorbilidades:</label>
          <input
            type="text"
            name="comorbilidades"
            value={formData.comorbilidades || ""}
            onChange={handleInputChange}
            placeholder="Comorbilidades"
          />
        </div>
        <div className="form-group">
          <label htmlFor="diagnosticoHipotesis">Diagnóstico/Hipótesis:</label>
          <input
            type="text"
            name="diagnosticoHipotesis"
            value={formData.diagnosticoHipotesis || ""}
            onChange={handleInputChange}
            placeholder="Diagnóstico/Hipótesis"
          />
        </div>
        <div className="form-group">
          <label htmlFor="motivoConsulta">Motivo de Consulta:</label>
          <input
            type="text"
            name="motivoConsulta"
            value={formData.motivoConsulta || ""}
            onChange={handleInputChange}
            placeholder="Motivo de Consulta"
          />
        </div>
        <div className="form-group">
          <label htmlFor="derivadoPor">Derivado Por:</label>
          <input
            type="text"
            name="derivadoPor"
            value={formData.derivadoPor || ""}
            onChange={handleInputChange}
            placeholder="Derivado Por"
          />
        </div>
        <div className="form-group">
          <label htmlFor="derivadoHacia">Derivado Hacia:</label>
          <input
            type="text"
            name="derivadoHacia"
            value={formData.derivadoHacia || ""}
            onChange={handleInputChange}
            placeholder="Derivado Hacia"
          />
        </div>

        <div className="form-group">
          <label htmlFor="otrosPersonal">Otros (Personal):</label>
          <input
            type="text"
            name="otrosPersonal"
            value={formData.otrosPersonal || ""}
            onChange={handleInputChange}
            placeholder="Otros (Personal)"
          />
        </div>
        <button type="submit">Actualizar Ficha Paciente</button>
      </form>
    </div>
  );
};

export default ActualizarFichaPaciente;
