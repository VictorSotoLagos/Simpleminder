export const validateLogin = (newUser) => {
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
      return "Debes incluir tu contraseña";
    }  
    return null;
  
  };
