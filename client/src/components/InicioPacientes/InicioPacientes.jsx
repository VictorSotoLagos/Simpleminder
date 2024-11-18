import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";

const InicioPacientes = () => {
  const { paciente } = useContext(UsuarioContext);

  return (
    <>
      <h1>Inicio de Pacientes</h1>
      <h3>Bienvenido {paciente.nombre}</h3>
    </>
  );
};

export default InicioPacientes;
