import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as service from "./summary.service";

export async function productDaily(req: AuthRequest, res: Response) {
  const isAdmin = req.user.role === "ADMIN";
  const data = await service.productPerDay(req.user.id, isAdmin);
  res.json(data);
}

export async function productUser(req: AuthRequest, res: Response) {
  const data = await service.productPerUser();
  res.json(data);
}

export async function productRole(req: AuthRequest, res: Response) {
  const data = await service.productByRole();
  res.json(data);
}
