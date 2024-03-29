import { Request, Response } from 'express';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export const userFieldValidation = (req: Request, res: Response) => {
  const requiredFields = ['fullName', 'cpf', 'email', 'password', 'amount'];
  for (const field of requiredFields) {
    if (field === 'amount') {
      if (req.body[field] === undefined) {
        return res.send(badRequest(new MissingParamError(field)));
      }
      break;
    }

    if (!req.body[field]) {
      return res.send(badRequest(new MissingParamError(field)));
    }
  }
};

export const merchantFieldValidation = (req: Request, res: Response) => {
  const requiredFields = ['fullName', 'cnpj', 'email', 'password', 'amount'];
  for (const field of requiredFields) {
    if (field === 'amount') {
      if (req.body[field] === undefined) {
        return res.send(badRequest(new MissingParamError(field)));
      }
      break;
    }
    if (!req.body[field]) {
      return res.send(badRequest(new MissingParamError(field)));
    }
  }
};

export const transactionFieldValidation = (req: Request, res: Response) => {
  const requiredFields = ['value', 'payeeId'];
  for (const field of requiredFields) {
    if (field === 'value') {
      if (req.body[field] === undefined) {
        return res.send(badRequest(new MissingParamError(field)));
      }
      break;
    }
    if (!req.body[field]) {
      return res.send(badRequest(new MissingParamError(field)));
    }
  }
};
