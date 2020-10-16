import { Request, Response } from 'express';
import createUser from './services/CreateUser';

function helloWorld(req: Request, res: Response) {
    const user = createUser({
        email: 'andre@gmail.com',
        password: '123456',
        techs: [
            'nodejs',
            'reactjs',
            'react native',
        ],
    });
};

export default helloWorld;