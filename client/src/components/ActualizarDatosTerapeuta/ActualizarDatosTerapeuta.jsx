import { fetchTerapeutaID, patchTerapeuta } from "../../api/terapeutaServices";
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import "./ActualizarDatosTerapeuta.css";

const ActualizarDatosTerapeuta = () => {
  const initialValues = {
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    email: "",
    telefono: "",
  };
  const { terapeuta, setTerapeuta } = useContext(UsuarioContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [terapeutaActualizado, setTerapeutaActualizado] =
    useState(initialValues);

  //paciente actualizado tiene que ir a buscar al paciente en función del ID, no del token.

  useEffect(() => {
    console.log("terapeuta loggeado es:", terapeuta);
    encontrarTerapeuta();
  }, []);

  useEffect(() => {
    console.log("terapeuta actualizado es:", terapeutaActualizado);
  }, [terapeutaActualizado]);
  const encontrarTerapeuta = async () => {
    try {
      const encontrarterapeuta = await fetchTerapeutaID(terapeuta.id);
      console.log("encontrarterapeuta es:", encontrarterapeuta);
      setTerapeutaActualizado(encontrarterapeuta);
      //const { password, ...rest } = encontrarterapeuta;
      //setTerapeutaActualizado(rest);
      //console.log("rest es:", rest);
      console.log("terapeuta actualizado es:", terapeutaActualizado);
    } catch (error) {
      console.log("error en encontrarterapeuta es:", error);
      setErrorMessage(error);
    }
  };

  const handleChange = (e) => {
    setTerapeutaActualizado({
      ...terapeutaActualizado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("datos a actualizar terapeuta", terapeutaActualizado);
    const response = await patchTerapeuta(
      terapeutaActualizado._id,
      terapeutaActualizado
    );
    const datosterapeutaFinales = response.datos;
    console.log("respuesta data + body es:", response);
    if (response.error) {
      setErrorMessage(response.error);
      console.log("error es:", response.error);
      return;
    } else {
      setErrorMessage("Datos del terapeuta actualizados exitosamente");
      const terapeutaActualizadoContext = {
        ...terapeuta,
        nombre: datosterapeutaFinales.nombre,
        apellido: datosterapeutaFinales.apellidoUno,
      };
      setTerapeuta(terapeutaActualizadoContext);
      localStorage.setItem(
        "terapeuta",
        JSON.stringify(terapeutaActualizadoContext)
      );
      console.log("terapeuta actualizado es:", terapeutaActualizadoContext);
    }
  };

  return (
    <div className="actualizar-terapeuta">
      <h2>Actualizar Datos del Terapeuta</h2>
      {errorMessage && <p style={{ color: "red" }}>{String(errorMessage)}</p>}
      <form className="actualizar-terapeuta-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">
          Nombre:
          <input
            type="text"
            name="nombre"
            value={terapeutaActualizado.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido Uno:
          <input
            type="text"
            name="apellidoUno"
            value={terapeutaActualizado.apellidoUno}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido Dos:
          <input
            type="text"
            name="apellidoDos"
            value={terapeutaActualizado.apellidoDos}
            onChange={handleChange}
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={terapeutaActualizado.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Teléfono de Contacto:
          <input
            type="string"
            name="telefono"
            value={terapeutaActualizado.telefono}
            onChange={handleChange}
          />
        </label>
        <button className="boton-actualizar" type="submit">
          Actualizar Mis Datos
        </button>
      </form>
    </div>
  );
};

export default ActualizarDatosTerapeuta;
