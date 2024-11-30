import "./VerPacientes.css";
import { useContext, useState, useEffect } from "react";
import useFichaPaciente from "../../hooks/usefichapaciente.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const BuscarPacientes = ({ allPacientes, allTerapeutas }) => {
  const { terapeuta, setTerapeuta } = useContext(UsuarioContext); // Contexto del terapeuta loggeado
  const { data: fichasData, error, isLoading } = useFichaPaciente(); // Hook para fichas
  const [returnMessage, setReturnMessage] = useState({});
  const [fichasDelTerapeuta, setfichasDelTerapeuta] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { nombre } = useParams();
  console.log("nombre en params es: ", nombre);

  useEffect(() => {
    if (fichasData) {
      const fichasFilter = fichasData.filter(
        (ficha) => ficha.terapeutaAsignado === terapeuta.id
      );
      setfichasDelTerapeuta(
        fichasFilter.sort((a, b) => a.nombre.localeCompare(b.nombre))
      );
      console.log("fichasDelTerapeuta", fichasDelTerapeuta);
    }
  }, [fichasData, terapeuta.id]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  useEffect(() => {
    const filteredFichas = fichasDelTerapeuta.filter((ficha) => {
      const nombreCompleto =
        `${ficha.nombre} ${ficha.apellidoUno}`.toLowerCase();
      const inputLower = input.toLowerCase();

      return (
        nombreCompleto.includes(inputLower) || // Búsqueda por nombre completo
        ficha.nombre.toLowerCase().includes(inputLower) || // Búsqueda individual por nombre
        ficha.apellidoUno.toLowerCase().includes(inputLower) || // Búsqueda individual por apellido
        ficha.diagnosticoHipotesis.toLowerCase().includes(inputLower) || // Búsqueda en diagnóstico
        ficha.comorbilidades.toLowerCase().includes(inputLower) || // Búsqueda en comorbilidades
        ficha.run.toLowerCase().includes(inputLower) // Búsqueda en RUN
      );
    });

    setSearchFilter(filteredFichas);
  }, [input, fichasDelTerapeuta]);

  useEffect(() => {
    const savedInput = localStorage.getItem("lastSearchInput");
    if (nombre) {
      setInput(nombre);
    } else if (savedInput) {
      console.log("savedInput es:", savedInput);
      setInput(savedInput);
    }
  }, []);

  // Guardar la búsqueda cada vez que cambie el input o el filtro
  useEffect(() => {
    localStorage.setItem("lastSearchInput", input);
  }, [input]); // Elimina `searchFilter` para evitar bucles innecesarios
  // Función para seleccionar el paciente
  const selectorPaciente = (idFicha) => {
    setPacienteElegido(idFicha);
  };
  return (
    <>
      <h3>Tu Lista de Pacientes</h3>
      <p className="text">Buscador de Pacientes:</p>
      <label htmlFor="input"></label>
      <input
        className="input-search"
        type="text"
        id="input"
        name="input"
        value={input || ""}
        placeholder="Ingresa Nombre, Apellido, Rut, Diagnóstico o Comorbilidad"
        onChange={(e) => setInput(e.target.value)} // Actualiza el estado de input
      />
      <div class="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Rut</th>
              <th>Diagnóstico</th>
              <th>Ficha</th>
              <th>Atenciones</th>
            </tr>
          </thead>
          <tbody>
            {searchFilter.map((ficha) => (
              <tr key={ficha._id}>
                <td>{ficha.nombre}</td>
                <td>{ficha.apellidoUno}</td>
                <td style={{ fontSize: "13px" }}>{ficha.run}</td>
                <td
                  style={{
                    fontSize: "13px",
                    maxWidth: "25ch",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ficha.diagnosticoHipotesis}{" "}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/actualizar_ficha_paciente/${ficha._id}`);
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaEdit size={28} />
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/ver_atenciones/${ficha._id}`);
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaEye size={28} />
                    </span>
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
