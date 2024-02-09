import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { InvalidParamError } from '../errors/invalid-param-error';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { IMerchant } from '../models/Merchant';
import { findAllMerchant, registerMerchant } from '../services/MerchantService';
import { merchantField } from '../validation/fieldValidation';
import { merchantValidation } from '../validation/paramValidation';

class UserController {
  async index(res: Response) {
    const merchants = await findAllMerchant();
    return res.json(merchants);
  }
  async store(req: Request, res: Response) {
    const isParamValid = merchantValidation();
    const isFieldValid = merchantField(req);

    if (isFieldValid) {
      return res.send(badRequest(new MissingParamError(isFieldValid)));
    }

    try {
      const { fullName, cnpj, email, password, amount } = isParamValid.parse(
        req.body
      );
      const merchant: IMerchant = { fullName, cnpj, email, password, amount };
      const newMerchant = await registerMerchant(merchant);
      return res.status(201).json(newMerchant);
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
      if (error instanceof ZodError) {
        const errorMessage = error.issues[0]?.message || 'Erro desconhecido';
        return res.send(badRequest(new InvalidParamError(errorMessage)));
      }
    }
  }
}

export default new UserController();
