import { Request, Response } from 'express';
import { ITransaction } from '../models/Transaction';
import {
  createTransaction,
  findAllTransactions,
} from '../services/TransactionService';
import { transactionFieldValidation } from '../validation/fieldValidation';
import {
  transactionParamsValidation,
  transactionValidation,
} from '../validation/paramValidation';

class TransactionController {
  async index(res: Response) {
    const transactions = await findAllTransactions();
    return res.json(transactions);
  }
  async store(req: Request, res: Response) {
    transactionFieldValidation(req, res);
    const { userId } = transactionParamsValidation().parse(req.params);
    const { value, payerId, payeeId } = transactionValidation().parse(req.body);
    const transaction: ITransaction = {
      userId,
      value,
      payerId,
      payeeId,
    };

    try {
      const newTransaction = await createTransaction(transaction);
      return res.status(200).json(newTransaction);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TransactionController();
