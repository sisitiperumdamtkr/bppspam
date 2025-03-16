
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Assessment, 
  Indicator
} from "@/models/types";
import { 
  indicators 
} from "@/models/indicators";
import { 
  calculateScore, 
  calculateTotalScore 
} from "@/models/scoring";
import {
  getHealthCategory 
} from "@/models/health-categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { downloadCSV, downloadPDF } from "@/utils/exportUtils";
import { Save, Download, FileSpreadsheet, FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { getAssessmentById, createAssessment, updateAssessment } from "@/services/assessmentService";

// New interface for formula inputs
interface FormulaInput {
  name: string;
  label: string;
}

const AssessmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const isNewAssessment = id === "new";
  
  const [loading, setLoading] = useState(!isNewAssessment);
  const [error, setError] = useState<string | null>(null);
  
  const [assessment, setAssessment] = useState<Assessment>({
    id: isNewAssessment ? crypto.randomUUID() : id || "",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: new Date().getFullYear(),
    date: new Date().toISOString().split("T")[0],
    userId: user?.id || "",
    values: {},
    totalScore: 0,
    status: "draft"
  });
  
  useEffect(() => {
    const fetchAssessment = async () => {
      if (isNewAssessment || !id) return;
      
      setLoading(true);
      try {
        const data = await getAssessmentById(id);
        setAssessment(data);
      } catch (err) {
        console.error("Error fetching assessment:", err);
        setError("Failed to load assessment data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
  }, [id, isNewAssessment]);
  
  const [formulaInputs, setFormulaInputs] = useState<Record<string, Record<string, number>>>({});
  
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormulaInputChange = (
    indicatorId: string, 
    inputName: string, 
    value: number
  ) => {
    setFormulaInputs(prev => ({
      ...prev,
      [indicatorId]: {
        ...(prev[indicatorId] || {}),
        [inputName]: value
      }
    }));
    
    const indicator = indicators.find(ind => ind.id === indicatorId);
    if (!indicator) return;
    
    let calculatedValue: number = 0;
    
    switch (indicatorId) {
      // ... keep existing formula calculation logic
    }
    
    handleValueChange(indicator, calculatedValue);
  };
  
  const handleValueChange = (indicator: Indicator, value: number) => {
    const score = calculateScore(value, indicator.id);
    
    const updatedValues = {
      ...assessment.values,
      [indicator.id]: { value, score }
    };
    
    const totalScore = calculateTotalScore(updatedValues);
    
    setAssessment(prev => ({
      ...prev,
      values: updatedValues,
      totalScore
    }));
  };
  
  const handleSave = async () => {
    try {
      const isComplete = indicators.every(indicator => 
        assessment.values[indicator.id] !== undefined
      );
      
      const updatedAssessment = {
        ...assessment,
        status: isComplete ? "completed" : "draft"
      };
      
      if (isNewAssessment) {
        await createAssessment(updatedAssessment);
      } else {
        await updateAssessment(assessment.id, updatedAssessment);
      }
      
      navigate("/assessments");
    } catch (error) {
      console.error("Error saving assessment:", error);
      setError("Failed to save assessment. Please try again.");
    }
  };
  
  const handleExport = (type: "csv" | "pdf") => {
    if (type === "csv") {
      downloadCSV(assessment);
    } else {
      downloadPDF(assessment);
    }
    setShowExportOptions(false);
  };
  
  const ExportContent = () => (
    <div className="grid gap-4 py-4">
      <h3 className="font-medium mb-2">Pilih Format Export:</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => handleExport("csv")} 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
        >
          <FileSpreadsheet className="h-8 w-8" />
          <span>CSV / Excel</span>
        </Button>
        <Button 
          onClick={() => handleExport("pdf")} 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
        >
          <FileText className="h-8 w-8" />
          <span>PDF</span>
        </Button>
      </div>
    </div>
  );
  
  // Fix: Make sure getFormulaInputs always returns an array
  const getFormulaInputs = (indicatorId: string): FormulaInput[] => {
    // Default empty array to return if no matching case
    const defaultInputs: FormulaInput[] = [];
    
    switch (indicatorId) {
      case "roc":
        return [
          { name: "ebit", label: "EBIT" },
          { name: "total_capital", label: "Total Modal" }
        ];
      case "current_ratio":
        return [
          { name: "current_assets", label: "Aset Lancar" },
          { name: "current_liabilities", label: "Kewajiban Lancar" }
        ];
      case "debt_equity_ratio":
        return [
          { name: "total_debt", label: "Total Utang" },
          { name: "equity", label: "Ekuitas" }
        ];
      case "full_cost_recovery":
        return [
          { name: "operating_income", label: "Pendapatan Operasional" },
          { name: "operating_expense", label: "Beban Operasional" }
        ];
      case "efficiency_ratio":
        return [
          { name: "operating_expense", label: "Beban Operasional" },
          { name: "operating_income", label: "Pendapatan Operasional" }
        ];
      // Add cases for other indicators
      default:
        return defaultInputs;
    }
  };
  
  const categories = indicators.reduce<Record<string, Indicator[]>>((acc, indicator) => {
    if (!acc[indicator.category]) {
      acc[indicator.category] = [];
    }
    acc[indicator.category].push(indicator);
    return acc;
  }, {});

  const pageTitle = isNewAssessment ? "Penilaian Baru" : "Edit Penilaian";
  
  if (loading) {
    return (
      <DashboardLayout title={pageTitle}>
        <div className="flex justify-center items-center h-64">
          <p>Loading assessment data...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error) {
    return (
      <DashboardLayout title={pageTitle}>
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title={pageTitle}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <div className="flex gap-2">
            {!isNewAssessment && (
              <>
                {isMobile ? (
                  <Drawer open={showExportOptions} onOpenChange={setShowExportOptions}>
                    <DrawerTrigger asChild>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Export Penilaian</DrawerTitle>
                        <DrawerDescription>
                          Download data penilaian dalam format yang Anda inginkan
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="px-4">
                        <ExportContent />
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Batal</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <Dialog open={showExportOptions} onOpenChange={setShowExportOptions}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Export Penilaian</DialogTitle>
                        <DialogDescription>
                          Download data penilaian dalam format yang Anda inginkan
                        </DialogDescription>
                      </DialogHeader>
                      <ExportContent />
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExportOptions(false)}>
                          Batal
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )}
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Nama PDAM</Label>
            <Input
              id="name"
              name="name"
              value={assessment.name}
              onChange={handleInputChange}
              readOnly
              className="mt-1 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="year">Tahun Penilaian</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={assessment.year}
              onChange={handleInputChange}
              placeholder="Masukkan tahun penilaian"
              className="mt-1"
            />
          </div>
        </div>
        
        {Object.entries(categories).map(([category, categoryIndicators]) => (
          <div key={category} className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Aspek {category}</h2>
            <div className="space-y-6">
              {categoryIndicators.map((indicator) => {
                const valueObj = assessment.values[indicator.id];
                const inputs = getFormulaInputs(indicator.id);
                
                return (
                  <div key={indicator.id} className="border p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h3 className="font-medium text-base md:w-1/3">{indicator.name}</h3>
                      <div className="text-sm text-muted-foreground md:w-2/3">
                        Formula: {indicator.formula}
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium mb-2">Input Komponen Formula:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {inputs.map((input) => (
                          <div key={input.name}>
                            <Label htmlFor={`${indicator.id}-${input.name}`}>
                              {input.label}
                            </Label>
                            <Input
                              id={`${indicator.id}-${input.name}`}
                              type="number"
                              value={formulaInputs[indicator.id]?.[input.name] || ""}
                              onChange={(e) => 
                                handleFormulaInputChange(
                                  indicator.id, 
                                  input.name, 
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              placeholder={`Masukkan ${input.label.toLowerCase()}`}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-4 border-t pt-4">
                      <div>
                        <Label>Nilai {indicator.unit}</Label>
                        <div className="h-10 flex items-center mt-1 text-base font-medium">
                          {valueObj ? valueObj.value.toFixed(2) : "-"}
                        </div>
                      </div>
                      <div>
                        <Label>Skor (1-5)</Label>
                        <div className="h-10 flex items-center mt-1 text-base">
                          {valueObj ? valueObj.score : "-"}
                        </div>
                      </div>
                      <div>
                        <Label>Nilai Tertimbang</Label>
                        <div className="h-10 flex items-center mt-1 text-base">
                          {valueObj 
                            ? (valueObj.score * indicator.weight).toFixed(2)
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Skor:</h2>
            <div className="text-2xl font-bold">{assessment.totalScore.toFixed(2)}</div>
          </div>
          {assessment.totalScore > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Kategori:</h3>
                <div className={`${getHealthCategory(assessment.totalScore).color} text-white px-3 py-1 rounded-md`}>
                  {getHealthCategory(assessment.totalScore).category}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssessmentForm;
