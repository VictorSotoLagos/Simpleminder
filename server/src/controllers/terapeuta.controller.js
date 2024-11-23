import { Terapeuta } from '../model/model.terapeuta.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();



const getTerapeutas = async (req, res) => {
    try {

       // console.log ("--------FBS---------")
       // console.log ("req.paciente es:", req.paciente)
       // console.log ("req.nombre es:", req.nombre_paciente)
       // console.log ("req.apelludo es:", req.apellido_paciente)
       // console.log ("req.email es", req.email_paciente)
       // console.log ("req.tipo es", req.tipo_paciente)
       // console.log ("--------FBS---------")
       
       const terapeutaDB = await Terapeuta.find();
        return res.status(200).json(terapeutaDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener lista de terapeutas',
            error: error.message,
        });
    }
}


const getTerapeutaID = async (req, res) => {
    try {
        const terapeutaDB = await Terapeuta.findOne({ _id: req.params.id });
        return res.status(200).json(terapeutaDB);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Id incorrecto o no existe',
            error: error.message,
        });
    }
}



    const createTerapeuta = async (req, res) => {
        const opciones = {
            new: true, // devuelve el documento actualizado
            runValidators: true, // Ejecutar validaciones de esquema en la actualización
        };
    
        try {
            console.log ("--------FBS---------")
            console.log ("req.paciente es:", req.terapeuta)
            console.log ("req.nombre es:", req.nombre)
            console.log ("req.apellido es:", req.apellidoUno)
            console.log ("req.apellido es:", req.apellidoDos)
            console.log ("req.email es", req.email)
            console.log ("req.tipo es", req.tipo_usuario)
            console.log ("--------FBS---------")

            const newTerapeuta = await Terapeuta.create(req.body);
            // Configuración para el token
            const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'llave';
            const datosToken = {
                id: newTerapeuta._id,
                nombre: newTerapeuta.nombre,
                apellidoUno: newTerapeuta.apellidoUno,
                apellidoDos: newTerapeuta.apellidoDos,
                email: newTerapeuta.email,
                genero: newTerapeuta.genero,
                tipo_usuario: newTerapeuta.tipo_usuario,
            };
    
            // Crear el token
            const token = jwt.sign({ user: datosToken }, LLAVE_SECRETA, { expiresIn: '45m' });


            res
            .cookie('authToken', token, { httpOnly: true, secure: true })
            .status(201)
            .json({ mensaje: 'Terapeuta creado y logueado', token, terapeuta: newTerapeuta });
    
            // Enviar la respuesta con el token
           //RETURN ORIGINAL: return res.status(201).json({ mensaje: 'Usuario creado', token, cuerpo: newUser, opciones });
        } catch (error) {
            return res.status(500).json({
                message: "Error al crear terapeuta",
                error: error.message,
            });
        }
    }




const updateTerapeuta = async (req, res) => {
    const id = req.params.id;
    const cuerpo = req.body;
    const { password } = req.body;
    console.log("password", password);

    const opciones = {
        new: true, //devuelve el documento actualizado
        runValidators: true, //Ejecutar validaciones de esquema en al actualización
    }

    try {
        
        console.log(id);
        const updatedTerapeuta = await Terapeuta.findByIdAndUpdate(id, cuerpo, opciones);

        if (!updatedTerapeuta) {
            return res.status(400).json({ error: 'No existe el paciente' });
        }

        //EXPERIMENTO: Comparamos CLAVES
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ error: 'Terapeuta o contraseña incorrectos' });
            return;
        }

        return res.status(200).json({ mensaje: 'Terapeuta actualizado', cuerpo: updatedUser });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el terapeuta',
            error: error.message,
        });
    }   
}

//PATCH PACIENTE (sin password ni id):

const patchTerapeuta = async (req, res) => {
    const id = req.params.id;
    let camposAActualizar = { ...req.body }; // Hacemos una copia de los datos enviados

    // Verifica y elimina los campos _id y password si están presentes
    if (camposAActualizar._id) {
        delete camposAActualizar._id;
    }
    if (camposAActualizar.password) {
        delete camposAActualizar.password;
    }

    const opciones = {
        new: true, // Devuelve el documento actualizado
        runValidators: true, // Valida los campos proporcionados
    };

    try {
        // Actualización parcial
        const terapeutaActualizado = await Terapeuta.findByIdAndUpdate(
            id,
            camposAActualizar,
            opciones
        );

        if (!terapeutaActualizado) {
            return res.status(404).json({ error: 'Error: Terapeuta no encontrado' });
        }

        return res.status(200).json({
            mensaje: 'Datos del terapeuta actualizados',
            datos: terapeutaActualizado,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al actualizar datos del paciente',
            error: error.message,
        });
    }
};

/*
const patchPaciente = async (req, res) => {
    const id = req.params.id;
    const camposAActualizar = req.body; // Solo los campos proporcionados

    const opciones = {
        new: true, // Devuelve el documento actualizado
        runValidators: true, // Valida los campos proporcionados
    };

    try {
        // Actualización parcial
        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, camposAActualizar, opciones);

        if (!pacienteActualizado) {
            return res.status(400).json({ error: 'Error: No existe el paciente' });
        }

        return res.status(200).json({ mensaje: 'Datos del paciente actualizados', datos: pacienteActualizado });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al actualizar datos del paciente',
            error: error.message,
        });
    }
};
*/

const deleteTerapeuta = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Terapeuta.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ error: 'No existe el terapeuta' });
        }

        res.json({
            mensaje: 'Terapeuta eliminado',
            cuerpo: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar al terapeuta',
            error: error.message,
        });
    }
};

/*

const loginUser = async (req, res) => {

    try { 
        const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'llave';
        const { email, password } = req.body;
     
        const user = await Terapeuta.findOne({ email });
        console.log(user); 
        if (!user) {
             res.status(400).json({ error: 'Terapeuta o contraseña incorrectos' });
             return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ error: 'Contraseña incorrectos' });
            return;
        }

        const datosToken = {
            id: user._id,
            nombre: user.nombre,
            apellidoUno: user.apellidoUno,
            apellidoDos: user.apellidoDos,
            email: user.email,
            genero: user.genero,
            tipo_usuario: user.tipo_usuario,
        }

        
        const token = jwt.sign(datosToken, LLAVE_SECRETA, {expiresIn:'45m'});

        res.cookie('authToken', token, { httpOnly: true, secure: true }).json(
            {
            token, 
            datosToken,
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
 
    }
}



const logoutUser = async (req, res) => {
    res.clearCookie('authToken').json({ mensaje: 'Sesión de terapeuta cerrada' });
}
    */

export { getTerapeutas, getTerapeutaID, createTerapeuta, updateTerapeuta, patchTerapeuta, deleteTerapeuta };