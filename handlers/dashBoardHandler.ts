import { Request, Response } from "express";

export const getDashboard = (req: Request, res: Response) => {
  res.status(500).json({
    message: "Hello helo",
  });
};
