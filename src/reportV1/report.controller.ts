import { Response } from "express";
import { Parser } from "json2csv";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getProductReport } from "./report.service";

export async function exportProductCSV(req: AuthRequest, res: Response) {
  const { startDate, endDate } = req.query as {
    startDate?: string;
    endDate?: string;
  };

  const isAdmin = req.user.role === "ADMIN";

  const products = await getProductReport(
    req.user.id,
    isAdmin,
    startDate,
    endDate
  );

  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

  const data = products.map((p, i) => ({
    No: i + 1,
    Name: p.name,
    Price: p.price,
    CreatedBy: p.createdBy.name,
    Role: p.createdBy.role,
    CreatedAt: p.createdAt.toISOString(),
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  const filename = `product-report-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  res.header("Content-Type", "text/csv");
  res.header("Content-Disposition", `attachment; filename=${filename}`);

  res.send(
    `TOTAL PRODUCT: ${products.length}\nTOTAL PRICE: ${totalPrice}\n\n${csv}`
  );
}
