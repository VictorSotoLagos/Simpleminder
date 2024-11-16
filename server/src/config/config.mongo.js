import Mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const URI_MONGODB = process.env.MONGODB_URI;
const BASE_DATOS = process.env.BASE_DATOS;

async function conectarDB() {
    try {
        await Mongoose.connect(URI_MONGODB, {dbName: BASE_DATOS})  
        console.log("Conexión Exitosa a MongoDB")
    } catch (error) {
        console.log("Error al conectar a MongoDB", error);
        throw error ; 
    };

} 
export default conectarDB;