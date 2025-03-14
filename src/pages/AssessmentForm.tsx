
import React, { useState } from "react";
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
  Indicator, 
  Value, 
  indicators, 
  calculateScore, 
  calculateTotalScore,
  getHealthCategory 
} from "@/models/assessment";
import { useIsMobile } from "@/hooks/use-mobile";
import { downloadCSV, downloadPDF } from "@/utils/exportUtils";
import { Save, Download, FileSpreadsheet, FileText } from "lucide-react";

const AssessmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { user } = useAuth();
  const isNewAssessment = id === "new";
  
  // Initialize with empty assessment or fetch existing data
  const [assessment, setAssessment] = useState<Assessment>({
    id: isNewAssessment ? crypto.randomUUID() : id || "",
    name: "",
    year: new Date().getFullYear(),
    date: new Date().toISOString().split("T")[0],
    userId: user?.id || "",
    values: {},
    totalScore: 0,
    status: "draft"
  });
  
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleValueChange = (indicator: Indicator, value: number) => {
    // Calculate score based on the input value
    const score = calculateScore(value, indicator.id);
    
    // Update assessment values
    const updatedValues = {
      ...assessment.values,
      [indicator.id]: { value, score }
    };
    
    // Calculate total score
    const totalScore = calculateTotalScore(updatedValues);
    
    // Update assessment state
    setAssessment(prev => ({
      ...prev,
      values: updatedValues,
      totalScore
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving assessment:", assessment);
    
    // Mark as completed if all indicators have values
    const isComplete = indicators.every(indicator => 
      assessment.values[indicator.id] !== undefined
    );
    
    const updatedAssessment = {
      ...assessment,
      status: isComplete ? "completed" : "draft"
    };
    
    // For this demo, we'll just navigate back to the list
    navigate("/assessments");
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
  
  // Group indicators by category
  const categories = indicators.reduce<Record<string, Indicator[]>>((acc, indicator) => {
    if (!acc[indicator.category]) {
      acc[indicator.category] = [];
    }
    acc[indicator.category].push(indicator);
    return acc;
  }, {});
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {isNewAssessment ? "Penilaian Baru" : "Edit Penilaian"}
          </h1>
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
              placeholder="Masukkan nama PDAM"
              className="mt-1"
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
        
        {/* Display indicators by category */}
        {Object.entries(categories).map(([category, categoryIndicators]) => (
          <div key={category} className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Aspek {category}</h2>
            <div className="space-y-6">
              {categoryIndicators.map((indicator) => {
                const valueObj = assessment.values[indicator.id];
                return (
                  <div key={indicator.id} className="border p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h3 className="font-medium text-base md:w-1/3">{indicator.name}</h3>
                      <div className="text-sm text-muted-foreground md:w-2/3">
                        Formula: {indicator.formula}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label htmlFor={indicator.id}>Nilai {indicator.unit}</Label>
                        <Input
                          id={indicator.id}
                          type="number"
                          value={valueObj?.value || ""}
                          onChange={(e) => handleValueChange(indicator, parseFloat(e.target.value))}
                          placeholder={`Masukkan nilai dalam ${indicator.unit}`}
                          className="mt-1"
                        />
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
        
        {/* Total Score */}
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
    </div>
  );
};

export default AssessmentForm;
