import { useState, useEffect } from "react";
import { fetchFichasPacientes, fetchFichasPacientesID } from "../api/fichapacienteServices";


function useFichaPaciente(pacienteId = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let result;
                if (pacienteId) {
                    console.log("Hook: pacienteId es:", pacienteId);
                    // Llama a la función que obtiene la ficha por ID
                    result = await fetchFichasPacientesID(pacienteId);
     
                } else {
                    // Llama a la función que obtiene todas las fichas
                    result = await fetchFichasPacientes();
                }
                setData(result); // Establece los datos recibidos
                console.log("Datos recibidos desde el hook:", result);
            } catch (err) {
                setError(err.message || "Error al cargar las fichas");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pacienteId]); // Se ejecuta cada vez que cambia pacienteId

    return { data, loading, error };
}

export default useFichaPaciente;