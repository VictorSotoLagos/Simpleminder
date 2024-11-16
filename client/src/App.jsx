import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import FormularioDatos1 from "./components/FormularioDatos1/FormularioDatos1";
import ListaDatos1 from "./components/ListaDatos1/ListaDatos1";
import ActualizarDato1 from "./components/ActualizarDato1/ActualizarDato1";
import NuevoUsuario from "./components/NuevoUsuario/NuevoUsuario";
import LoginUser from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import MenuLogin from "./components/MenuLogin/MenuLogin";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import { fetchDatos1 } from "./api/datos1Services";
import { fetchUsers } from "./api/userServices";
import { useContext } from "react";
import { UsuarioContext } from "./contexts/UsuarioContext";
import Dato1Detalle from "./components/Dato1Detalle/Dato1Detalle";

const App = () => {
  const { usuario } = useContext(UsuarioContext);
  const [datos1, setDatos1] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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
  const obtenerDatosUsers = async () => {
    const response = await fetchUsers();
    console.log("Usuarios desde el servidor:", response);
    setAllUsers(response); // Actualiza el estado de AllUsers
  };

  //UseEffect para obtener todos los datos: datos1 y usuarios.

  useEffect(() => {
    obtenerDatos1();
    obtenerDatosUsers();
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

  const agregarUsuario = (newUser) => {
    setAllUsers([...allUsers, newUser]);
    console.log("New User es:", newUser);
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
        <Route
          path="/newuser"
          element={
            <PublicRoutes>
              <MenuLogin />
              <NuevoUsuario agregarUsuario={agregarUsuario} />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Menu />
              <h2 style={{ textAlign: "left" }}>
                ¡Bienvenido de vuelta, {usuario ? usuario.nombre : "Invitado"}!
              </h2>
              <ListaDatos1
                datos1={datos1}
                actualizarDato1Estado={actualizarDato1Estado}
                agregarDato1={agregarDato1}
                eliminarDato1={eliminarDato1}
                obtenerDatos1={obtenerDatos1}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/datos1/agregardato1"
          element={
            <PrivateRoutes>
              <Menu />
              <FormularioDatos1 agregarDato1={agregarDato1} />
            </PrivateRoutes>
          }
        />
        <Route
          path="/datos1/:id"
          element={
            <PrivateRoutes>
              <Menu />
              <Dato1Detalle datos1={datos1} />
            </PrivateRoutes>
          }
        />
        <Route
          path="/datos1/detalledato1/:_id"
          element={
            <PrivateRoutes>
              <Menu />
              <ActualizarDato1
                datos1={datos1}
                actualizarDato1Estado={actualizarDato1Estado}
                eliminarDato1={eliminarDato1}
              />
            </PrivateRoutes>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
