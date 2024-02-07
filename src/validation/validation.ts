import { z } from 'zod';

export const userValidation = () => {
  return z.object({
    fullName: z.string({
      invalid_type_error: 'The full name has a string',
    }),
    cpf: z.string({
      invalid_type_error: 'The cpf has a string',
    }),
    email: z
      .string({
        invalid_type_error: 'The email has a email',
      })
      .email(),
    password: z.string(),
    amount: z.number({
      invalid_type_error: 'The amount has a number',
    }),
  });
};

export const merchantValidation = () => {
  return z.object({
    fullName: z.string({
      invalid_type_error: 'The full name has a string',
    }),
    cnpj: z.string({
      invalid_type_error: 'The cnpj has a string',
    }),
    email: z
      .string({
        invalid_type_error: 'The email has a email',
      })
      .email(),
    password: z.string(),
    amount: z.number({
      invalid_type_error: 'The amount has a number',
    }),
  });
};
