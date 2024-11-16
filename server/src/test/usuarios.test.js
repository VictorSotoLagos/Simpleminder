import request from 'supertest';
import { app, server } from '../../server.js';
import Mongoose from "mongoose";
import conectarDB from '../config/config.mongo.js';

//import {conectarDB} from '../src/config/config.mongo';

let usuarioId;

beforeAll((done) => {
    Mongoose.disconnect()
        .then(() => {
            server.close(done);  // Cierra el servidor después de desconectar Mongoose
        })
        .catch(done);  // Si ocurre algún error, lo pasa al callback
});



afterAll((done) => { 
    Mongoose.disconnect();
    server.close(done)       
})

describe('Pruebas de rutas de usuarios', () => {
  
  test('GET /personas debe devolver una lista de usuarios', async () => {
    await Mongoose.connect("mongodb://localhost:27017/personas", {})
    const response = await request(app).get('/personas');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  /*
  test('GET ERROR / no es posible obtener lista de personas', async () => {
    await Mongoose.connect("mongodb://localhost:27017/personas", {})
    const response = await request(app).get('/persona');
    console.log ("status code:" + response.statusCode)
    expect(response.statusCode).toBe(500);
  });
  */

  test('POST /personas debe crear un nuevo usuario', async () => {
    const nuevoUsuario = {
      nombre: "Registro TEST",
      edad: 10,
      país: "País TEST",
      email: "mailtest@test.com",
    };
    const response = await request(app)
      .post('/personas/add/')
      .send(nuevoUsuario);
    console.log("response body: ", response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.cuerpo).toMatchObject(nuevoUsuario);
    usuarioId = response.body.cuerpo._id;
  });

  test('POST /usuario ya existe', async () => {
    const nuevoUsuario = {
      nombre: "Antonio Tonino López",
      edad: 50,
      país: "Argentina",
      email: "tonino@gmail.com",
    };
    const response = await request(app)
      .post('/personas/add/')
      .send(nuevoUsuario);
    console.log("response body: ", response.body);
    expect(response.statusCode).toBe(400);
  });

  test('POST falta el nombre, edad, país o email', async () => {
    const nuevoUsuario = {
      nombre: "",
      edad: undefined,
      país: "",
      email: "",
    };
    const response = await request(app)
      .post('/personas/add/')
      .send(nuevoUsuario);
    console.log("response body: ", response.body);
    expect(response.statusCode).toBe(400);
  });

  test('GET por ID/', async () => {
    await Mongoose.connect("mongodb://localhost:27017/personas", {})
    const response = await request(app).get(`/personas/${usuarioId}`);
    expect(response.statusCode).toBe(200);
  });

  test('GET por ID inexistente', async () => {
    await Mongoose.connect("mongodb://localhost:27017/personas", {})
    const response = await request(app).get(`/personas/500`);
    expect(response.statusCode).toBe(500);
  });

  test('PUT /api/personas/:id debe actualizar un usuario existente', async () => {
    const usuarioActualizado = { 
        nombre: "Juan Actualizado",
        edad: 50,
        país: "Argentina",
        email: "juanactualizado@gmail.com", };
    
    // Utiliza el ID del usuario creado en el test anterior
    const response = await request(app)
      .put(`/personas/${usuarioId}`) // Usa el ID almacenado
      .send(usuarioActualizado);
      
    expect(response.statusCode).toBe(200);
    console.log("response body: ", response.body);
    expect(response.body.cuerpo.nombre).toBe('Juan Actualizado');
  });

  test('DELETE /api/usuarios/:id debe eliminar un usuario existente', async () => {
    const response = await request(app).delete(`/personas/${usuarioId}`);
    expect(response.statusCode).toBe(200);
    console.log("response body: ", response.body);
    expect(response.body.mensaje).toBe('Usuario eliminado');
  });

/*
  test('ERROR CONEXION MONGODB', async () => { 
    // Mock de Mongoose.connect dentro del test
    Mongoose.connect = jest.fn().mockRejectedValue(new Error("Error al conectar a MongoDB"));

    // Ejecuta el método de conexión y verifica que lance el error
    await expect(Mongoose.connect("mongodb://localhost:27017/personas", {}))
        .rejects.toThrow("Error al conectar a MongoDB");

    // Verifica que se haya llamado a connect con los argumentos correctos
    expect(Mongoose.connect).toHaveBeenCalledWith("mongodb://localhost:27017/personas", {});
});
*/

});

