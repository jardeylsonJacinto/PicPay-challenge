import { Request, Response } from 'express';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { IUser } from '../models/User';
import { findAllUsers, registerUser } from '../services/UserService';

class UserController {
  async index(req: Request, res: Response) {
    const users = await findAllUsers();
    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const requiredFields = ['fullName', 'cpf', 'email', 'password'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.send(badRequest(new MissingParamError(field)));
      }
    }
    const { fullName, cpf, email, password } = req.body;
    const user: IUser = { fullName, cpf, email, password };

    try {
      const newUser = await registerUser(user);
      return res.status(200).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes(
            'Unique constraint failed on the fields: (`cpf`)'
          )
        ) {
          return res.json({
            status: 'error',
            message: 'CPF já está em uso.',
          });
        }
        if (
          error.message.includes(
            'Unique constraint failed on the fields: (`email`)'
          )
        ) {
          return res.json({
            status: 'error',
            message: 'email já está em uso.',
          });
        }
      }
    }
  }
}

export default new UserController();
