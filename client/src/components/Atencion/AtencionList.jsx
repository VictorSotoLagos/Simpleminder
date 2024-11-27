import React, { useEffect, useState } from "react";
import { fetchAtenciones } from "../../api/atencion.Service.js";

const AtencionList = () => {
  const [atenciones, setAtenciones] = useState([]);

  useEffect(() => {
    const getAtenciones = async () => {
      const data = await fetchAtenciones();
      setAtenciones(data);
    };
    getAtenciones();
  }, []);

  return (
    <div>
      <h3>Atenciones</h3>
      <ul>
        {atenciones.map((atencion) => (
          <li key={atencion._id}>
            {atencion.nombre} {atencion.apellidoUno} {atencion.apellidoDos} -{" "}
            {atencion.fecha} {atencion.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AtencionList;
