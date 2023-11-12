import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    
    const headerToken = req.headers['authorization'];

    console.log("HEADER TOKEN",headerToken);

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        const bearerToken = headerToken.slice(7);

        try {
            const tokenValido = jwt.verify(bearerToken, process.env.SECRET_KEY || 'Tripster_2023');
            console.log(tokenValido)
            res.status(200).json({
                token: true
            })
            next();
            /*return res.status(500).json({
                msg: 'Acceso concedido;)',
            });*/
        } catch (error) {
            res.status(400).json({
                error: 'token no valido'
            })
        }
    } else {
        res.status(400).json({
            error: 'Acceso denegado'
        })
    }
}

export default validateToken