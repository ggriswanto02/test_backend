import express from "express";
import authRoutes from "./authV1/auth.routes";
import productRoutes from "./productV1/product.routes";
import summaryRoutes from "./summaryV1/summary.routes";
import reportRoutes from "./reportV1/report.routes";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth/v1", authRoutes);
app.use("/api/products/v1", productRoutes);
app.use("/api/summary/v1", summaryRoutes);
app.use("/api/report/v1", reportRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
