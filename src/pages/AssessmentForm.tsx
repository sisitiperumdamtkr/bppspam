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
import { supabase } from "@/integrations/supabase/client";

const AssessmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();
  const isNewAssessment = id === "new";
  
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
  
  const [formulaInputs, setFormulaInputs] = useState<Record<string, Record<string, number>>>({});
  
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isNewAssessment && id) {
      const fetchAssessment = async () => {
        setIsLoading(true);
        try {
          const { data: assessmentData, error: assessmentError } = await supabase
            .from('assessments')
            .select('*')
            .eq('id', id)
            .single();
            
          if (assessmentError) throw assessmentError;
          
          const { data: valuesData, error: valuesError } = await supabase
            .from('assessment_values')
            .select('*')
            .eq('assessment_id', id);
            
          if (valuesError) throw valuesError;
          
          const values: Record<string, Value> = {};
          valuesData.forEach((item) => {
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
      case "roe":
        const labaBersih = parseFloat(String(formulaInputs[indicatorId]?.labaBersih || 0));
        const ekuitas = parseFloat(String(formulaInputs[indicatorId]?.ekuitas || 1));
        
        const labaBersihValue = inputName === 'labaBersih' ? value : labaBersih;
        const ekuitasValue = inputName === 'ekuitas' ? value : ekuitas;
        
        if (ekuitasValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (labaBersihValue / ekuitasValue) * 100;
        }
        console.log(`ROE Calculation: ${labaBersihValue} / ${ekuitasValue} * 100 = ${calculatedValue}%`);
        break;
      
      case "rasio_operasi":
        const biayaOperasi = parseFloat(String(formulaInputs[indicatorId]?.biayaOperasi || 0));
        const pendapatanOperasi = parseFloat(String(formulaInputs[indicatorId]?.pendapatanOperasi || 1));
        
        const biayaOperasiValue = inputName === 'biayaOperasi' ? value : biayaOperasi;
        const pendapatanOperasiValue = inputName === 'pendapatanOperasi' ? value : pendapatanOperasi;
        
        if (pendapatanOperasiValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = biayaOperasiValue / pendapatanOperasiValue;
        }
        break;
      
      case "cash_ratio":
        const kas = parseFloat(String(formulaInputs[indicatorId]?.kas || 0));
        const setaraKas = parseFloat(String(formulaInputs[indicatorId]?.setaraKas || 0));
        const utangLancar = parseFloat(String(formulaInputs[indicatorId]?.utangLancar || 1));
        
        const kasValue = inputName === 'kas' ? value : kas;
        const setaraKasValue = inputName === 'setaraKas' ? value : setaraKas;
        const utangLancarValue = inputName === 'utangLancar' ? value : utangLancar;
        
        if (utangLancarValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = ((kasValue + setaraKasValue) / utangLancarValue) * 100;
        }
        break;
      
      case "efektivitas_penagihan":
        const penerimaanRekAir = parseFloat(String(formulaInputs[indicatorId]?.penerimaanRekAir || 0));
        const jumlahRekeningAir = parseFloat(String(formulaInputs[indicatorId]?.jumlahRekeningAir || 1));
        
        const penerimaanRekAirValue = inputName === 'penerimaanRekAir' ? value : penerimaanRekAir;
        const jumlahRekeningAirValue = inputName === 'jumlahRekeningAir' ? value : jumlahRekeningAir;
        
        if (jumlahRekeningAirValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (penerimaanRekAirValue / jumlahRekeningAirValue) * 100;
        }
        break;
      
      case "solvabilitas":
        const totalAktiva = parseFloat(String(formulaInputs[indicatorId]?.totalAktiva || 0));
        const totalUtang = parseFloat(String(formulaInputs[indicatorId]?.totalUtang || 1));
        
        const totalAktivaValue = inputName === 'totalAktiva' ? value : totalAktiva;
        const totalUtangValue = inputName === 'totalUtang' ? value : totalUtang;
        
        if (totalUtangValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (totalAktivaValue / totalUtangValue) * 100;
        }
        break;
      
      case "cakupan_pelayanan":
        const pendudukTerlayani = parseFloat(String(formulaInputs[indicatorId]?.pendudukTerlayani || 0));
        const totalPenduduk = parseFloat(String(formulaInputs[indicatorId]?.totalPenduduk || 1));
        
        const pendudukTerlayaniValue = inputName === 'pendudukTerlayani' ? value : pendudukTerlayani;
        const totalPendudukValue = inputName === 'totalPenduduk' ? value : totalPenduduk;
        
        if (totalPendudukValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (pendudukTerlayaniValue / totalPendudukValue) * 100;
        }
        break;
      
      case "pertumbuhan_pelanggan":
        const pelangganTahunIni = parseFloat(String(formulaInputs[indicatorId]?.pelangganTahunIni || 0));
        const pelangganTahunLalu = parseFloat(String(formulaInputs[indicatorId]?.pelangganTahunLalu || 1));
        
        const pelangganTahunIniValue = inputName === 'pelangganTahunIni' ? value : pelangganTahunIni;
        const pelangganTahunLaluValue = inputName === 'pelangganTahunLalu' ? value : pelangganTahunLalu;
        
        if (pelangganTahunLaluValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = ((pelangganTahunIniValue - pelangganTahunLaluValue) / pelangganTahunLaluValue) * 100;
        }
        break;
      
      case "penyelesaian_aduan":
        const aduanSelesai = parseFloat(String(formulaInputs[indicatorId]?.aduanSelesai || 0));
        const totalAduan = parseFloat(String(formulaInputs[indicatorId]?.totalAduan || 1));
        
        const aduanSelesaiValue = inputName === 'aduanSelesai' ? value : aduanSelesai;
        const totalAduanValue = inputName === 'totalAduan' ? value : totalAduan;
        
        if (totalAduanValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (aduanSelesaiValue / totalAduanValue) * 100;
        }
        break;
      
      case "kualitas_air":
        const ujiMemenuhi = parseFloat(String(formulaInputs[indicatorId]?.ujiMemenuhi || 0));
        const totalUji = parseFloat(String(formulaInputs[indicatorId]?.totalUji || 1));
        
        const ujiMemenuhiValue = inputName === 'ujiMemenuhi' ? value : ujiMemenuhi;
        const totalUjiValue = inputName === 'totalUji' ? value : totalUji;
        
        if (totalUjiValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (ujiMemenuhiValue / totalUjiValue);
        }
        break;
      
      case "konsumsi_air":
        const airTerjualDomestik = parseFloat(String(formulaInputs[indicatorId]?.airTerjualDomestik || 0));
        const pelangganDomestik = parseFloat(String(formulaInputs[indicatorId]?.pelangganDomestik || 1));
        
        const airTerjualDomestikValue = inputName === 'airTerjualDomestik' ? value : airTerjualDomestik;
        const pelangganDomestikValue = inputName === 'pelangganDomestik' ? value : pelangganDomestik;
        
        if (pelangganDomestikValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = airTerjualDomestikValue / (pelangganDomestikValue * 12);
        }
        break;
      
      case "efisiensi_produksi":
        const produksiRiil = parseFloat(String(formulaInputs[indicatorId]?.produksiRiil || 0));
        const kapasitasTerpasang = parseFloat(String(formulaInputs[indicatorId]?.kapasitasTerpasang || 1));
        
        const produksiRiilValue = inputName === 'produksiRiil' ? value : produksiRiil;
        const kapasitasTerpasangValue = inputName === 'kapasitasTerpasang' ? value : kapasitasTerpasang;
        
        if (kapasitasTerpasangValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (produksiRiilValue / kapasitasTerpasangValue) * 100;
        }
        break;
      
      case "tingkat_kehilangan_air":
        const distribusiAir = parseFloat(String(formulaInputs[indicatorId]?.distribusiAir || 0));
        const airTerjual = parseFloat(String(formulaInputs[indicatorId]?.airTerjual || 0));
        
        const distribusiAirValue = inputName === 'distribusiAir' ? value : distribusiAir;
        const airTerjualValue = inputName === 'airTerjual' ? value : airTerjual;
        
        if (distribusiAirValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = ((distribusiAirValue - airTerjualValue) / distribusiAirValue) * 100;
        }
        break;
      
      case "jam_operasi":
        const totalJamOperasi = parseFloat(String(formulaInputs[indicatorId]?.totalJamOperasi || 0));
        
        const totalJamOperasiValue = inputName === 'totalJamOperasi' ? value : totalJamOperasi;
        
        calculatedValue = totalJamOperasiValue / 365;
        break;
      
      case "tekanan_air":
        const pelangganTekananBaik = parseFloat(String(formulaInputs[indicatorId]?.pelangganTekananBaik || 0));
        const totalPelanggan = parseFloat(String(formulaInputs[indicatorId]?.totalPelanggan || 1));
        
        const pelangganTekananBaikValue = inputName === 'pelangganTekananBaik' ? value : pelangganTekananBaik;
        const totalPelangganValue = inputName === 'totalPelanggan' ? value : totalPelanggan;
        
        if (totalPelangganValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (pelangganTekananBaikValue / totalPelangganValue) * 100;
        }
        break;
      
      case "penggantian_meter":
        const meterDiganti = parseFloat(String(formulaInputs[indicatorId]?.meterDiganti || 0));
        const jumlahPelanggan = parseFloat(String(formulaInputs[indicatorId]?.jumlahPelanggan || 1));
        
        const meterDigantiValue = inputName === 'meterDiganti' ? value : meterDiganti;
        const jumlahPelangganValue = inputName === 'jumlahPelanggan' ? value : jumlahPelanggan;
        
        if (jumlahPelangganValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (meterDigantiValue / jumlahPelangganValue) * 100;
        }
        break;
      
      case "rasio_pegawai":
        const jumlahPegawai = parseFloat(String(formulaInputs[indicatorId]?.jumlahPegawai || 0));
        const pelanggan = parseFloat(String(formulaInputs[indicatorId]?.pelanggan || 1));
        
        const jumlahPegawaiValue = inputName === 'jumlahPegawai' ? value : jumlahPegawai;
        const pelangganValue = inputName === 'pelanggan' ? value : pelanggan;
        
        if (pelangganValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (jumlahPegawaiValue / pelangganValue) * 1000;
        }
        break;
      
      case "rasio_diklat":
        const pegawaiDiklat = parseFloat(String(formulaInputs[indicatorId]?.pegawaiDiklat || 0));
        const totalPegawai = parseFloat(String(formulaInputs[indicatorId]?.totalPegawai || 1));
        
        const pegawaiDiklatValue = inputName === 'pegawaiDiklat' ? value : pegawaiDiklat;
        const totalPegawaiValue = inputName === 'totalPegawai' ? value : totalPegawai;
        
        if (totalPegawaiValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (pegawaiDiklatValue / totalPegawaiValue) * 100;
        }
        break;
      
      case "biaya_diklat":
        const biayaDiklat = parseFloat(String(formulaInputs[indicatorId]?.biayaDiklat || 0));
        const biayaPegawai = parseFloat(String(formulaInputs[indicatorId]?.biayaPegawai || 1));
        
        const biayaDiklatValue = inputName === 'biayaDiklat' ? value : biayaDiklat;
        const biayaPegawaiValue = inputName === 'biayaPegawai' ? value : biayaPegawai;
        
        if (biayaPegawaiValue === 0) {
          calculatedValue = 0;
        } else {
          calculatedValue = (biayaDiklatValue / biayaPegawaiValue) * 100;
        }
        break;
      
      default:
        calculatedValue = 0;
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
    setIsLoading(true);
    try {
      const isComplete = indicators.every(indicator => 
        assessment.values[indicator.id] !== undefined
      );
      
      const status: "draft" | "completed" = isComplete ? "completed" : "draft";
      
      const assessmentData = {
        id: assessment.id,
        name: assessment.name,
        year: assessment.year,
        date: assessment.date,
        user_id: user?.id || assessment.userId,
        total_score: assessment.totalScore,
        status: status
      };
      
      const { error: assessmentError } = await supabase
        .from('assessments')
        .upsert(assessmentData, { onConflict: 'id' });
      
      if (assessmentError) throw assessmentError;
      
      const valuesData = Object.entries(assessment.values).map(([indicatorId, value]) => ({
        id: `${assessment.id}-${indicatorId}`,
        assessment_id: assessment.id,
        indicator_id: indicatorId,
        value: value.value,
        score: value.score
      }));
      
      if (valuesData.length > 0) {
        const { error: valuesError } = await supabase
          .from('assessment_values')
          .upsert(valuesData, { onConflict: 'id' });
          
        if (valuesError) throw valuesError;
      }
      
      toast({
        title: "Sukses",
        description: "Data penilaian berhasil disimpan",
      });
      
      navigate("/assessments");
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data penilaian",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
  
  const getFormulaInputs = (indicatorId: string) => {
    switch (indicatorId) {
      case "roe":
        return [
          { name: "labaBersih", label: "Laba Bersih (contoh: 87.181.566.495)" },
          { name: "ekuitas", label: "Jumlah Ekuitas (contoh: 1.007.466.398.895)" },
        ];
      case "rasio_operasi":
        return [
          { name: "biayaOperasi", label: "Biaya Operasi" },
          { name: "pendapatanOperasi", label: "Pendapatan Operasi" },
        ];
      case "cash_ratio":
        return [
          { name: "kas", label: "Kas" },
          { name: "setaraKas", label: "Setara Kas" },
          { name: "utangLancar", label: "Utang Lancar" },
        ];
      case "efektivitas_penagihan":
        return [
          { name: "penerimaanRekAir", label: "Jumlah Penerimaan Rekening Air" },
          { name: "jumlahRekeningAir", label: "Jumlah Rekening Air" },
        ];
      case "solvabilitas":
        return [
          { name: "totalAktiva", label: "Total Aktiva" },
          { name: "totalUtang", label: "Total Utang" },
        ];
      case "cakupan_pelayanan":
        return [
          { name: "pendudukTerlayani", label: "Jumlah Penduduk Terlayani" },
          { name: "totalPenduduk", label: "Jumlah Penduduk" },
        ];
      case "pertumbuhan_pelanggan":
        return [
          { name: "pelangganTahunIni", label: "Jumlah Pelanggan Tahun Ini" },
          { name: "pelangganTahunLalu", label: "Jumlah Pelanggan Tahun Lalu" },
        ];
      case "penyelesaian_aduan":
        return [
          { name: "aduanSelesai", label: "Jumlah Aduan Selesai" },
          { name: "totalAduan", label: "Jumlah Total Aduan" },
        ];
      case "kualitas_air":
        return [
          { name: "ujiMemenuhi", label: "Jumlah Uji Yang Memenuhi Syarat" },
          { name: "totalUji", label: "Jumlah Total Pengujian" },
        ];
      case "konsumsi_air":
        return [
          { name: "airTerjualDomestik", label: "Air Terjual Domestik (m³)" },
          { name: "pelangganDomestik", label: "Jumlah Pelanggan Domestik" },
        ];
      case "efisiensi_produksi":
        return [
          { name: "produksiRiil", label: "Volume Produksi Riil (m³)" },
          { name: "kapasitasTerpasang", label: "Kapasitas Terpasang (m³)" },
        ];
      case "tingkat_kehilangan_air":
        return [
          { name: "distribusiAir", label: "Jumlah Distribusi Air (m³)" },
          { name: "airTerjual", label: "Jumlah Air Terjual (m³)" },
        ];
      case "jam_operasi":
        return [
          { name: "totalJamOperasi", label: "Total Jam Operasi Dalam Setahun" },
        ];
      case "tekanan_air":
        return [
          { name: "pelangganTekananBaik", label: "Jumlah Pelanggan dengan Tekanan > 0.7 Bar" },
          { name: "totalPelanggan", label: "Jumlah Total Pelanggan" },
        ];
      case "penggantian_meter":
        return [
          { name: "meterDiganti", label: "Jumlah Meter Air yang Diganti" },
          { name: "jumlahPelanggan", label: "Jumlah Total Pelanggan" },
        ];
      case "rasio_pegawai":
        return [
          { name: "jumlahPegawai", label: "Jumlah Pegawai" },
          { name: "pelanggan", label: "Jumlah Pelanggan" },
        ];
      case "rasio_diklat":
        return [
          { name: "pegawaiDiklat", label: "Jumlah Pegawai yang Mengikuti Diklat" },
          { name: "totalPegawai", label: "Jumlah Total Pegawai" },
        ];
      case "biaya_diklat":
        return [
          { name: "biayaDiklat", label: "Biaya Diklat" },
          { name: "biayaPegawai", label: "Total Biaya Pegawai" },
        ];
      default:
        return [];
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
                    
                    <div className="grid md:grid-cols-4 gap-4 mt-4 border-t pt-4">
                      <div>
                        <Label>Penilaian {indicator.unit}</Label>
                        <div className="h-10 flex items-center mt-1 text-base font-medium">
                          {valueObj ? valueObj.value.toFixed(2) : "-"}
                        </div>
                      </div>
                      <div>
                        <Label>Bobot</Label>
                        <div className="h-10 flex items-center mt-1 text-base">
                          {indicator.weight.toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <Label>Nilai</Label>
                        <div className="h-10 flex items-center mt-1 text-base">
                          {valueObj ? valueObj.score : "-"}
                        </div>
                      </div>
                      <div>
                        <Label>Hasil</Label>
                        <div className="h-10 flex items-center mt-1 text-base">
                          {valueObj 
                            ? (valueObj.score * indicator.weight).toFixed(3)
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
            <div className="text-2xl font-bold">{assessment.totalScore.toFixed(3)}</div>
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
