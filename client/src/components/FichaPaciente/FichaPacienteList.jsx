import React, { useEffect, useState } from "react";
import { fetchFichasPacientes } from "../../api/fichapacienteServices.js";

const FichaPacienteList = () => {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const getFichas = async () => {
      const data = await fetchFichasPacientes();
      setFichas(data);
    };
    getFichas();
  }, []);

  return (
    <div>
      <h2>Fichas de Pacientes</h2>
      <ul>
        {fichas.map((ficha) => (
          <li key={ficha._id}>
            {ficha.nombre} {ficha.apellidoUno} {ficha.apellidoDos}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FichaPacienteList;
