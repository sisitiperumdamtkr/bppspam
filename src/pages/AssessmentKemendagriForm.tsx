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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Assessment, 
  Indicator,
  Value,
  AssessmentStatus
} from "@/models/types";
import { kemendagriIndicators } from "@/models/kemendagri-indicators";
import { calculateKemendagriScore, calculateKemendagriTotalScore } from "@/models/kemendagri-scoring";
import { useIsMobile } from "@/hooks/use-mobile";
import { Save, Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { calculateKemendagriFormulaValue } from "@/utils/kemendagriFormulaUtils";

// Impor komponen-komponen KEMENDAGRI
import IndicatorCategoryKemendagri from "@/components/assessment/IndicatorCategoryKemendagri";
import ScoreSummaryKemendagri from "@/components/assessment/ScoreSummaryKemendagri";
import ExportOptionsKemendagri from "@/components/assessment/ExportOptionsKemendagri";

// Komponen utama untuk form penilaian
const AssessmentKemendagriForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();
  const isNewAssessment = !id || id === "new";
  
  // State untuk menyimpan data penilaian
  const [assessment, setAssessment] = useState<Assessment>({
    id: isNewAssessment ? crypto.randomUUID() : id || "",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: new Date().getFullYear(),
    date: new Date().toISOString().split("T")[0],
    userId: user?.id || crypto.randomUUID(), // Pastikan selalu ada userId yang valid
    values: {},
    totalScore: 0,
    status: "draft"
  });
  
  // State untuk menyimpan input formula
  const [formulaInputs, setFormulaInputs] = useState<Record<string, Record<string, number>>>({});
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mengambil data penilaian dari Supabase jika edit mode
  useEffect(() => {
    if (!isNewAssessment && id) {
      const fetchAssessment = async () => {
        setIsLoading(true);
        try {
          const { data: assessmentData, error: assessmentError } = await supabase
            .from('kemendagri_assessments')
            .select('*')
            .eq('id', id)
            .maybeSingle();
            
          if (assessmentError) throw assessmentError;
          if (!assessmentData) throw new Error("Data penilaian tidak ditemukan");
          
          const { data: valuesData, error: valuesError } = await supabase
            .from('kemendagri_assessment_values')
            .select('*')
            .eq('assessment_id', id);
            
          if (valuesError) throw valuesError;
          
          const values: Record<string, Value> = {};
          (valuesData as any[]).forEach((item) => {
            values[item.indicator_id] = {
              value: item.value,
              score: item.score
            };
          });
          
          setAssessment({
            id: assessmentData.id,
            name: assessmentData.name,
            year: assessmentData.year,
            date: assessmentData.date,
            userId: assessmentData.user_id,
            values: values,
            totalScore: assessmentData.total_score || 0,
            status: assessmentData.status === "completed" ? "completed" : "draft"
          });
          
          // Log data yang diambil
          console.log("Assessment data loaded:", assessmentData);
          console.log("Values data loaded:", valuesData);
        } catch (error) {
          console.error("Error fetching assessment:", error);
          toast({
            title: "Error",
            description: "Gagal mengambil data penilaian",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAssessment();
    }
  }, [id, isNewAssessment, toast]);
  
  // Handler untuk perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler untuk perubahan input formula
  const handleFormulaInputChange = (
    indicatorId: string, 
    inputName: string, 
    value: number
  ) => {
    console.log(`Input change - Indicator: ${indicatorId}, Input: ${inputName}, Value: ${value}`);
    
    setFormulaInputs(prev => ({
      ...prev,
      [indicatorId]: {
        ...(prev[indicatorId] || {}),
        [inputName]: value
      }
    }));
    
    const indicator = kemendagriIndicators.find(ind => ind.id === indicatorId);
    if (!indicator) {
      console.error(`Indicator with ID ${indicatorId} not found`);
      return;
    }
    
    const updatedInputs = {
      ...(formulaInputs[indicatorId] || {}),
      [inputName]: value
    };
    
    const calculatedValue = calculateKemendagriFormulaValue(indicatorId, updatedInputs);
    console.log(`Calculated value for ${indicatorId}: ${calculatedValue}`);
    handleValueChange(indicator, calculatedValue);
  };
  
  // Handler untuk mengubah nilai indikator
  const handleValueChange = (indicator: Indicator, value: number) => {
    console.log(`Value change - Indicator: ${indicator.id}, Value: ${value}`);
    const score = calculateKemendagriScore(value, indicator.id);
    console.log(`Score for ${indicator.id}: ${score}`);
    
    const updatedValues = {
      ...assessment.values,
      [indicator.id]: { value, score }
    };
    
    const totalScore = calculateKemendagriTotalScore(updatedValues);
    
    setAssessment(prev => ({
      ...prev,
      values: updatedValues,
      totalScore
    }));
  };
  
  // Handler untuk menyimpan data penilaian
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Generate dan pastikan ID penilaian selalu valid
      const assessmentId = assessment.id || crypto.randomUUID();
      
      // Periksa apakah semua indikator sudah dinilai
      const isComplete = kemendagriIndicators.every(indicator => 
        assessment.values[indicator.id] !== undefined
      );
      
      const status: AssessmentStatus = isComplete ? "completed" : "draft";
      
      console.log("Saving assessment with ID:", assessmentId);
      
      // Pastikan user_id dalam format UUID yang valid
      let userId = user?.id;
      if (!userId || typeof userId === 'number' || userId === '1') {
        userId = crypto.randomUUID();
      }
      console.log("Using user ID:", userId);
      
      // Prepare data untuk Supabase
      const assessmentData = {
        id: assessmentId,
        name: assessment.name,
        year: Number(assessment.year), // Pastikan year adalah number
        date: assessment.date,
        user_id: userId,
        total_score: assessment.totalScore,
        status: status
      };
      
      console.log("Saving assessment data:", assessmentData);
      
      // Simpan data penilaian ke Supabase
      const { data: savedAssessment, error: assessmentError } = await supabase
        .from('kemendagri_assessments')
        .upsert(assessmentData)
        .select('*')
        .single();
      
      if (assessmentError) {
        console.error("Error saving assessment to Supabase:", assessmentError);
        throw assessmentError;
      }
      
      console.log("Assessment saved successfully:", savedAssessment);
      
      // Hapus data nilai indikator yang lama jika ada
      if (!isNewAssessment) {
        const { error: deleteError } = await supabase
          .from('kemendagri_assessment_values')
          .delete()
          .eq('assessment_id', assessmentId);
          
        if (deleteError) {
          console.error("Error deleting old values:", deleteError);
          throw deleteError;
        }
      }
      
      // Simpan nilai-nilai indikator ke Supabase
      const valuesData = Object.entries(assessment.values).map(([indicatorId, value]) => ({
        id: crypto.randomUUID(), // Gunakan UUID yang valid untuk setiap nilai
        assessment_id: assessmentId,
        indicator_id: indicatorId,
        value: value.value,
        score: value.score
      }));
      
      console.log("Saving values data:", valuesData);
      
      if (valuesData.length > 0) {
        const { data: savedValues, error: valuesError } = await supabase
          .from('kemendagri_assessment_values')
          .insert(valuesData)
          .select('*');
          
        if (valuesError) {
          console.error("Error saving assessment values to Supabase:", valuesError);
          throw valuesError;
        }
        
        console.log("Values saved successfully:", savedValues);
      }
      
      // Perbarui state assessment dengan ID baru jika diperlukan
      if (assessment.id !== assessmentId) {
        setAssessment(prev => ({
          ...prev,
          id: assessmentId
        }));
      }
      
      // Tampilkan notifikasi sukses dan redirect ke halaman daftar penilaian
      toast({
        title: "Sukses",
        description: "Data penilaian berhasil disimpan",
      });
      
      // Redirect ke halaman daftar penilaian dengan timeout kecil
      // untuk memastikan operasi database sudah selesai
      setTimeout(() => {
        navigate("/assessmentkemendagri");
      }, 1000);
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data penilaian. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mengelompokkan indikator berdasarkan kategori
  const categories = kemendagriIndicators.reduce<Record<string, Indicator[]>>((acc, indicator) => {
    if (!acc[indicator.category]) {
      acc[indicator.category] = [];
    }
    acc[indicator.category].push(indicator);
    return acc;
  }, {});

  const pageTitle = isNewAssessment ? "Penilaian KEMENDAGRI Baru" : "Edit Penilaian KEMENDAGRI";
  
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
                        <DrawerTitle>Export Penilaian KEMENDAGRI</DrawerTitle>
                        <DrawerDescription>
                          Download data penilaian dalam format yang Anda inginkan
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="px-4">
                        <ExportOptionsKemendagri 
                          assessment={assessment}
                          onClose={() => setShowExportOptions(false)}
                        />
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
                        <DialogTitle>Export Penilaian KEMENDAGRI</DialogTitle>
                        <DialogDescription>
                          Download data penilaian dalam format yang Anda inginkan
                        </DialogDescription>
                      </DialogHeader>
                      <ExportOptionsKemendagri 
                        assessment={assessment}
                        onClose={() => setShowExportOptions(false)}
                      />
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
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  <span>Menyimpan...</span>
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </>
              )}
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
        
        {/* Render indicators by category */}
        {Object.entries(categories).map(([category, categoryIndicators]) => (
          <IndicatorCategoryKemendagri
            key={category}
            category={category}
            indicators={categoryIndicators}
            values={assessment.values}
            formulaInputs={formulaInputs}
            onFormulaInputChange={handleFormulaInputChange}
          />
        ))}
        
        {/* Score summary */}
        <ScoreSummaryKemendagri 
          totalScore={assessment.totalScore} 
          values={assessment.values}
        />
      </div>
    </DashboardLayout>
  );
};

export default AssessmentKemendagriForm;
