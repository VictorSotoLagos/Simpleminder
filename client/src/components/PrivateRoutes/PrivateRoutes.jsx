import proptypes from "prop-types";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";

const PrivateRoutes = ({ children }) => {
  const { paciente } = useContext(UsuarioContext);

  return <>{paciente ? children : <Navigate to="/login" replace />}</>;
};

PrivateRoutes.propTypes = {
  children: proptypes.node,
};

export default PrivateRoutes;
