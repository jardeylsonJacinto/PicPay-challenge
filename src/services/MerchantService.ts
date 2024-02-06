import prisma from '../config/prisma';
import { IMerchant } from '../models/Merchant';

export const findAllMerchant = async () => {
  const users = await prisma.merchant.findMany();
  return users;
};

export const registerMerchant = async (user: IMerchant) => {
  const newMerchant = await prisma.merchant.create({
    data: {
      fullName: user.fullName,
      cnpj: user.cnpj,
      email: user.email,
      password: user.password,
    },
  });
  return newMerchant;
};
