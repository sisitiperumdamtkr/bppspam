
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDatabase } from "./database/init.ts";

// Render the app first 
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Attempt to initialize database after rendering the UI
initializeDatabase(false).then((initialized) => {
  console.log(initialized ? "Database initialized" : "Database initialization failed");
}).catch(error => {
  console.error("Database connection error:", error);
});
