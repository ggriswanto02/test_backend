import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as controller from "./summary.controller";

const router = Router();
router.use(authenticate);

router.get("/countDailyProducts", controller.productDaily);
router.get("/countProductsPerUser", controller.productUser);
router.get("/countProductsPerRole", controller.productRole);

export default router;
