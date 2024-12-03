
  export const validateAtencion = (newAtencion) => {
    if (!newAtencion.id_paciente || newAtencion.id_paciente.trim() === "") {
      return "Se debe incluir un paciente";
    }
    if (!newAtencion.fecha) {
      return "Se debe incluir una fecha";
    }
    if (newAtencion.fecha < 1950 || newAtencion.fecha > 2030) {
      return "La fecha debe estar entre 1950 y 2030";
    }
    if (isNaN(Date.parse(newAtencion.fecha))) {
      return "La fecha proporcionada no es válida";
    }
    const parsedDate = new Date(newAtencion.fecha);
const year = parsedDate.getUTCFullYear(); // Obtiene el año en formato UTC
if (year < 2000 || year > 2030) {
  return "El año debe estar entre 2000 y 2030";
}
    if (!newAtencion.hora || newAtencion.hora.trim() === "") {
      return "Se debe incluir una hora";
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(newAtencion.hora)) {
    return "La hora debe estar en formato HH:mm (ejemplo: 14:30)";
    }
    if (!newAtencion.diagnosticoHipotesis || (newAtencion.diagnosticoHipotesis && !["Confirmado", "Hipotesis", "De alta", "Cierre de caso"].includes(newAtencion.diagnosticoHipotesis))) {
      return "Elija un Diagnóstico Hipótesis";
    }
    //if (newAtencion.imagenes && !Array.isArray(newAtencion.imagenes)) {
    //  return "Las imágenes deben ser un arreglo de URLs";
    //}
  
    return null; // Si no hay errores, se devuelve `null`
  };
  

