import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import TopBarEmoticonTest from "../TopBarEmoticonTest/TopBarEmoticonTest";
import "./TopBarPacientes.css";

const TopBarPacientes = () => {
  const { paciente } = useContext(UsuarioContext);

  return (
    <main className="topbar">
      <h2 style={{ color: "darkblue" }}>
        {paciente.genero === "Femenino" ? "Bienvenida," : "Bienvenido,"}{" "}
        {paciente?.nombre}
      </h2>
      <h4 style={{ color: "darkgreen" }}>
        Tu próxima sesión es el 10 de diciembre con Alberto Rodríguez
      </h4>
      <TopBarEmoticonTest />
    </main>
  );
};

export default TopBarPacientes;
