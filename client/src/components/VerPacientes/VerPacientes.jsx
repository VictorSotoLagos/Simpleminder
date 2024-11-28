import "./VerPacientes.css";
import { useContext, useState, useEffect } from "react";
import useFichaPaciente from "../../hooks/usefichapaciente.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";

const BuscarPacientes = ({ allPacientes, allTerapeutas }) => {
  const { terapeuta, setTerapeuta } = useContext(UsuarioContext); // Contexto del terapeuta loggeado
  const { data: fichasData, error, isLoading } = useFichaPaciente(); // Hook para fichas
  const [returnMessage, setReturnMessage] = useState({});
  const [fichasDelTerapeuta, setfichasDelTerapeuta] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (fichasData) {
      const fichasFilter = fichasData.filter(
        (ficha) => ficha.terapeutaAsignado === terapeuta.id
      );
      setfichasDelTerapeuta(fichasFilter);
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
    const filteredFichas = fichasDelTerapeuta.filter(
      (ficha) =>
        ficha.nombre.toLowerCase().includes(input.toLowerCase()) ||
        ficha.apellidoUno.toLowerCase().includes(input.toLowerCase()) ||
        (ficha.nombre.toLowerCase().includes(input.toLowerCase()) &&
          ficha.apellidoUno.toLowerCase().includes(input.toLowerCase())) ||
        ficha.diagnosticoHipotesis
          .toLowerCase()
          .includes(input.toLowerCase()) ||
        ficha.comorbilidades.toLowerCase().includes(input.toLowerCase()) ||
        ficha.run.toLowerCase().includes(input.toLowerCase())
    );
    setSearchFilter(filteredFichas);
  }, [input, fichasDelTerapeuta]);

  return (
    <>
      <h3>Tu Lista de Pacientes</h3>
      <p className="text">Buscador de Pacientes:</p>
      <label for="input"> </label>
      <label htmlFor="input"></label>
      <input
        className="input-search"
        type="text"
        id="input"
        name="input"
        placeholder="Buscar paciente por Nombre, Apellido, Diagnóstico o Comorbilidad"
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
                <td>{ficha.run}</td>
                <td>{ficha.diagnosticoHipotesis} </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/actualizar_ficha_paciente/${ficha._id}`);
                    }}
                  >
                    Ver ficha
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/actualizar_ficha_paciente/${ficha._id}`);
                    }}
                  >
                    Atenciones
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
