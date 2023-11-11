import { Request, Response } from 'express';
import connection from '../db/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mongo } from 'mongoose';
import User from '../models/User'; // Importa el modelo de usuario de Mongoose
import crypto from 'crypto';


//MySQL
export const addUsuarioMySQL = async (req: Request, res: Response) => {

    const { nombre, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query('INSERT INTO usuarios set ?', { nombre:nombre, password:hashedPassword }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                msg: 'Add Usuario',
            })
        }
    })
}
export const loginUserMySQL = (req: Request, res: Response) => {
        
    const { nombre, password } = req.body;

    connection.query('SELECT * FROM usuarios WHERE nombre = ' + connection.escape(nombre), (err, data) => {
        if(err) {
            console.log(err)
        } else{
            if(data.length == 0) {
                // No existe el usuario en la base de datos
                res.json({
                    msg: 'No existe el usuario en la base de datos',                    
                })
            } else {
                // Existe
                const userPassword = data[0].password;
                console.log(password)
                // Comparamos el password
                bcrypt.compare(password, userPassword).then((result) => {
                    if(result) {
                        // Login exitoso -- Generamos el token
                        const token = { token : jwt.sign({
                            nombre: nombre,
                        }, process.env.SECRET_KEY || 'Tripster_2023',
                        { expiresIn : "20000" })}
                        
                        res.json({
                            token
                        })
                    } else {
                        // Password incorrecto
                        res.json({
                            msg: 'Password incorrecto',
                        })
                    }
                })                
            }           
        }
    })   
}
export const getUsuariosMySQL = (req: Request, res: Response) => {
    connection.query('SELECT * FROM productos', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                data
            })
        }
    })
}
////////////

//Mongo
export const addUsuario = async (req: Request, res: Response) => {
    const { nombre, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({ nombre, password: hashedPassword });
        await nuevoUsuario.save();

        res.json({
            msg: 'Usuario agregado correctamente',
        });
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({
            msg: 'Error en el servidor',
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, clave } = req.body;

    try {
        const user = await User.findById(email);
        //console.log(email,clave,user);

        if (!user) {
            // No existe el usuario en la base de datos
            return res.json({
                msg: 'No existe el usuario en la base de datos',
            });
        }
        // Existe
        const userPassword = user.clave;
                
        //console.log(user)
        const encriptarClave = (clave: string): string => {
            try {
                const hash = crypto.createHash('sha256').update(clave).digest('hex');
                return hash;
            } catch (error) {

                throw new Error('Error al encriptar la clave');
            }
        };
        

        const claveEncriptada = encriptarClave(clave);

        //console.log(claveEncriptada,userPassword)
        // Comparamos el password
        //const passwordMatch = await bcrypt.compare(claveEncriptada, userPassword);
        //console.log(passwordMatch)

        if (claveEncriptada==userPassword) {
            // Login exitoso -- Generamos el token
            const token = jwt.sign({ email }, process.env.SECRET_KEY || 'Tripster_2023', { expiresIn: '10m' });

            return res.json({
                token,
            });
        } else {
            // Password incorrecto
            
            return res.json({
                msg: 'Password incorrecto',
            });
        }        
    } catch (error) {
        console.error('Error al realizar la consulta en la base de datos:', error);
        return res.status(500).json({
            msg: 'Error en el servidor',
        });
    }
};

export const getUsuarioPorId = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const usuario = await User.findById(id);
        res.json({ usuario });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' }); // Manejar errores de la base de datos MongoDB
    }
};

export const getUsuarioToken = async (req: Request, res: Response) => {

    try {
        const { email } = req.body;
        console.log(req.body)
        const user = await User.findById(email);
        if (user) {
            console.log('Encontro usuario')
            return res.json({ user });            
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' }); // Manejar errores de la base de datos MongoDB
    }
};


export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await User.find(); // Consulta usuarios
        //console.log({ usuarios })
        //let usu = { "NOMBRE": "NombreUsuario", "APELLIDO": "ApellidoUsuario" }
        //res.json({ usu }); // Envia la lista de usuarios
        res.json({usuarios});
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' }); // Manejar errores de la base de datos MongoDB
    }
};