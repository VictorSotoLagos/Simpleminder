import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import VideoSimpleMinder from "../VideoSimpleMinder/VideoSimpleMinder";
import "./InicioPacientes.css";

const InicioPacientes = () => {
  const { paciente } = useContext(UsuarioContext);

  return (
    <main className="inicio-container">
      <h3>
        {paciente.genero === "Femenino" ? "Bienvenida " : "Bienvenido "}{" "}
        {paciente?.nombre} al módulo de pacientes:
      </h3>
      <VideoSimpleMinder />
    </main>
  );
};

export default InicioPacientes;
