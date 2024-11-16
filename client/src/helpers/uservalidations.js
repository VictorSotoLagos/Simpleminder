export const validateUser = (newUser) => {
    if (newUser.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (newUser.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if (newUser.apellido.trim() === "") {
      return "Debes incluir un apellido";
    }
    if (newUser.apellido.length < 3) {
      return "El apellido debe tener al menos 3 caracteres";
    }
    if (newUser.email.trim() === "") {
      return "Debes incluir correo electrónico";
    }
    if (newUser.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
    if (newUser.email.includes(".") === false) {
      return "Debes incluir un correo electrónico válido con un punto después de la @"; 
    }
    if (newUser.password.trim() === "") {
      return "Debes incluir una contraseña";
    }
    if (newUser.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(newUser.password)) {
      return "La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un mínimo de 8 caracteres, sin puntos ni guiones";
    }
    if (newUser.confirm_password.trim() === "") {
      return "Debes confirmar la contraseña";
    }
    if (newUser.password !== newUser.confirm_password) {
      return "Las contraseñas no coinciden";
    }
  
    return null;
  
  };

export const validateUpdatedUser = (newUser) => {
    if (newUser.nombre.trim() === "") {
      return "Debes incluir un nombre";
    }
    if (newUser.nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if (newUser.apellido.trim() === "") {
      return "Debes incluir un apellido";
    }
    if (newUser.email.trim() === "") {
      return "Debes incluir correo electrónico";
    }
    if (newUser.email.includes("@") === false) {
      return "Debes incluir un correo electrónico válido con @";
    }
  }