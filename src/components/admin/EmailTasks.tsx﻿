import React from "react";
import { triggerDailySalesSummary, triggerExpiryAlerts } from "../../lib/email-service";

const EmailTasks: React.FC = () => {
  const handleResumen = async () => {
    await triggerDailySalesSummary();
    alert("Resumen diario enviado");
  };

  const handleAlertas = async () => {
    await triggerExpiryAlerts();
    alert("Alertas de caducidad enviadas");
  };

  return (
    <div>
      <h3>Procesos Email</h3>
      <button onClick={handleResumen}>Enviar Resumen Diario</button>
      <button onClick={handleAlertas}>Enviar Alertas de Caducidad</button>
    </div>
  );
};

export default EmailTasks;
