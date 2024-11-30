import api from "./axiosConfig";

const fetchAtenciones = async () => {
  const response = await api.get("/atencion");
  return response.data;
};

const fetchAtencionID = async (id) => {
  const response = await api.get(`/atencion/${id}`);
  return response.data;
};

const addAtencion = async (formData) => {
  const response = await api.post("/atencion/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const deleteAtencion = async (idAtencionBorrar) => {
  const response = await api.delete(`/atencion/${idAtencionBorrar}`);
  console.log("response.data es:", response.data);
  return response.data;
};

const putAtencion = async (id, atencionParaActualizar) => {
  console.log("atencionParaActualizar._id es:", id);
  console.log("atencionParaActualizar es:", atencionParaActualizar);
  const response = await api.put(`/atencion/${id}`, atencionParaActualizar, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("Atencion actualizada es", response.data);
  return response.data;
};

export {
  fetchAtenciones,
  fetchAtencionID,
  addAtencion,
  deleteAtencion,
  putAtencion,
};
