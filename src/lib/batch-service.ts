import { db } from "./db";

export interface Batch {
  id?: number;
  productId: number;
  batchCode: string;
  quantity: number;
  expiryDate: string;
}

export async function addBatch(batch: Batch): Promise<void> {
  await db.product_batches.add(batch);
}

export async function getBatchesByProduct(productId: number): Promise<Batch[]> {
  return db.product_batches.where("productId").equals(productId).toArray();
}

export async function getExpiringBatches(daysBefore: number): Promise<Batch[]> {
  const hoy = new Date();
  const limite = new Date(hoy.getTime() + daysBefore * 24 * 60 * 60 * 1000);
  return db.product_batches.where("expiryDate").belowOrEqual(limite.toISOString()).toArray();
}
