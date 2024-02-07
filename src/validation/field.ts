import { Request } from 'express';

export const userField = (req: Request) => {
  const requiredFields = ['fullName', 'cpf', 'email', 'password', 'amount'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return field;
    }
  }
};

export const merchantField = (req: Request) => {
  const requiredFields = ['fullName', 'cnpj', 'email', 'password'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return field;
    }
  }
};
