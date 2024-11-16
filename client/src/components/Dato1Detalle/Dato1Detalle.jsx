import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Dato1Detalle.css";

const Dato1Detalle = ({ datos1 }) => {
  const parametros = useParams();
  console.log("parametros son:", parametros);

  const detalleDato1 = datos1.find((dato1) => dato1._id === parametros.id);
  console.log("detallePelicula es: ", detalleDato1);
  if (!detalleDato1) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className="detalle-pelicula">
      <h2>{detalleDato1.titulo}</h2>
      <div className="informacion-pelicula">
        <p>
          <span>Autor: </span> <strong> {detalleDato1.autor}</strong>
        </p>
        <p>
          <span>Año de Lanzamiento: </span> <strong>{detalleDato1.año}</strong>
        </p>
        <p>
          <span>Género: </span> <strong>{detalleDato1.genero}</strong>
        </p>
      </div>
      <img src={detalleDato1.URL} className="imagen-pelicula" alt="Iron Man" />

      <div>
        <Link to={`/datos1/detalleDato1/${detalleDato1._id}`}>
          <button className="boton-editar">Editar</button>
        </Link>
      </div>
    </div>
  );
};

export default Dato1Detalle;
