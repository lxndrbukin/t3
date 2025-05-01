import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  if ((req.session as any).passport.user === Number(userId)) {
    return next();
  } else {
    res.status(401).json({ message: "Access unauthorized" });
  }
};
