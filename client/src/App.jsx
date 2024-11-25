import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
//import FormularioDatos1 from "./components/FormularioDatos1/FormularioDatos1";
//import ListaDatos1 from "./components/ListaDatos1/ListaDatos1";
//import ActualizarDato1 from "./components/ActualizarDato1/ActualizarDato1";
import NuevoPaciente from "./components/NuevoPaciente/NuevoPaciente";
import NuevoTerapeuta from "./components/NuevoTerapeuta/NuevoTerapeuta";
import LoginUser from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import MenuLogin from "./components/MenuLogin/MenuLogin";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import {
  PrivatePacienteRoutes,
  PrivateTerapeutaRoutes,
} from "./components/PrivateRoutes/PrivateRoutes";
import { fetchPacientes } from "./api/pacientesServices";
import { fetchTerapeutas } from "./api/terapeutaServices";
import { useContext } from "react";
import { UsuarioContext } from "./contexts/UsuarioContext";
import InicioPacientes from "./components/InicioPacientes/InicioPacientes";
import InicioTerapeutas from "./components/InicioTerapeutas/InicioTerapeutas";
import { Navigate } from "react-router-dom";
import ActualizarDatosPaciente from "./components/ActualizarDatosPaciente/ActualizarDatosPaciente";
import ActualizarDatosTerapeuta from "./components/ActualizarDatosTerapeuta/ActualizarDatosTerapeuta";
import BuscarPacientes from "./components/BuscarPacientes/BuscarPacientes";

import TopBar from "./components/TopBar/TopBar";
import FichaPacienteList from "./components/FichaPaciente/FichaPacienteList";
import FichaPacienteForm from "./components/FichaPaciente/FichaPacienteForm";
import AtencionList from "./components/Atencion/AtencionList";
import AtencionForm from "./components/Atencion/AtencionForm";

const App = () => {
  const { paciente, terapeuta } = useContext(UsuarioContext);
  const [datos1, setDatos1] = useState([]);
  const [allPacientes, setAllPacientes] = useState([]);
  const [allTerapeutas, setAllTerapeutas] = useState([]);

  //UseEffect para obtener todos los datos: datos1 y usuarios.

  /*
   * Obtiene la lista de datos1 de la base de datos y actualiza el estado
   * de la aplicaci n con la lista de datos1 actualizada.
   * DATOS1 PUEDE SER LO QUE SEA ()
   */
  /**
   * Obtiene la lista de usuarios de la base de datos y actualiza el estado
   * de la aplicación con la lista de usuarios actualizada.
   */
  const obtenerDatosPacientes = async () => {
    const response = await fetchPacientes();
    console.log("Pacientes desde el servidor:", response);
    setAllPacientes(response); // Actualiza el estado de AllPacientes
  };

  const obtenerDatosTerapeutas = async () => {
    const response = await fetchTerapeutas();
    console.log("Terapeutas desde el servidor:", response);
    setAllTerapeutas(response); // Actualiza el estado de AllTerapeutas
  };

  useEffect(() => {
    obtenerDatosPacientes();
    obtenerDatosTerapeutas();
  }, []);

  //Funciones actualizadoras de estado

  const agregarPaciente = (newPaciente) => {
    setAllPacientes([...allPacientes, newPaciente]);
    console.log("New Paciente es:", newPaciente);
  };

  const agregarTerapeuta = (newTerapeuta) => {
    setAllPacientes([...allTerapeutas, newTerapeuta]);
    console.log("New Terapeuta es:", newTerapeuta);
  };

  return (
    <main className="main">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <MenuLogin />
              <LoginUser />
            </PublicRoutes>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/nuevopaciente"
          element={
            <PublicRoutes>
              <MenuLogin />
              <NuevoPaciente agregarPaciente={agregarPaciente} />
            </PublicRoutes>
          }
        />
        <Route
          path="/nuevoterapeuta"
          element={
            <PublicRoutes>
              <MenuLogin />
              <NuevoTerapeuta agregarTerapeuta={agregarTerapeuta} />
            </PublicRoutes>
          }
        />
        <Route
          path="/inicio_pacientes"
          element={
            <PrivatePacienteRoutes>
              {paciente ? (
                <>
                  <Menu />
                  <div className="contenido">
                    <TopBar />
                    <InicioPacientes />
                  </div>
                </>
              ) : (
                <Navigate to="/login" replace />
              )}
            </PrivatePacienteRoutes>
          }
        />
        <Route
          path="/actualizar_datos_paciente"
          element={
            <PrivatePacienteRoutes>
              {paciente ? (
                <>
                  <Menu />
                  <div className="contenido">
                    <TopBar />
                    <ActualizarDatosPaciente />
                  </div>
                </>
              ) : (
                <Navigate to="/login" replace />
              )}
            </PrivatePacienteRoutes>
          }
        />
        <Route
          path="/inicio_terapeutas"
          element={
            <PrivateTerapeutaRoutes>
              {terapeuta ? (
                <>
                  <Menu />
                  <div className="contenido">
                    <TopBar />
                    <InicioTerapeutas />
                  </div>
                </>
              ) : (
                <Navigate to="/login" replace />
              )}
            </PrivateTerapeutaRoutes>
          }
        />
        <Route
          path="/actualizar_datos_terapeuta"
          element={
            <PrivateTerapeutaRoutes>
              {terapeuta ? (
                <>
                  <Menu />
                  <div className="contenido">
                    <TopBar />
                    <ActualizarDatosTerapeuta />
                  </div>
                </>
              ) : (
                <Navigate to="/login" replace />
              )}
            </PrivateTerapeutaRoutes>
          }
        />
        <Route
          path="/buscar_pacientes"
          element={
            <PrivateTerapeutaRoutes>
              {terapeuta ? (
                <>
                  <Menu />
                  <div className="contenido">
                    <TopBar />
                    <BuscarPacientes
                      allPacientes={allPacientes}
                      allTerapeutas={allTerapeutas}
                    />
                  </div>
                </>
              ) : (
                <Navigate to="/login" replace />
              )}
            </PrivateTerapeutaRoutes>
          }
        />

        <Route path="/ficha_paciente" element={<FichaPacienteList />} />

        <Route path="/ficha_form" element={<FichaPacienteForm />} />

        <Route path="/atencion_lista" element={<AtencionList />} />

        <Route path="/atencion_form" element={<AtencionForm />} />
      </Routes>
    </main>
  );
};

export default App;
