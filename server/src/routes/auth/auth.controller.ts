import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  res.redirect('/dashboard');
};

export const getUser = (req: Request, res: Response) => {
  if (req.user) {
    res.json(req.user);
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};
