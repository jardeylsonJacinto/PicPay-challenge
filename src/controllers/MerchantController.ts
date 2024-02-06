import { Request, Response } from 'express';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { IMerchant } from '../models/Merchant';
import { findAllMerchant, registerMerchant } from '../services/MerchantService';

class UserController {
  async index(req: Request, res: Response) {
    const merchants = await findAllMerchant();
    return res.json(merchants);
  }
  async store(req: Request, res: Response) {
    const requiredFields = ['fullName', 'cnpj', 'email', 'password'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.send(badRequest(new MissingParamError(field)));
      }
    }
    const { fullName, cnpj, email, password } = req.body;
    const merchant: IMerchant = { fullName, cnpj, email, password };

    try {
      const newMerchant = await registerMerchant(merchant);
      return res.status(200).json(newMerchant);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes(
            'Unique constraint failed on the fields: (`cnpj`)'
          )
        ) {
          return res.json({
            status: 'error',
            message: 'cnpj já está em uso.',
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
