import { Request, Response } from 'express';

import User from '../../models/user.model';

export const login = (req: Request, res: Response) => {
  res.redirect('/');
};

export const signup = async (req: Request, res: Response) => {
  const { displayName, email } = req.session as any;
  const id = (await User.countDocuments()) + 1;
  const user = new User({ id, name, email });
  await user.save();
  req.login(user, () => {
    res.redirect('/');
  });
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};
