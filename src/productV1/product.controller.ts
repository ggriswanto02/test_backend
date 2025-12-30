import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as service from "./product.service";

export async function create(req: AuthRequest, res: Response) {
  const product = await service.createProduct({
    ...req.body,
    userId: req.user.id,
  });
  res.status(201).json(product);
}

export async function findAll(req: AuthRequest, res: Response) {
  const isAdmin = req.user.role === "ADMIN";
  const products = await service.getProducts(req.user.id, isAdmin);
  res.json(products);
}

export async function findOne(req: AuthRequest, res: Response) {
  const product = await service.getProductById(req.params.id);
  res.json(product);
}

export async function update(req: AuthRequest, res: Response) {
  const isAdmin = req.user.role === "ADMIN";
  const result = await service.updateProduct(
    req.params.id,
    req.user.id,
    isAdmin,
    req.body
  );
  res.json(result);
}

export async function remove(req: AuthRequest, res: Response) {
  const isAdmin = req.user.role === "ADMIN";
  const result = await service.deleteProduct(
    req.params.id,
    req.user.id,
    isAdmin
  );
  res.json(result);
}
