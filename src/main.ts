import express from "express";
import authRoutes from "./authV1/auth.routes";
import productRoutes from "./productV1/product.routes";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth/v1", authRoutes);
app.use("/api/products/v1", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
