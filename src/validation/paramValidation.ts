import { z } from 'zod';

export const userParamValidation = () => {
  return z.object({
    fullName: z.string({
      invalid_type_error: 'The full name has to be a string',
    }),
    cpf: z.string({
      invalid_type_error: 'The cpf has to be a string',
    }),
    email: z
      .string({
        invalid_type_error: 'The email has to be a email',
      })
      .email(),
    password: z.string({
      invalid_type_error: 'The email has to be a email',
    }),
    amount: z.number({
      invalid_type_error: 'The amount has to be a number',
    }),
  });
};

export const merchantParamValidation = () => {
  return z.object({
    fullName: z.string({
      invalid_type_error: 'The full name has to be a string',
    }),
    cnpj: z.string({
      invalid_type_error: 'The cnpj has to be a string',
    }),
    email: z
      .string({
        invalid_type_error: 'The email has to be a email',
      })
      .email(),
    password: z.string({
      invalid_type_error: 'The password has to be a string',
    }),
    amount: z.number({
      invalid_type_error: 'The amount has to be a number',
    }),
  });
};

export const transactionValidation = () => {
  return z.object({
    payerId: z.string({
      invalid_type_error: 'The payer Id has to be a string',
    }),
    payeeId: z.string({
      invalid_type_error: 'The payee Id has to be a string',
    }),
    value: z.number({
      invalid_type_error: 'The value has to be a number',
    }),
  });
};

export const transactionParamsValidation = () => {
  return z.object({
    userId: z.string().uuid(),
  });
};
