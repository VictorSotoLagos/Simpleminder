import { Peliculas } from "../model/model.pelicula.js";

// Listar Usuarios en BD
const getPeliculas = async (req, res) => {
    const query = req.query;
    console.log(query);
    try {
        const usuariosDB = await Peliculas.find();
        return res.status(200).json(usuariosDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener lista de películas',
            error: error.message,
        });
    }
}

// Buscar usuario por ID en BD
const getPeliculaID = async (req, res) => {
    try {
        const peliculasDB = await Peliculas.findOne({ _id: req.params.id });
        return res.status(200).json(peliculasDB);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Id de tarea incorrecto o no existe',
            error: error.message,
        });
    }
}

// Agregar Canción
const postPelicula = async (req, res) => {
    //const { nombre, email } = req.body;

    const opciones = {
        new: true, //devuelve el documento actualizado
        runValidators: true, //Ejecutar validaciones de esquema en al actualización
    }

    try {
        const newTarea = await Peliculas.create(req.body);
        return res.status(201).json({ mensaje: 'Película creada', cuerpo: newTarea, opciones });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear tarea",
            error: error.message,
        });
    }
};

// Actualizar usuario en BD
const putPelicula = async (req, res) => {
    const id = req.params.id;
    const cuerpo = req.body;

    const opciones = {
        new: true, //devuelve el documento actualizado
        runValidators: true, //Ejecutar validaciones de esquema en al actualización
    }

    try {
        const peliculasActualizado = await Peliculas.findByIdAndUpdate(id, cuerpo, opciones);
        console.log(peliculasActualizado);
        if (!peliculasActualizado) {
            return res.status(400).json({ error: 'No existe la tarea' });
        }

        return res.status(200).json({ mensaje: 'pelicula actualizada', cuerpo: peliculasActualizado });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar la película',
            error: error.message,
        });
    }   
}

const patchPelicula = async (req, res) => {
    const id = req.params.id;
    const cuerpo = req.body;

    const opciones = {
        new: true, //devuelve el documento actualizado
        runValidators: true, //Ejecutar validaciones de esquema en al actualización
    }

    try {
        const peliculasActualizado = await Peliculas.findByIdAndUpdate(id, cuerpo, opciones);

        if (!peliculasActualizado) {
            return res.status(400).json({ error: 'No existe la tarea' });
        }

        return res.status(200).json({ mensaje: 'Película actualizada', cuerpo: peliculasActualizado });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar la película',
            error: error.message,
        });
    }   
}

// Eliminar usuario por ID usando BD real
const deletePelicula = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Peliculas.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ error: 'No existe la película' });
        }

        res.json({
            mensaje: 'película eliminada',
            cuerpo: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar la tarea',
            error: error.message,
        });
    }
};



export {
    getPeliculas,
    getPeliculaID,
    postPelicula,
    putPelicula,
    deletePelicula,
};