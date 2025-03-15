
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

const AssessmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
  
  // State for formula inputs
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
    // Update formula inputs
    setFormulaInputs(prev => ({
      ...prev,
      [indicatorId]: {
        ...(prev[indicatorId] || {}),
        [inputName]: value
      }
    }));
    
    // Calculate formula value based on inputs
    const indicator = indicators.find(ind => ind.id === indicatorId);
    if (!indicator) return;
    
    let calculatedValue: number = 0;
    
    // Calculate value based on the indicator
    switch (indicatorId) {
      case "roe":
        // ROE = Laba Bersih / Jumlah Ekuitas × 100%
        const labaBersih = formulaInputs[indicatorId]?.labaBersih || 0;
        const ekuitas = formulaInputs[indicatorId]?.ekuitas || 1; // Prevent division by zero
        calculatedValue = (labaBersih / ekuitas) * 100;
        break;
      
      case "rasio_operasi":
        // Rasio Operasi = Biaya Operasi / Pendapatan Operasi
        const biayaOperasi = formulaInputs[indicatorId]?.biayaOperasi || 0;
        const pendapatanOperasi = formulaInputs[indicatorId]?.pendapatanOperasi || 1;
        calculatedValue = biayaOperasi / pendapatanOperasi;
        break;
      
      case "cash_ratio":
        // Cash Ratio = (Kas + Setara Kas) / Utang Lancar
        const kas = formulaInputs[indicatorId]?.kas || 0;
        const setaraKas = formulaInputs[indicatorId]?.setaraKas || 0;
        const utangLancar = formulaInputs[indicatorId]?.utangLancar || 1;
        calculatedValue = (kas + setaraKas) / utangLancar;
        break;
      
      case "efektivitas_penagihan":
        // Efektivitas Penagihan = Jumlah Penerimaan Rek Air / Jumah Rekening Air × 100%
        const penerimaanRekAir = formulaInputs[indicatorId]?.penerimaanRekAir || 0;
        const jumlahRekeningAir = formulaInputs[indicatorId]?.jumlahRekeningAir || 1;
        calculatedValue = (penerimaanRekAir / jumlahRekeningAir) * 100;
        break;
      
      case "solvabilitas":
        // Solvabilitas = Total Aktiva / Total Utang × 100%
        const totalAktiva = formulaInputs[indicatorId]?.totalAktiva || 0;
        const totalUtang = formulaInputs[indicatorId]?.totalUtang || 1;
        calculatedValue = (totalAktiva / totalUtang) * 100;
        break;
      
      case "cakupan_pelayanan":
        // Cakupan Pelayanan = Jumlah Penduduk Terlayani / Jumlah Penduduk × 100%
        const pendudukTerlayani = formulaInputs[indicatorId]?.pendudukTerlayani || 0;
        const totalPenduduk = formulaInputs[indicatorId]?.totalPenduduk || 1;
        calculatedValue = (pendudukTerlayani / totalPenduduk) * 100;
        break;
      
      case "pertumbuhan_pelanggan":
        // Pertumbuhan Pelanggan = (Pelanggan tahun ini - tahun lalu) / tahun lalu × 100%
        const pelangganTahunIni = formulaInputs[indicatorId]?.pelangganTahunIni || 0;
        const pelangganTahunLalu = formulaInputs[indicatorId]?.pelangganTahunLalu || 1;
        calculatedValue = ((pelangganTahunIni - pelangganTahunLalu) / pelangganTahunLalu) * 100;
        break;
      
      case "penyelesaian_aduan":
        // Penyelesaian Aduan = Jumlah Aduan Selesai / Jumlah Aduan × 100%
        const aduanSelesai = formulaInputs[indicatorId]?.aduanSelesai || 0;
        const totalAduan = formulaInputs[indicatorId]?.totalAduan || 1;
        calculatedValue = (aduanSelesai / totalAduan) * 100;
        break;
      
      case "kualitas_air":
        // Kualitas Air = Jumlah Uji Yang Memenuhi Syarat / Jumlah Yang Diuji × 100%
        const ujiMemenuhi = formulaInputs[indicatorId]?.ujiMemenuhi || 0;
        const totalUji = formulaInputs[indicatorId]?.totalUji || 1;
        calculatedValue = (ujiMemenuhi / totalUji) * 100;
        break;
      
      case "konsumsi_air":
        // Konsumsi Air = Air Terjual Domestik / Jumlah Pelanggan Domestik
        const airTerjualDomestik = formulaInputs[indicatorId]?.airTerjualDomestik || 0;
        const pelangganDomestik = formulaInputs[indicatorId]?.pelangganDomestik || 1;
        calculatedValue = airTerjualDomestik / pelangganDomestik;
        break;
      
      case "efisiensi_produksi":
        // Efisiensi Produksi = Volume Produksi Riil / Kapasitas Terpasang × 100%
        const produksiRiil = formulaInputs[indicatorId]?.produksiRiil || 0;
        const kapasitasTerpasang = formulaInputs[indicatorId]?.kapasitasTerpasang || 1;
        calculatedValue = (produksiRiil / kapasitasTerpasang) * 100;
        break;
      
      case "tingkat_kehilangan_air":
        // Tingkat Kehilangan Air = (Distribusi Air - Air Terjual) / Distribusi Air × 100%
        const distribusiAir = formulaInputs[indicatorId]?.distribusiAir || 0;
        const airTerjual = formulaInputs[indicatorId]?.airTerjual || 0;
        calculatedValue = distribusiAir > 0 ? ((distribusiAir - airTerjual) / distribusiAir) * 100 : 0;
        break;
      
      case "jam_operasi":
        // Jam Operasi = Total Jam Operasi Dalam Setahun / 365
        const totalJamOperasi = formulaInputs[indicatorId]?.totalJamOperasi || 0;
        calculatedValue = totalJamOperasi / 365;
        break;
      
      case "tekanan_air":
        // Tekanan Air = Jumlah Pelanggan Dengan Tekanan Baik / Jumlah Pelanggan × 100%
        const pelangganTekananBaik = formulaInputs[indicatorId]?.pelangganTekananBaik || 0;
        const totalPelanggan = formulaInputs[indicatorId]?.totalPelanggan || 1;
        calculatedValue = (pelangganTekananBaik / totalPelanggan) * 100;
        break;
      
      case "penggantian_meter":
        // Penggantian Meter = Jumlah Meter Yang Diganti / Jumlah Pelanggan × 100%
        const meterDiganti = formulaInputs[indicatorId]?.meterDiganti || 0;
        const jumlahPelanggan = formulaInputs[indicatorId]?.jumlahPelanggan || 1;
        calculatedValue = (meterDiganti / jumlahPelanggan) * 100;
        break;
      
      case "rasio_pegawai":
        // Rasio Pegawai = Jumlah Pegawai / Jumlah Pelanggan × 1000
        const jumlahPegawai = formulaInputs[indicatorId]?.jumlahPegawai || 0;
        const pelanggan = formulaInputs[indicatorId]?.pelanggan || 1;
        calculatedValue = (jumlahPegawai / pelanggan) * 1000;
        break;
      
      case "rasio_diklat":
        // Rasio Diklat = Jumlah Pegawai Yang Ikut Diklat / Jumlah Pegawai × 100%
        const pegawaiDiklat = formulaInputs[indicatorId]?.pegawaiDiklat || 0;
        const totalPegawai = formulaInputs[indicatorId]?.totalPegawai || 1;
        calculatedValue = (pegawaiDiklat / totalPegawai) * 100;
        break;
      
      case "biaya_diklat":
        // Biaya Diklat = Biaya Diklat / Biaya Pegawai × 100%
        const biayaDiklat = formulaInputs[indicatorId]?.biayaDiklat || 0;
        const biayaPegawai = formulaInputs[indicatorId]?.biayaPegawai || 1;
        calculatedValue = (biayaDiklat / biayaPegawai) * 100;
        break;
      
      default:
        calculatedValue = 0;
    }
    
    // Update with calculated value
    handleValueChange(indicator, calculatedValue);
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
  
  // Get formula inputs configuration for each indicator
  const getFormulaInputs = (indicatorId: string) => {
    switch (indicatorId) {
      case "roe":
        return [
          { name: "labaBersih", label: "Laba Bersih" },
          { name: "ekuitas", label: "Jumlah Ekuitas" },
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
          { name: "ujiMemenuhi", label: "Jumlah Uji Memenuhi Syarat" },
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
  
  // Group indicators by category
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
                const inputs = getFormulaInputs(indicator.id);
                
                return (
                  <div key={indicator.id} className="border p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h3 className="font-medium text-base md:w-1/3">{indicator.name}</h3>
                      <div className="text-sm text-muted-foreground md:w-2/3">
                        Formula: {indicator.formula}
                      </div>
                    </div>
                    
                    {/* Formula inputs */}
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
    </DashboardLayout>
  );
};

export default AssessmentForm;
