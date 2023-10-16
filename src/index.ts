import Server from './models/server';
import dotenv from 'dotenv';

// Configuramos las variables de entorno
dotenv.config();
//console.log(process.env.PORT)

const server = new Server()