import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { InvalidParamError } from '../errors/invalid-param-error';
import { badRequest } from '../helpers/http-helper';
import { IUser } from '../models/User';
import { findAllUsers, registerUser } from '../services/UserService';
import { userFieldValidation } from '../validation/fieldValidation';
import { userParamValidation } from '../validation/paramValidation';

class UserController {
  async index(req: Request, res: Response) {
    const users = await findAllUsers();
    return res.json(users);
  }

  async store(req: Request, res: Response) {
    userFieldValidation(req, res);

    const { fullName, cpf, email, password, amount } =
      userParamValidation().parse(req.body);

    const user: IUser = { fullName, cpf, email, password, amount };

    try {
      const newUser = await registerUser(user);
      return res.status(201).json(newUser);
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
      if (error instanceof ZodError) {
        const errorMessage = error.issues[0]?.message || 'Erro desconhecido';
        return res.send(badRequest(new InvalidParamError(errorMessage)));
      }
    }
  }
}

export default new UserController();
