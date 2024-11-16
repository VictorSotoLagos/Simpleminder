import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { deleteDato1 } from "../../api/datos1Services";
import "./ListaDatos1.css";

const ListaDatos1 = ({
  datos1,
  actualizarDato1Estado,
  eliminarDato1,
  agregarDato1,
  obtenerDatos1,
}) => {
  const { usuario, setUsuario } = useContext(UsuarioContext);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDatos1, setFilteredDatos1] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Datos1 en Lista Películas son:", datos1);

  useEffect(() => {
    setFilteredDatos1(datos1);
    console.log("Datos1 en useEffect de Lista Películas son:", datos1);
  }, [datos1]);

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const borrarDato1 = async (e, id) => {
    console.log("id es:", id);
    e.preventDefault();
    const response = await deleteDato1(id);
    console.log("respuesta data + body es:", response);
    eliminarDato1(id);
    console.log("Dato1 eliminado es:", response.cuerpo);
    setErrorMessage("Dato1 eliminado exitosamente");
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    const filtered = datos1.filter((dato1) =>
      dato1.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatos1(filtered);
    if (searchTerm === "") {
      setFilteredDatos1(datos1);
    }
  };

  return (
    <main className="contenedor-datos1">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por título"
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      {filteredDatos1.map((dato1) => (
        <div key={dato1._id} className="tarjeta-pelicula">
          <h2>{dato1.titulo}</h2>
          <img
            src={dato1.URL}
            alt={`Portada de ${dato1.titulo}`}
            className="tarjeta-imagen"
          />
          <h2>Autor: {dato1.autor}</h2>
          <p>Año de Publicación: {dato1.año}</p>
          <p>Género: {dato1.genero}</p>
          <div className="botones-dato1">
            <Link to={`/datos1/${dato1._id}`}>
              <button className="boton-detalle">Detalles</button>
            </Link>
            {Array.isArray(usuario?.libros) &&
              usuario.libros.map(String).includes(dato1._id.toString()) && (
                <Link to={`/datos1/editar/${dato1._id}`}>
                  <button className="boton-editar">Editar Libro</button>
                </Link>
              )}
            <button
              className="boton-eliminar"
              onClick={(e) => borrarDato1(e, dato1._id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ListaDatos1;

ListaDatos1.propTypes = {
  datos1: PropTypes.array.isRequired,
  actualizarDato1Estado: PropTypes.func.isRequired,
};
