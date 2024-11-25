import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import TopBarEmoticonTest from "../TopBarEmoticonTest/TopBarEmoticonTest";
import "./TopBar.css";

const TopBar = () => {
  const { paciente, terapeuta } = useContext(UsuarioContext);
  console.log("paciente en topbar es:", paciente);
  return (
    <main className="topbar">
      {/* Mostrar el nombre del paciente si existe */}
      {paciente?.tipo_usuario === "Paciente" && (
        <>
          <h2 style={{ color: "darkblue" }}>
            {paciente.genero === "Femenino" ? "Bienvenida" : "Bienvenido"}{" "}
            {paciente?.nombre}
          </h2>
          <h4 style={{ color: "darkgreen" }}>
            Tu próxima sesión es el 10 de diciembre con Alfonso Díaz
          </h4>
          <TopBarEmoticonTest />
        </>
      )}

      {/* Mostrar el nombre del terapeuta si existe */}
      {paciente?.tipo_usuario === "Paciente" &&
        terapeuta?.tipo_usuario === "Terapeuta" &&
        ": "}

      {terapeuta?.tipo_usuario === "Terapeuta" && (
        <>
          <h2 style={{ color: "darkblue" }}>
            {terapeuta.genero === "Femenino" ? "Bienvenida," : "Bienvenido,"}{" "}
            {terapeuta?.nombre}
          </h2>
          <h4 style={{ color: "darkgreen" }}>
            Tus próxima sesión es con Elena Gomez.
          </h4>
        </>
      )}
    </main>
  );
};

export default TopBar;
