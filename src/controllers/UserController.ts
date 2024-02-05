import { Request, Response } from 'express';
import { IUser } from '../models/User';
import { findAllUsers, registerUser } from '../services/UserService';

class UserController {
  async index(req: Request, res: Response) {
    const users = await findAllUsers();
    return res.json(users);
  }
  async store(req: Request, res: Response) {
    console.log(req.body);
    const { fullName, cpf, email, password } = req.body;
    const user: IUser = { fullName, cpf, email, password };

    try {
      const newUser = await registerUser(user);
      return res.status(200).json(newUser);
    } catch (error) {
      // Trate o erro adequadamente (por exemplo, envie uma resposta de erro específica).
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new UserController();
