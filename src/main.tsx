
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDatabase } from "./database/init.ts";

// Initialize database when the application starts
initializeDatabase(false).then((initialized) => {
  console.log(initialized ? "Database initialized" : "Database initialization failed");
  
  // Render the app
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
