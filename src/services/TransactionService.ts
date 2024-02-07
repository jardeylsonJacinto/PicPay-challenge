import prisma from '../config/prisma';
import { ITransaction } from '../models/Transaction';

export const findAllTransactions = async () => {
  const transaction = await prisma.transaction.findMany();
  return transaction;
};

export const createTransaction = async (transaction: ITransaction) => {
  const { userId, payerId, payeeId, value } = transaction;

  const payer = await prisma.user.findUnique({ where: { cpf: payerId } });
  const payee = await prisma.user.findUnique({ where: { cpf: payeeId } });
  const merchant = await prisma.merchant.findUnique({
    where: { cnpj: payerId },
  });

  if (merchant) {
    throw new Error('logistas does not have transactions');
  }
  
  if (!payer || payer.amount < value) {
    throw new Error('Payer does not have sufficient balance');
  }
  if (!payee) {
    throw new Error('Payee does not exist');
  }
  const newTransaction = await prisma.transaction.create({
    data: {
      userId: transaction.userId,
      value: transaction.value,
      payer: transaction.payerId,
      payee: transaction.payeeId,
    },
  });

  await prisma.user.update({
    where: { cpf: payerId },
    data: { amount: payer.amount - value },
  });
  await prisma.user.update({
    where: { cpf: payeeId },
    data: { amount: payee.amount + value },
  });
  return newTransaction;
};
