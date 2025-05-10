import { Request, Response, NextFunction } from 'express';
import User from '../../models/user.model';
import { comparePassword, encryptPassword } from './middleware';

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user) {
        const { userId, name, email, joinDate } = req.user as {
          userId: number;
          name: string;
          email: string;
          joinDate: Date;
        };
        res.json({ userId, name, email, joinDate });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      next(error);
    }
  }
);

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (!comparePassword(password, user.password!)) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const userData = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      joinDate: user.joinDate,
    };
    req.login(userData, (error) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json(userData);
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const userId = (await User.countDocuments()) + 1;
    const user = new User({
      userId,
      email,
      password: encryptPassword(password),
      name,
    });
    await user.save();
    const userData = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      joinDate: user.joinDate,
    };
    req.login(userData, (error) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json(userData);
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});
