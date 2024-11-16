import api from "./axiosConfig";

const fetchUsers = async () => {
    const response = await api.get("/user"); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
  };

  /*
const addUser = async (nuevoUsuario) => {
    const response = await api.post("/user/register", nuevoUsuario); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
return response.data;
  };
*/

  const addUser = async (nuevoUsuario) => {
    try {
      const response = await api.post("/user/add", nuevoUsuario);
      return response.data;
    } catch (error) {
      
      // Manejar el error y devolver un objeto con la propiedad error
      return { error: error.response?.data?.error || "Hubo un error al crear el usuario" };
    }
  };


  const deleteUser = async (idUsuarioBorrar) => {
    const response = await api.delete(`/user/${idUsuarioBorrar}`); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
    };

    const putUser = async (id, usuarioParaActualizar) => {
    console.log("usuarioParaActualizar._id es:", id);
    console.log ("usuarioParaActualizar es:", usuarioParaActualizar);
    const response = await api.put(`/user/${id}`, usuarioParaActualizar); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("usuario actualizado es",  response.data)
    return response.data;
  };
  /*
  const putCancion = async (CancionParaActualizar) => {
    console.log("CancionParaActualizar es:", CancionParaActualizar);
    const response = await api.put(`/${CancionParaActualizar._id}`, CancionParaActualizar); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
  };
  */

export { fetchUsers, addUser, deleteUser, putUser }; 