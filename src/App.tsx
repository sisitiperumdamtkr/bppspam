
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AssessmentList from "./pages/AssessmentList";
import AssessmentForm from "./pages/AssessmentForm";
import AssessmentDetail from "./pages/AssessmentDetail";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/assessments" element={
              <ProtectedRoute>
                <AssessmentList />
              </ProtectedRoute>
            } />
            <Route path="/assessment/:id" element={
              <ProtectedRoute>
                <AssessmentDetail />
              </ProtectedRoute>
            } />
            <Route path="/assessment/:id/edit" element={
              <ProtectedRoute>
                <AssessmentForm />
              </ProtectedRoute>
            } />
            <Route path="/assessment/new" element={
              <ProtectedRoute>
                <AssessmentForm />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
