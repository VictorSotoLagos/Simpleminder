import "./VerAtenciones.css";
import { useContext, useState, useEffect } from "react";
import useFichaPaciente from "../../hooks/usefichapaciente.js";
import { fetchFichasPacientes } from "../../api/fichapacienteServices.js";
import { fetchAtenciones } from "../../api/atencion.Service.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const BuscarPacientes = ({ allPacientes, allTerapeutas }) => {
  const { terapeuta } = useContext(UsuarioContext); // Contexto del terapeuta loggeado
  const [pacientesDelTerapeuta, setPacientesDelTerapeuta] = useState([]);
  const [atencionesPacientesTerapeuta, setAtencionesPacientesTerapeuta] =
    useState([]);
  const [atencionesFiltradas, setAtencionesFiltradas] = useState([]);
  const [pacienteElegido, setPacienteElegido] = useState(null);

  const [searchFilter, setSearchFilter] = useState([]);
  const [input, setInput] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar las fichas de los pacientes
  useEffect(() => {
    const buscarFichasPacientes = async () => {
      const totalFichas = await fetchFichasPacientes();
      const pacientesTerapeuta = totalFichas
        .filter((ficha) => ficha.terapeutaAsignado === terapeuta.id)
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      setPacientesDelTerapeuta(pacientesTerapeuta);
    };
    buscarFichasPacientes();
  }, [terapeuta]);

  // Cargar todas las atenciones
  useEffect(() => {
    const buscarAtenciones = async () => {
      const totalAtenciones = await fetchAtenciones();
      setAtencionesPacientesTerapeuta(totalAtenciones);
    };
    buscarAtenciones();
  }, []);

  // Filtrar atenciones según el paciente elegido
  useEffect(() => {
    if (pacienteElegido) {
      const atencionesFiltradas = atencionesPacientesTerapeuta.filter(
        (atencion) => atencion.id_paciente === pacienteElegido
      );
      setAtencionesFiltradas(atencionesFiltradas);
    } else {
      setAtencionesFiltradas([]);
    }
  }, [pacienteElegido, atencionesPacientesTerapeuta]);

  // Filtrar atenciones según el input del buscador
  useEffect(() => {
    const filteredAtenciones = atencionesFiltradas.filter((atencion) => {
      const nombreCompleto =
        `${atencion.nombre} ${atencion.apellidoUno}`.toLowerCase();
      const inputLower = input.toLowerCase();

      return (
        nombreCompleto.includes(inputLower) ||
        atencion.nombre.toLowerCase().includes(inputLower) ||
        atencion.apellidoUno.toLowerCase().includes(inputLower) ||
        atencion.diagnosticoHipotesis?.toLowerCase().includes(inputLower) ||
        atencion.estadoDiagnostico?.toLowerCase().includes(inputLower) ||
        atencion.indicaciones?.toLowerCase().includes(inputLower) ||
        formatDateToHTMLDate(atencion.fecha)?.toLowerCase().includes(inputLower)
      );
    });
    setSearchFilter(filteredAtenciones);
  }, [input, atencionesFiltradas]);

  useEffect(() => {
    if (id) {
      setPacienteElegido(id);
    } else {
      const savedInput = localStorage.getItem("lastSearchInput");
      const savedFilter = localStorage.getItem("lastSearchFilter");
      const savedPatient = localStorage.getItem("pacienteElegido");

      if (savedInput) {
        console.log("savedInput es:", savedInput);
        setInput(savedInput);
      }
      if (savedFilter) {
        try {
          setSearchFilter(JSON.parse(savedFilter));
        } catch (e) {
          console.error("Error parsing search filter from localStorage:", e);
        }
      }
      if (savedPatient) {
        setPacienteElegido(savedPatient);
      }
    }
  }, []);

  // Guardar la búsqueda cada vez que cambie el input o el filtro
  useEffect(() => {
    localStorage.setItem("lastSearchInput", input);
    if (searchFilter.length > 0) {
      localStorage.setItem("lastSearchFilter", JSON.stringify(searchFilter));
    }
    if (pacienteElegido) {
      localStorage.setItem("pacienteElegido", pacienteElegido);
    }
    if (input.length > 0) {
      localStorage.setItem("lastSearchInput", input);
    }
  }, [input, searchFilter, pacienteElegido]); // Elimina `searchFilter` para evitar bucles innecesarios
  // Función para seleccionar el paciente
  const selectorPaciente = (idFicha) => {
    setPacienteElegido(idFicha);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log("Input en handleChange:", e.target.value);
  };

  function formatDateToHTMLDate(mongoDate) {
    if (!mongoDate) return ""; // Manejo de casos nulos o indefinidos
    const date = new Date(mongoDate); // Convierte la cadena en un objeto Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Añade el 0 si es necesario
    const day = String(date.getDate()).padStart(2, "0"); // Añade el 0 si es necesario
    return `${day}-${month}-${year}`; // Devuelve la fecha en formato YYYY-MM-DD
  }

  return (
    <>
      <h3>Tu Lista de Atenciones</h3>
      <div className="contenedor-atenciones">
        <div className="contenedor-paciente">
          <p className="text">Elige Paciente</p>
          <select
            className="select"
            value={pacienteElegido || ""}
            onChange={(e) => {
              const idSeleccionado = e.target.value;
              selectorPaciente(idSeleccionado);
            }}
          >
            <option value="">Seleccionar Paciente</option>
            {pacientesDelTerapeuta.map((paciente) => (
              <option key={paciente._id} value={paciente._id}>
                {paciente.nombre} {paciente.apellidoUno}
              </option>
            ))}
          </select>
        </div>
        <div className="contenedor-buscador">
          <p className="text">Buscador de Atenciones del Paciente:</p>
          <input
            className="input-search"
            type="text"
            id="input"
            name="input"
            value={input || ""}
            placeholder="Ingresa Fecha, Diagnóstico, Hipótesis o Estado Diagnóstico"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre Completo</th>

              <th>Fecha</th>
              <th>Hora</th>
              <th>Diagnóstico</th>
              <th>Estado Diagnóstico</th>
              <th>Editar</th>
              <th>Ficha</th>
            </tr>
          </thead>
          <tbody>
            {searchFilter.map((atencion) => (
              <tr key={atencion._id}>
                <td>
                  {atencion.nombre} {atencion.apellidoUno}{" "}
                  {atencion.apellidoDos}
                </td>

                <td style={{ fontSize: "13px" }}>
                  {formatDateToHTMLDate(atencion.fecha)}
                </td>
                <td>{atencion.hora}</td>
                <td
                  style={{
                    fontSize: "13px",
                    maxWidth: "25ch",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {atencion.diagnosticoHipotesis}
                </td>
                <td
                  style={{
                    fontSize: "13px",
                    maxWidth: "25ch",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {atencion.estadoDiagnostico}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/actualizar_atencion/${atencion._id}`);
                    }}
                  >
                    <FaEdit size={28} />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/ver_pacientes/${atencion.nombre}`);
                    }}
                  >
                    <FaEye size={28} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BuscarPacientes;
