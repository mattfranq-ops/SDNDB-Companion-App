import React from "react";
import { createRoot } from "react-dom/client";
import "./storage.js";
import SplashGate from "./SplashGate.jsx";
import ConnectGate from "./ConnectGate.jsx";
import App from "./app/App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <SplashGate>
    <ConnectGate>
      <App />
    </ConnectGate>
  </SplashGate>
);
