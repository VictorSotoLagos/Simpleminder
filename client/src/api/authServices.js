import api from "./axiosConfig";

const login = async (values) => {
    const response = await api.post("/auth/login", values);
    return response.data;
}

const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
}

export {login, logout};