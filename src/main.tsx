
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDatabase } from "./database/init.ts";
import { toast } from "sonner";

// Render the app first 
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Attempt to initialize database after rendering the UI
initializeDatabase(true).then((initialized) => {
  if (initialized) {
    console.log("Database initialized and migrated successfully");
    toast.success("Database connected and migrated successfully");
  } else {
    console.error("Database initialization failed");
    toast.error("Database connection failed. Some features may not work properly.");
  }
}).catch(error => {
  console.error("Database connection error:", error);
  toast.error("Database error: " + (error instanceof Error ? error.message : String(error)));
});
