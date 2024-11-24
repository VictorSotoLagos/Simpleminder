import api from "./axiosConfig";

const fetchFichasPacientes = async () => {
  const response = await api.get("/fichapaciente");
  return response.data;
};

const addFichaPaciente = async (nuevaFichaPaciente) => {
  const response = await api.post("/fichapaciente/add", nuevaFichaPaciente);
  return response.data;
};

const deleteFichaPaciente = async (idFichaPacienteBorrar) => {
  const response = await api.delete(`/pacientes/${idFichaPacienteBorrar}`); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
  console.log("response.data es:", response.data);
  return response.data;
};

const putFichaPaciente = async (id, fichaPacienteParaActualizar) => {
  console.log("fichaPacienteParaActualizar._id es:", id);
  console.log("fichaPacienteParaActualizar es:", fichaPacienteParaActualizar);
  const response = await api.put(
    `/pacientes/${id}`,
    fichaPacienteParaActualizar
  ); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
  console.log("Ficha paciente actualizada es", response.data);
  return response.data;
};

export {
  fetchFichasPacientes,
  addFichaPaciente,
  deleteFichaPaciente,
  putFichaPaciente,
};
