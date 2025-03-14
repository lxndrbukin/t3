import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response) => {
  res.redirect('/dashboard');
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};
