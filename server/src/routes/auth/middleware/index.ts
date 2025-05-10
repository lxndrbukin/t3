import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  if ((req.session as any).passport.user === Number(userId)) {
    return next();
  } else {
    res.status(401).json({ message: 'Access unauthorized' });
  }
};

export const encryptPassword = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePassword = (
  password: string,
  encryptedPassword: string
) => {
  return encryptPassword(password) === encryptedPassword;
};
