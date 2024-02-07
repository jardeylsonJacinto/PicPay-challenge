import { Request, Response } from 'express';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { ITransaction } from '../models/Transaction';
import {
  createTransaction,
  findAllTransactions,
} from '../services/TransactionService';

class TransactionController {
  async index(req: Request, res: Response) {
    const transactions = await findAllTransactions();
    return res.json(transactions);
  }
  async store(req: Request, res: Response) {
    const requiredFields = ['userId', 'value', 'payerId', 'payeeId'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.send(badRequest(new MissingParamError(field)));
      }
    }
    const { userId, value, payerId, payeeId } = req.body;
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
