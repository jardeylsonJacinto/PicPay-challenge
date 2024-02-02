import { Request, Response } from 'express';

class UserController {
  index(req: Request, res: Response) {
    res.json({ message: 'Hello world!' });
  }
}

export default new UserController();
