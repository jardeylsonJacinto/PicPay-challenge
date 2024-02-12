import { Request, Response } from 'express';
import { ITransaction } from '../models/Transaction';
import {
  createTransaction,
  findAllTransactions,
} from '../services/TransactionService';
import { transactionFieldValidation } from '../validation/fieldValidation';
import {
  transactionBodyParamValidation,
  transactionParamsValidation,
} from '../validation/paramValidation';
import { authorizeTransaction } from '../middlewares/transactionAuth';

class TransactionController {
  async index(req: Request, res: Response) {
    const transactions = await findAllTransactions();
    return res.json(transactions);
  }
  async store(req: Request, res: Response) {
    transactionFieldValidation(req, res);
    const { userId } = transactionParamsValidation().parse(req.params);
    const { payeeId, value } = transactionBodyParamValidation().parse(req.body);
    const transaction: ITransaction = {
      userId,
      payeeId,
      value,
    };
    const authorized = await authorizeTransaction();
    if (!authorized) {
      res.status(400).json({ error: 'Transaction not authorized' });
      return;
    }

    try {
      const newTransaction = await createTransaction(transaction);
      return res.status(200).json(newTransaction);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new TransactionController();
