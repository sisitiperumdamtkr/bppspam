
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
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import halaman baru untuk Kemendagri
import AssessmentKemendagriList from "./pages/AssessmentKemendagriList";
import AssessmentKemendagriForm from "./pages/AssessmentKemendagriForm";
import AssessmentKemendagriDetail from "./pages/AssessmentKemendagriDetail";
import ReportsKemendagri from "./pages/ReportsKemendagri";

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
            
            {/* PUPR Assessment Routes */}
            <Route path="/assessmentpupr" element={
              <ProtectedRoute>
                <AssessmentList />
              </ProtectedRoute>
            } />
            <Route path="/assessment/pupr/:id" element={
              <ProtectedRoute>
                <AssessmentDetail />
              </ProtectedRoute>
            } />
            <Route path="/assessment/pupr/:id/edit" element={
              <ProtectedRoute>
                <AssessmentForm />
              </ProtectedRoute>
            } />
            <Route path="/assessment/pupr" element={
              <ProtectedRoute>
                <AssessmentForm />
              </ProtectedRoute>
            } />
            <Route path="/reportspupr" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            
            {/* Kemendagri Assessment Routes */}
            <Route path="/assessmentkemendagri" element={
              <ProtectedRoute>
                <AssessmentKemendagriList />
              </ProtectedRoute>
            } />
            <Route path="/assessment/kemendagri/:id" element={
              <ProtectedRoute>
                <AssessmentKemendagriDetail />
              </ProtectedRoute>
            } />
            <Route path="/assessment/kemendagri/:id/edit" element={
              <ProtectedRoute>
                <AssessmentKemendagriForm />
              </ProtectedRoute>
            } />
            <Route path="/assessment/kemendagri" element={
              <ProtectedRoute>
                <AssessmentKemendagriForm />
              </ProtectedRoute>
            } />
            <Route path="/reportskemendagri" element={
              <ProtectedRoute>
                <ReportsKemendagri />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
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
