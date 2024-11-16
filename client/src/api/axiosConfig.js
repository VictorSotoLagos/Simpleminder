import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    });



api.interceptors.response.use(
    response => response,
    error => {
        console.error("Error en la respuesta de la API", error);
        return Promise.reject(error); 
    }
);

export default api;
