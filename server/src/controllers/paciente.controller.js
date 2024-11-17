import { Paciente } from '../model/model.paciente.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();



const getPacientes = async (req, res) => {
    try {

       // console.log ("--------FBS---------")
       // console.log ("req.paciente es:", req.paciente)
       // console.log ("req.nombre es:", req.nombre_paciente)
       // console.log ("req.apelludo es:", req.apellido_paciente)
       // console.log ("req.email es", req.email_paciente)
       // console.log ("req.tipo es", req.tipo_paciente)
       // console.log ("--------FBS---------")
       
       const pacienteDB = await Paciente.find();
        return res.status(200).json(pacienteDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener lista de Pacientes',
            error: error.message,
        });
    }
}


const getPacienteID = async (req, res) => {
    try {
        const playlistDB = await Paciente.findOne({ _id: req.params.id });
        return res.status(200).json(playlistDB);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Id incorrecto o no existe',
            error: error.message,
        });
    }
}



    const createPaciente = async (req, res) => {
        const opciones = {
            new: true, // devuelve el documento actualizado
            runValidators: true, // Ejecutar validaciones de esquema en la actualización
        };
    
        try {
            console.log ("--------FBS---------")
            console.log ("req.usuario es:", req.usuario)
            console.log ("req.nombre es:", req.nombre_usuario)
            console.log ("req.apelludo es:", req.apellido_usuario)
            console.log ("req.email es", req.email_usuario)
            console.log ("req.tipo es", req.tipo_usuario)
            console.log ("--------FBS---------")

            const newPaciente = await Paciente.create(req.body);
            // Configuración para el token
            const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'llave';
            const datosToken = {
                id: newPaciente._id,
                nombre: newPaciente.nombre,
                apellido: newPaciente.apellido,
                email: newPaciente.email,
                tipo: newPaciente.tipo_usuario,
            };
    
            // Crear el token
            const token = jwt.sign({ user: datosToken }, LLAVE_SECRETA, { expiresIn: '15m' });


            res
            .cookie('authToken', token, { httpOnly: true, secure: true })
            .status(201)
            .json({ mensaje: 'Usuario creado y logueado', token, usuario: newPaciente });
    
            // Enviar la respuesta con el token
           //RETURN ORIGINAL: return res.status(201).json({ mensaje: 'Usuario creado', token, cuerpo: newUser, opciones });
        } catch (error) {
            return res.status(500).json({
                message: "Error al crear usuario",
                error: error.message,
            });
        }
    }




const updatePaciente = async (req, res) => {
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
        const updatedPaciente = await Paciente.findByIdAndUpdate(id, cuerpo, opciones);

        if (!updatedPaciente) {
            return res.status(400).json({ error: 'No existe el usuario' });
        }

        //EXPERIMENTO: Comparamos CLAVES
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
            return;
        }

        return res.status(200).json({ mensaje: 'Usuario actualizado', cuerpo: updatedUser });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }   
}

const deletePaciente = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Paciente.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ error: 'No existe el usuario' });
        }

        res.json({
            mensaje: 'Usuario eliminado',
            cuerpo: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el usuario',
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {

    try { 
        const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'llave';
        const { email, password } = req.body;
        //const user = await Usuario.findOne({email});
        const user = await Paciente.findOne({ email });
        console.log(user); 
        if (!user) {
             res.status(400).json({ error: 'Paciente o contraseña incorrectos' });
             return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ error: 'Paciente o contraseña incorrectos' });
            return;
        }

        const datosToken = {
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            tipo: user.tipo_Paciente,    
        }

        const token = jwt.sign(datosToken, LLAVE_SECRETA, {expiresIn:'15m'});

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
    res.clearCookie('authToken').json({ mensaje: 'Sesión de Paciente cerrada' });
}

export { getPacientes, getPacienteID, createPaciente, updatePaciente, deletePaciente, loginUser, logoutUser };