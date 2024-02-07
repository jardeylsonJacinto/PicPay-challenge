import prisma from '../config/prisma';
import { IMerchant } from '../models/Merchant';

export const findAllMerchant = async () => {
  const merchants = await prisma.merchant.findMany();
  return merchants;
};

export const registerMerchant = async (merchant: IMerchant) => {
  const newMerchant = await prisma.merchant.create({
    data: {
      fullName: merchant.fullName,
      cnpj: merchant.cnpj,
      email: merchant.email,
      password: merchant.password,
      amount: merchant.amount,
    },
  });
  return newMerchant;
};
