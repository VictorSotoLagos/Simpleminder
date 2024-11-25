import "./BuscarPacientes.css";
import { useContext, useState } from "react";
import useFichaPaciente from "../../hooks/usefichapaciente.js";
import { addFichaPaciente } from "../../api/fichapacienteServices.js";
import {
  fetchTerapeutaID,
  patchTerapeuta,
} from "../../api/terapeutaServices.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import React from "react";

const BuscarPacientes = ({ allPacientes, allTerapeutas }) => {
  const { terapeuta, setTerapeuta } = useContext(UsuarioContext); // Contexto del terapeuta loggeado
  const { data: fichasData } = useFichaPaciente(); // Hook para fichas
  const [returnMessage, setReturnMessage] = useState({});

  const handleAsignar = async (paciente) => {
    console.log("Paciente es", paciente);
    try {
      // 1. Buscar al terapeuta en la base de datos
      const registroTerapeutaDB = await fetchTerapeutaID(terapeuta.id);

      if (!registroTerapeutaDB) {
        console.error("El terapeuta no fue encontrado en la base de datos.");

        return;
      }

      // 2. Verificar si el paciente ya está asignado
      if (registroTerapeutaDB.pacientes.includes(paciente._id)) {
        console.log("El paciente ya está asignado a este terapeuta.");

        return;
      }

      // 3. Crear la ficha del paciente
      const nuevaFicha = await addFichaPaciente({
        ...paciente,
        terapeutaAsignado: terapeuta.id, // Si es necesario
      });

      console.log("nueva ficha es: ", nuevaFicha);

      if (!nuevaFicha) {
        console.error("Error al crear la ficha del paciente.");
        return;
      }

      console.log("Ficha creada exitosamente:", nuevaFicha);

      // 4. Agregar el ID del paciente al terapeuta en la base de datos
      registroTerapeutaDB.pacientes.push(paciente._id);
      await patchTerapeuta(terapeuta.id, {
        pacientes: registroTerapeutaDB.pacientes,
      });

      // 5. Actualizar el estado local del terapeuta
      setTerapeuta((prevTerapeuta) => ({
        ...prevTerapeuta,
        pacientes: [...prevTerapeuta.pacientes, paciente],
      }));

      console.log("Paciente asignado exitosamente.");
      setReturnMessage("Paciente asignado exitosamente");
    } catch (error) {
      console.error("Error al asignar el paciente:", error);
    }
  };

  const esPacienteDelTerapeuta = (terapeuta, pacienteId) => {
    console.log("Verificando si el paciente está asignado...");
    console.log("Paciente ID:", pacienteId);
    console.log("Pacientes del terapeuta:", terapeuta?.pacientes);
    return terapeuta?.pacientes?.includes(String(pacienteId));
  };

  const tieneFichaPaciente = (fichasData, pacienteId) => {
    return fichasData?.some((ficha) => ficha.id_paciente === pacienteId);
  };

  return (
    <div>
      <h3>Lista de Pacientes</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {allPacientes.map((paciente) => {
            console.log(`Procesando paciente:`, paciente);
            const tieneFicha = tieneFichaPaciente(fichasData, paciente._id);
            console.log("tieneFicha es: ", tieneFicha);
            const pacienteAsignado = esPacienteDelTerapeuta(
              terapeuta,
              paciente._id
            );

            console.log("pacienteAsignado", pacienteAsignado);

            return (
              <tr key={paciente._id}>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellidoUno}</td>
                <td>{paciente.apellidoDos}</td>
                <td>{paciente.email}</td>
                <td>
                  {tieneFicha ? (
                    pacienteAsignado ? (
                      <button
                        onClick={() => console.log("Ver ficha del paciente")}
                      >
                        Ver Ficha Paciente
                      </button>
                    ) : (
                      <span>Este paciente ya fue asignado</span>
                    )
                  ) : (
                    <button onClick={() => handleAsignar(paciente)}>
                      Asignar Paciente y Ficha
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BuscarPacientes;
