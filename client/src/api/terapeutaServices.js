import api from "./axiosConfig";

const fetchTerapeutas = async () => {
    const response = await api.get("/terapeutas"); 
    //console.log("response.data es:", response.data)
    return response.data;
  };

const fetchTerapeutaID = async (id) => {
    const response = await api.get(`/terapeutas/${id}`); 
return response.data;
}

  const addTerapeuta = async (nuevoTerapeuta) => {
    try {
      const response = await api.post("/terapeutas/add", nuevoTerapeuta);
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.error || "Hubo un error al crear el terapeuta" };
    }
  };


  const deletePaciente = async (idTerapeutaBorrar) => {
    const response = await api.delete(`/terapeutas/${idTerapeutaBorrar}`); 
    //console.log("response.data es:", response.data)
    return response.data;
    };

  const putTerapeuta = async (id, terapeutaActualizar) => {
    //console.log("terapeutaParaActualizar._id es:", id);
    //console.log ("terapeutaParaActualizar es:", terapeutaActualizar);
    const response = await api.put(`/terapeutas/${id}`, terapeutaActualizar); 
    //console.log("Terapeuta actualizado es",  response.data)
    return response.data;
  };

  const patchTerapeuta = async (id, datosTerapeutaActualizar) => {
    //console.log("datosTerapeutaActualizar._id es:", id);
    //console.log ("datosTerapeutaActualizar son:", datosTerapeutaActualizar);
    const response = await api.patch(`/terapeutas/${id}`, datosTerapeutaActualizar); 
    //console.log("datos terapeuta actualizados son",  response.data)
    return response.data;
  };

export { fetchTerapeutaID, fetchTerapeutas, addTerapeuta, deletePaciente, putTerapeuta, patchTerapeuta }; 