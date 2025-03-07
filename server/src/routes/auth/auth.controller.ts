import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  res.redirect('/dashboard');
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};
