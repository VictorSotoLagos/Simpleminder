import { useState } from "react";
import { addFichaPaciente } from "../api/fichapacienteServices";

function useCrearFichaPaciente() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const crearFicha = async (nuevaFicha) => {
        setLoading(true);
        setError(null);

        try {
            const result = await addFichaPaciente(nuevaFicha); // Llama a la API para crear la ficha
            setData(result); // Guarda la respuesta (podría ser la ficha creada o un mensaje)
        } catch (err) {
            setError(err.message || "Error al crear la ficha");
        } finally {
            setLoading(false);
        }
    };

    return { crearFicha, data, loading, error };
}

export default useCrearFichaPaciente;
