// Helpers para disparar las funciones serverless / Edge Functions

export async function triggerDailySalesSummary() {
  // Llama la función Edge que calcula y envía resumen
  await fetch("/api/daily-sales-summary", { method: "POST" });
}

export async function triggerExpiryAlerts() {
  // Llama la función Edge que calcula y envía alertas caducidad
  await fetch("/api/expiry-alerts", { method: "POST" });
}
