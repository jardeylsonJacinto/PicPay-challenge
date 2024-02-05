import prisma from '../config/prisma';
import { IUser } from '../models/User';

export const registerUser = async (user: IUser) => {
  const newUser = await prisma.user.create({
    data: {
      fullName: user.fullName,
      cpf: user.cpf,
      email: user.email,
      password: user.password,
    },
  });
  return newUser;
};
