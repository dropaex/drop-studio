import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";

import "@/react-app/index.css";
import App from "@/react-app/App";

// Inicializa o Lenis
const lenis = new Lenis({
  duration: 1.4,
  smoothWheel: true,
  touchMultiplier: 1,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);