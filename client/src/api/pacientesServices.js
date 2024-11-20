import api from "./axiosConfig";

const fetchPacientes = async () => {
    const response = await api.get("/pacientes"); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
  };

const fetchPacienteID = async (id) => {
    const response = await api.get(`/pacientes/${id}`); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
return response.data;
}

  /*
const addUser = async (nuevoUsuario) => {
    const response = await api.post("/user/register", nuevoUsuario); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
return response.data;
  };
*/

  const addPaciente = async (nuevoPaciente) => {
    try {
      const response = await api.post("/pacientes/add", nuevoPaciente);
      return response.data;
    } catch (error) {
      
      // Manejar el error y devolver un objeto con la propiedad error
      return { error: error.response?.data?.error || "Hubo un error al crear el usuario" };
    }
  };


  const deletePaciente = async (idPacienteBorrar) => {
    const response = await api.delete(`/pacientes/${idPacienteBorrar}`); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
    };

  const putPaciente = async (id, pacienteParaActualizar) => {
    console.log("usuarioParaActualizar._id es:", id);
    console.log ("usuarioParaActualizar es:", pacienteParaActualizar);
    const response = await api.put(`/pacientes/${id}`, pacienteParaActualizar); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("usuario actualizado es",  response.data)
    return response.data;
  };

  const patchPaciente = async (id, datosPacienteParaActualizar) => {
    console.log("datosPacienteParaActualizar._id es:", id);
    console.log ("datosPacienteParaActualizar son:", datosPacienteParaActualizar);
    const response = await api.patch(`/pacientes/${id}`, datosPacienteParaActualizar); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("datos paciente actualizados son",  response.data)
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

export { fetchPacientes, fetchPacienteID, addPaciente, deletePaciente, putPaciente, patchPaciente }; 