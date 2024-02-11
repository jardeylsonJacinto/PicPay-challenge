import prisma from '../config/prisma';
import { ITransaction } from '../models/Transaction';

export const findAllTransactions = async () => {
  const transaction = await prisma.transaction.findMany();
  return transaction;
};

export const createTransaction = async (transaction: ITransaction) => {
  const { userId, payeeId, value } = transaction;
  const merchant = await prisma.merchant.findUnique({
    where: { id: userId },
  });

  if (merchant) {
    throw 'logistas does not have transactions';
  }

  const payer = await prisma.user.findUnique({ where: { id: userId } });
  if (!payer || payer.amount < value) {
    throw 'Payer does not have sufficient balance';
  }

  const payee = await prisma.user.findUnique({ where: { cpf: payeeId } });
  const payeeMerchant = await prisma.merchant.findUnique({
    where: { cnpj: payeeId },
  });

  if (!payee && !payeeMerchant) {
    throw 'Payee does not exist';
  }

  const newTransaction = await prisma.transaction.create({
    data: {
      userId: transaction.userId,
      value: transaction.value,
      payer: payer.cpf,
      payee: transaction.payeeId,
    },
  });

  await prisma.user.update({
    where: { cpf: payer.cpf },
    data: { amount: payer.amount - value },
  });

  if (payee) {
    await prisma.user.update({
      where: { cpf: payeeId },
      data: { amount: payee.amount + value },
    });
  } else if (payeeMerchant) {
    await prisma.merchant.update({
      where: { cnpj: payeeId },
      data: { amount: payeeMerchant.amount + value },
    });
  }

  return newTransaction;
};
