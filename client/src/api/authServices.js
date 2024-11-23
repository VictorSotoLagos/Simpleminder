import api from "./axiosConfig";

const login = async (values) => {
    const response = await api.post("/auth/login", values);
    console.log("response.data desde auth services es", response.data);
    return response.data;
}

const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
}

export {login, logout};