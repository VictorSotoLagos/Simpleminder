import React, { act, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ActualizarDato1.css";
import { putDato1, deleteDato1 } from "../../api/datos1Services";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { validateDato1 } from "../../helpers/dato1validations";
import { set } from "mongoose";

const ActualizarDato1 = ({ datos1, actualizarDato1Estado, eliminarDato1 }) => {
  const parametros = useParams();
  console.log(parametros);
  const navigate = useNavigate();
  const [dato1AEditar, setDato1AEditar] = useState({
    titulo: "",
    año: null,
    director: "",
    genero: "",
    URL: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  console.log("datos1 es:", datos1);

  useEffect(() => {
    const dato1Actual = datos1.find((dato1) => dato1._id === parametros._id);
    console.log("Dato1 actual es:", dato1Actual);
    if (dato1Actual) {
      setDato1AEditar(dato1Actual);
      console.log("pelicula actual es:", dato1Actual);
    }
  }, [datos1]);

  console.log("pelicula a editar es:", dato1AEditar);

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setDato1AEditar({ ...dato1AEditar, [name]: value });
    console.log(dato1AEditar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dato1AEditar);
    const error = validateDato1(dato1AEditar);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const response = await putDato1(dato1AEditar._id, dato1AEditar);
    console.log("respuesta data + body es:", response);
    actualizarDato1Estado(response.cuerpo);
    setErrorMessage("dato1 actualizado exitosamente");
    navigate("/");
  };

  return (
    <div>
      <h2>Editar Dato1</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="contenedorFormulario">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Titulo: </label>
            <input
              type="text"
              name="titulo"
              value={dato1AEditar.titulo}
              placeholder="Ingresar el título de la película"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="director">Autor: </label>
            <input
              type="text"
              name="director"
              value={dato1AEditar.autor}
              placeholder="Ingresar un director"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="año">Año: </label>
            <input
              type="number"
              name="año"
              value={dato1AEditar.año}
              placeholder="Ingresar año de lanzamiento"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="genero">Género: </label>
            <input
              type="text"
              name="genero"
              value={dato1AEditar.genero}
              placeholder="Ingresar el género"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="URL">URL de la imagen: </label>
            <input
              type="url"
              name="URL"
              value={dato1AEditar.URL}
              placeholder="Ingresar la URL de la imagen de la película"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit} className="boton-editar">
            Editar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarDato1;

ActualizarDato1.propTypes = {
  dato1: PropTypes.array.isRequired,
  actualizarDato1Estado: PropTypes.func.isRequired,
  eliminarDato1: PropTypes.func.isRequired,
};
