import proptypes from "prop-types";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";

const PrivatePacienteRoutes = ({ children }) => {
  const { paciente } = useContext(UsuarioContext);
  return paciente ? children : <Navigate to="/login" replace />;
};

const PrivateTerapeutaRoutes = ({ children }) => {
  const { terapeuta } = useContext(UsuarioContext);
  return terapeuta ? children : <Navigate to="/login" replace />;
};

PrivatePacienteRoutes.propTypes = {
  children: proptypes.node,
};

PrivateTerapeutaRoutes.propTypes = {
  children: proptypes.node,
};

export { PrivatePacienteRoutes, PrivateTerapeutaRoutes };
