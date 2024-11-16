import proptypes from "prop-types";
import { useContext, useState } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { usuario } = useContext(UsuarioContext);
  return <>{usuario ? <Navigate to="/ " replace /> : children}</>;
};

PublicRoutes.propTypes = {
  children: proptypes.node,
};

export default PublicRoutes;
