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

  return (
    <>
      <h3>Lista de Pacientes</h3>
      <div class="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Rut</th>
              <th>Ficha</th>
              <th>Atenciones</th>
            </tr>
          </thead>
          <tbody>
            {fichasDelTerapeuta.map((ficha) => (
              <tr key={ficha._id}>
                <td>{ficha.nombre}</td>
                <td>{ficha.apellidoUno}</td>
                <td>{ficha.run}</td>
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
