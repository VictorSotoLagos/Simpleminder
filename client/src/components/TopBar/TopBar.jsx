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
          <h1 style={{ color: "darkblue" }}>
            {paciente.genero === "Femenino" ? "Bienvenida" : "Bienvenido"}{" "}
            {paciente?.nombre}
          </h1>
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
          <h1
            style={{ color: "darkblue", fontWeight: "700", fontSize: "28px" }}
          >
            {terapeuta.genero === "Femenino" ? "Bienvenida," : "Bienvenido,"}{" "}
            {terapeuta?.nombre}
          </h1>
        </>
      )}
    </main>
  );
};

export default TopBar;
