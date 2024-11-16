export const validateDato1 = (datoRecibido) => {

    if (datoRecibido.titulo.trim() === "") {
    return "Por favor, proporciona el título de la película";
  }
    if (datoRecibido.titulo.length < 5 ){
      return "El título debe tener al menos 5 caracteres y deber ser único";
    }
    if (!datoRecibido.año) {
      return "Por favor, proporciona el año de lanzamiento";
    }
    if (datoRecibido.año <= 0) {
      return "El año de lanzamiento debe ser un número positivo";
    }
    if (datoRecibido.autor.trim() === "") {
      return "Por favor, proporciona el director de la película";
    }
    if (datoRecibido.autor.length < 5 ){
      return "El director debe tener al menos 5 caracteres";
    }
    if (datoRecibido.genero.trim() === "") {
      return "Por favor, proporciona género";
    }
    if (datoRecibido.genero.length < 3 ){
      return "El genero debe tener al menos 3 caracteres";
    }
    if (datoRecibido.URL.trim() === "" || !/\.(jpg|png|jpeg|gif|bmp|webp)$/i.test(datoRecibido.URL)) {
        return "Por favor, proporciona una URL válida y con extensión de imagen válida (jpg, png, jpeg, gif, bmp, webp)";
    }
    return null;
  }