import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8HzpUL5LAvOCk6nmZvd_mB2vAB7FSYME",
  authDomain: "fuerza-delta.firebaseapp.com",
  projectId: "fuerza-delta"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.consultar = async function () {
  const cedula = document.getElementById("cedula").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cedula) {
    resultado.innerText = "Por favor ingresa tu cédula.";
    return;
  }

  const ref = doc(db, "clientes", cedula);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    resultado.innerText = "❌ No se encontró tu registro. Verifica la cédula.";
    return;
  }

  const data = snap.data();
  const hoy = new Date();
  const vencimiento = new Date(data.fechaVencimiento);

  const diffMs = vencimiento - hoy;
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias > 0) {
    resultado.innerText = `✅ Tu membresía vence en ${diffDias} día(s): ${data.fechaVencimiento}`;
  } else if (diffDias === 0) {
    resultado.innerText = `⚠️ Tu membresía vence HOY: ${data.fechaVencimiento}`;
  } else {
    resultado.innerText = `❌ Tu membresía está vencida desde el ${data.fechaVencimiento}`;
  }
};
