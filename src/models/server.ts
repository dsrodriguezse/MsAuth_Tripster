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
    //Conexi�n original
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
            await connectDB(); // Llama a la funci�n para conectar a la base de datos
            // Aqu� puedes colocar el resto de tu l�gica de la aplicaci�n
            console.log('Mensajeee');
        } catch (error) {
            // Manejar el error de conexi�n a la base de datos
            console.error('Error al iniciar la aplicaci�n:', error);
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
