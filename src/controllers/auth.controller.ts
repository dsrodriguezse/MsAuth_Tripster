import { Request, Response} from 'express'

export const singup = (req: Request, res: Response) => {
    res.send('singup');
};

export const singin = (req: Request, res: Response) => {
    res.send('singin');
};

export const profile = (req: Request, res: Response) => {
    res.send('profile');
};