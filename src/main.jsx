import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);