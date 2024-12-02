
  export const validateFichaPaciente = (fichaPaciente) => {
    if (fichaPaciente.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if (fichaPaciente.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (fichaPaciente.apellidoUno.trim() === "") {
      return "Debes incluir un apellido paterno";
    }
    if (fichaPaciente.apellidoUno.length < 3) {
      return "El apellido paterno debe tener al menos 3 caracteres";
    }
    if (fichaPaciente.email.trim() === "") {
      return "Debes incluir el correo electrónico";
    }
    if (fichaPaciente.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
    if (fichaPaciente.email.includes(".") === false) {
      return `Incluye un correo electrónico válido con un punto "." luego de la @`;
    }
    if (fichaPaciente.telefono.trim() === "") {
      return "Debes incluir un teléfono de contacto";
    }
    if (fichaPaciente.run.trim() === "") {
      return "Debes incluir un run";
    }
    const runRegex = /^\d{1,2}(\.\d{3}){2}-[\dkK]$/;
    if (!runRegex.test(fichaPaciente.run)) {
      return "El run debe tener el formato xx.xxx.xxx-x, con puntos y guión incluidos";
    }
    if (fichaPaciente.fecha_nacimiento.trim() === "") {
      return "Debes incluir una fecha de nacimiento";
    }
    if (fichaPaciente.genero.trim() === "") {
      return "Debes incluir un genero";
    }
    if (fichaPaciente.estado_civil.trim() === "") {
      return "Debes incluir un estado civil";
    }
    if (fichaPaciente.prevision.trim() === "") {
      return "Debes incluir una prevision";
    }  
    return null; // Si no hay errores, se devuelve `null`
  };
  

