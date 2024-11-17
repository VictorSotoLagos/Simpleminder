import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioDatos1.css";
import { addDato1 } from "../../api/datos1Services";
import { validateDato1 } from "../../helpers/dato1validations";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import PropTypes from "prop-types";
import { putUser } from "../../api/pacientesServices";

const FormularioDatos1 = ({ agregarDato1 }) => {
  const valoresIniciales = {
    titulo: "",
    autor: "",
    año: "",
    genero: "",
    URL: "",
  };

  const [nuevoDato1, setNuevoDato1] = useState(valoresIniciales);
  const { paciente, set } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setNuevoDato1({ ...nuevoDato1, [name]: value });
    console.log(nuevoDato1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nuevoDato1);
    const error = validateDato1(nuevoDato1);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const response = await addDato1(nuevoDato1);
    console.log("respuesta response:", response);
    agregarDato1(response.cuerpo);
    setNuevoDato1(valoresIniciales);
    setErrorMessage("Dato1 Agregado!");

    const librosActualizados = [...(usuario.libros || []), nuevoDato1._id];

    setUsuario({
      ...usuario,
      libros: librosActualizados,
    });

    console.log("usuario ID es:", usuario.id);
    console.log("usuario ID es:", usuario._id);
    const usuarioActualizado = await putUser(usuario.id, usuario);
    console.log("usuario es:", usuarioActualizado);
    console.log("usuario es:", usuario);

    navigate("/");
  };

  return (
    <div>
      <h2>Agregar Película</h2>
      <div className="contenedorFormulario">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Titulo: </label>
            <input
              type="text"
              name="titulo"
              value={nuevoDato1.titulo}
              placeholder="Ingresar el título de la película"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="autor">Autor: </label>
            <input
              type="text"
              name="autor"
              value={nuevoDato1.autor}
              placeholder="Ingresar un autor"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="año">Año: </label>
            <input
              type="number"
              name="año"
              value={nuevoDato1.año}
              placeholder="Ingresar año de lanzamiento"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="genero">Género: </label>
            <input
              type="text"
              name="genero"
              value={nuevoDato1.genero}
              placeholder="Ingresar el género"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="URL">URL de la imagen: </label>
            <input
              type="url"
              name="URL"
              value={nuevoDato1.URL}
              placeholder="Ingresar la URL de la imagen de la película"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="boton-editar">
            Agregar Libro
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioDatos1;

FormularioDatos1.propTypes = {
  agregarDato1: PropTypes.func.isRequired,
};
