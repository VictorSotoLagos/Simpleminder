import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import VideoSimpleMinder from "../VideoSimpleMinder/VideoSimpleMinder";
import "./InicioTerapeutas.css";

const InicioTerapeutas = () => {
  const { terapeuta } = useContext(UsuarioContext);

  return (
    <main className="inicio-container">
      <h3>Este es el módulo de terapeutas de SimpleMinder:</h3>
      <VideoSimpleMinder />
    </main>
  );
};

export default InicioTerapeutas;
