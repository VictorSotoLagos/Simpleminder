import PropTypes from "prop-types";
import { createContext, useState } from "react";

const UsuarioContext = createContext(); //Creamos el contexto

//Es mejor el contexto y el proveedor en el mismo archivo, dice el profe.
//Lo que vamos a exportar será el DataProvider, no el DataContext.

const UsuarioContextComponent = ({ children }) => {
  //Creamos un componente.
  const [paciente, setPaciente] = useState(
    JSON.parse(localStorage.getItem("paciente"))
  ); //Estado inicial del contexto.
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("token desde context es:", token);

  const datosContexto = {
    paciente,
    setPaciente,
    token,
    setToken,
  };

  //Creamos el context provider con lo que queremos que se cargue en el contexto.
  return (
    <UsuarioContext.Provider value={datosContexto}>
      {children}
    </UsuarioContext.Provider>
  );
};

UsuarioContextComponent.propTypes = {
  children: PropTypes.node,
};

export { UsuarioContextComponent, UsuarioContext };
