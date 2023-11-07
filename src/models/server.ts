import express, { Application } from 'express';
import connection from '../db/connection';
import routesProducto from '../routes/producto.routes';
import routesDefault from '../routes/default.routes';
import routesUsuario from '../routes/usuario.routes';
import { connectDB } from '../db/database';
import '../db/database';



class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();        
        this.conectDB();
        this.midlewares()
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
    /*
    //Conexión original
    conectDB() {
        connection.connect((err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('Base de datos conectada exitosamente!');
            }
        })
    }*/
    async conectDB(){
        try {
            await connectDB(); // Llama a la función para conectar a la base de datos
            // Aquí puedes colocar el resto de tu lógica de la aplicación
            console.log('Mensajeee');
        } catch (error) {
            // Manejar el error de conexión a la base de datos
            console.error('Error al iniciar la aplicación:', error);
        }
    }

    routes() {
        this.app.use('/', routesDefault);
        this.app.use('/api/productos', routesProducto );
        this.app.use('/api/usuarios', routesUsuario );
    }
    midlewares() {
        this.app.use(express.json());
    }
}
export default Server;
