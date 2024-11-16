import api from "./axiosConfig";

const fetchDatos1 = async () => {
    const response = await api.get("/datos1"); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
return response.data;
  };

const fetchDato1ID = async (id) => {
    const response = await api.get(`/datos1/${id}`); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
return response.data;
  };

const addDato1 = async (nuevoDato) => {
    const response = await api.post("datos1/add", nuevoDato); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
return response.data;
  };

  const deleteDato1 = async (idDato1ParaBorrar) => {
    const response = await api.delete(`datos1/delete/${idDato1ParaBorrar}`); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
  };

  const putDato1 = async (id, Dato1ParaActualizar) => {
    console.log("Película para actualizar es:", Dato1ParaActualizar);
    const response = await api.put(`/datos1/actualizar/${id}`, Dato1ParaActualizar); // Con la implementación del profe sacamos el "try" y su correspondiente "catch".
    console.log("response.data es:", response.data)
    return response.data;
  };

export { fetchDatos1, fetchDato1ID, addDato1, deleteDato1, putDato1}; 