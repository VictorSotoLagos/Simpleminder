import proptypes from "prop-types";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";

const PrivateRoutes = ({ children }) => {
  const { usuario } = useContext(UsuarioContext);

  return <>{usuario ? children : <Navigate to="/login" replace />}</>;
};

PrivateRoutes.propTypes = {
  children: proptypes.node,
};

export default PrivateRoutes;
