export const validatePaciente = (newPaciente) => {
    if (newPaciente.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (newPaciente.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if ((newPaciente.apellidoUno.trim() === "")) {
      return "Debes incluir un apellido paterno";
    }
    if (newPaciente.apellidoUno.length < 3) {
      return "El apellido paterno debe tener al menos 3 caracteres";
    }
    if (newPaciente.email.trim() === "") {
      return "Debes incluir correo electrónico";
    }
    if (newPaciente.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
    if (newPaciente.email.includes(".") === false) {
      return "Debes incluir un correo electrónico válido con un punto después de la @"; 
    }
    if (newPaciente.password.trim() === "") {
      return "Debes incluir una contraseña";
    }
    if (newPaciente.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(newPaciente.password)) {
      return "La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un mínimo de 8 caracteres, sin puntos ni guiones";
    }
    if (newPaciente.confirm_password.trim() === "") {
      return "Debes confirmar la contraseña";
    }
    if (newPaciente.password !== newPaciente.confirm_password) {
      return "Las contraseñas no coinciden";
    }
  
    return null;
  
  };

export const validateUpdatedPaciente = (newPaciente) => {
    if (newPaciente.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (newPaciente.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if (newPaciente.apellido.trim() === "") {
      return "Debes incluir un apellido";
    }
    if (newPaciente.email.trim() === "") {
      return "Debes incluir correo electrónico";
    }
    if (newPaciente.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
  }