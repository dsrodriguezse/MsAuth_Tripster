import { Request, Response } from 'express';
import connection from '../db/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUsuario = async (req: Request, res: Response) => {

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
export const loginUser = (req: Request, res: Response) => {
        
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
                        const token = jwt.sign({
                            nombre: nombre,
                        }, process.env.SECRET_KEY || 'Tripster_2023',
                        { expiresIn : "20000" })
                        
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
