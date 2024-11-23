export const validateTerapeuta = (newTerapeuta) => {
    if (newTerapeuta.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (newTerapeuta.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if ((newTerapeuta.apellidoUno.trim() === "")) {
      return "Debes incluir un apellido paterno";
    }
    if (newTerapeuta.apellidoUno.length < 3) {
      return "El apellido paterno debe tener al menos 3 caracteres";
    }
    if (newTerapeuta.email.trim() === "") {
      return "Debes incluir correo electrónico";
    }
    if (newTerapeuta.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
    if (newTerapeuta.email.includes(".") === false) {
      return "Debes incluir un correo electrónico válido con un punto después de la @"; 
    }
    if (newTerapeuta.genero.trim() === "") {
      return "Debes incluir un genero";
    }
    if (newTerapeuta.password.trim() === "") {
      return "Debes incluir una contraseña";
    }
    if (newTerapeuta.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(newTerapeuta.password)) {
      return "La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un mínimo de 8 caracteres, sin puntos ni guiones";
    }
    if (newTerapeuta.confirm_password.trim() === "") {
      return "Debes confirmar la contraseña";
    }
    if (newTerapeuta.password !== newTerapeuta.confirm_password) {
      return "Las contraseñas no coinciden";
    }
  
    return null;
  
  };

export const validateUpdatedTerapeuta = (newTerapeuta) => {
    if (newTerapeuta.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (newTerapeuta.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if (newTerapeuta.apellido.trim() === "") {
      return "Debes incluir un apellido";
    }
    if (newTerapeuta.email.trim() === "") {
      return "Debes incluir correo electrónico";
    }
    if (newTerapeuta.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
  }