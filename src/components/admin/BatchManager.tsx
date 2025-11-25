import React, { useState, useEffect } from "react";
import { addBatch, getBatchesByProduct } from "../../lib/batch-service";

interface Batch {
  id?: number;
  productId: number;
  batchCode: string;
  quantity: number;
  expiryDate: string;
}

interface Props {
  productId: number;
  productName: string;
}

function generarPrefijoLote(nombre: string): string {
  const palabras = nombre.match(/\b\w+/g) || [];
  return palabras.map(p => p.substring(0, 3)).join("");
}

const BatchManager: React.FC<Props> = ({ productId, productName }) => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [batchCode, setBatchCode] = useState<string>("");

  useEffect(() => {
    async function fetchBatches() {
      const b = await getBatchesByProduct(productId);
      setBatches(b);
      asignarNuevoLote(b);
    }
    fetchBatches();
  }, [productId, productName]);

  const asignarNuevoLote = (existingBatches: Batch[]) => {
    const prefijo = generarPrefijoLote(productName);
    const letrasUsadas = existingBatches
      .filter(b => b.batchCode.startsWith(prefijo))
      .map(b => b.batchCode.split("-")[1]);
    const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nuevaLetra = "A";
    for (const letra of abecedario) {
      if (!letrasUsadas.includes(letra)) {
        nuevaLetra = letra;
        break;
      }
    }
    setBatchCode(`${prefijo}-${nuevaLetra}`);
  };

  const handleGuardar = async () => {
    if (quantity <= 0 || !expiryDate || !batchCode) {
      alert("Completa todos los campos");
      return;
    }
    await addBatch({ productId, batchCode, quantity, expiryDate });
    const b = await getBatchesByProduct(productId);
    setBatches(b);
    setQuantity(0);
    setExpiryDate("");
    asignarNuevoLote(b);
  };

  return (
    <div>
      <h3>Gestión de Lotes para {productName}</h3>
      <input
        type="text"
        value={batchCode}
        onChange={e => setBatchCode(e.target.value)}
        placeholder="Código de Lote"
      />
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        placeholder="Cantidad"
        min={1}
      />
      <input
        type="date"
        value={expiryDate}
        onChange={e => setExpiryDate(e.target.value)}
      />
      <button onClick={handleGuardar}>Guardar Lote</button>

      <h4>Lotes Registrados</h4>
      <ul>
        {batches.map(b => (
          <li key={b.id}>
            {b.batchCode} - Cantidad: {b.quantity} - Vence: {b.expiryDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BatchManager;
