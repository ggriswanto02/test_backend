import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { exportProductCSV } from "./report.controller";

const router = Router();

router.use(authenticate);
router.get("/exportProducts", exportProductCSV);

export default router;
