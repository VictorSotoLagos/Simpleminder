import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
//import FormularioDatos1 from "./components/FormularioDatos1/FormularioDatos1";
//import ListaDatos1 from "./components/ListaDatos1/ListaDatos1";
//import ActualizarDato1 from "./components/ActualizarDato1/ActualizarDato1";
import NuevoPaciente from "./components/NuevoPaciente/NuevoPaciente";
import LoginUser from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import MenuLogin from "./components/MenuLogin/MenuLogin";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import { fetchDatos1 } from "./api/datos1Services";
import { fetchPacientes } from "./api/pacientesServices";
import { useContext } from "react";
import { UsuarioContext } from "./contexts/UsuarioContext";
import InicioPacientes from "./components/InicioPacientes/InicioPacientes";
import { Navigate } from "react-router-dom";
import ActualizarDatosPaciente from "./components/ActualizarDatosPaciente/ActualizarDatosPaciente";
import TopBarPacientes from "./components/TopBarPacientes/TopBarPacientes";

const App = () => {
  const { paciente } = useContext(UsuarioContext);
  const [datos1, setDatos1] = useState([]);
  const [allPacientes, setAllPacientes] = useState([]);

  /*
   * Obtiene la lista de datos1 de la base de datos y actualiza el estado
   * de la aplicaci n con la lista de datos1 actualizada.
   * DATOS1 PUEDE SER LO QUE SEA ()
   */
  const obtenerDatos1 = async () => {
    const response = await fetchDatos1();
    console.log("response.ok es:", response);
    console.log("peliculas son:", response);
    setDatos1(response);
  };
  /**
   * Obtiene la lista de usuarios de la base de datos y actualiza el estado
   * de la aplicación con la lista de usuarios actualizada.
   */
  const obtenerDatosPacientes = async () => {
    const response = await fetchPacientes();
    console.log("Pacientes desde el servidor:", response);
    setAllPacientes(response); // Actualiza el estado de AllUsers
  };

  //UseEffect para obtener todos los datos: datos1 y usuarios.

  useEffect(() => {
    obtenerDatos1();
    obtenerDatosPacientes();
  }, []);

  //Funciones actualizadoras de estado
  const agregarDato1 = (nuevoDato1) => {
    setDatos1([...datos1, nuevoDato1]);
    console.log("Datos1 son:", datos1);
  };

  const eliminarDato1 = (id) => {
    const indice = datos1.findIndex((dato1) => dato1._id === id);
    const nuevaListadeDatos1 = [...datos1];
    nuevaListadeDatos1.splice(indice, 1);
    setDatos1(nuevaListadeDatos1);
  };

  const actualizarDato1Estado = (dato1Actualizado) => {
    const indice = datos1.findIndex(
      (dato1) => dato1._id === dato1Actualizado._id
    );
    const nuevaListadeDatos1 = [...datos1];
    nuevaListadeDatos1[indice] = dato1Actualizado;
    setDatos1(nuevaListadeDatos1);
    console.log("Datos1 son:", datos1);
  };

  const agregarPaciente = (newPaciente) => {
    setAllPacientes([...allPacientes, newPaciente]);
    console.log("New Paciente es:", newPaciente);
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
          path="/inicio_pacientes"
          element={
            <PrivateRoutes>
              <Menu />
              <div className="contenido">
                <TopBarPacientes />
                <InicioPacientes />
              </div>
            </PrivateRoutes>
          }
        />
        <Route
          path="/actualizar_datos_paciente"
          element={
            <PrivateRoutes>
              <Menu />
              <div className="contenido">
                <TopBarPacientes />
                <ActualizarDatosPaciente />
              </div>
            </PrivateRoutes>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
