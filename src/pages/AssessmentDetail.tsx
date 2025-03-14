
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  indicators, 
  getHealthCategory 
} from "@/models/assessment";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { downloadCSV, downloadPDF } from "@/utils/exportUtils";
import { Edit, Download, FileSpreadsheet, FileText } from "lucide-react";

// Mock assessment data - in a real app this would come from an API
const mockAssessments = [
  {
    id: "1",
    name: "PDAM Tirta Pakuan",
    year: 2023,
    date: "2023-05-15",
    userId: "1",
    values: {
      "roe": { value: 8.5, score: 4 },
      "rasio_operasi": { value: 0.65, score: 4 },
      "cash_ratio": { value: 1.2, score: 5 },
      "efektivitas_penagihan": { value: 91, score: 5 },
      "solvabilitas": { value: 2.5, score: 4 },
      "cakupan_pelayanan": { value: 75, score: 4 },
      "kualitas_air": { value: 98, score: 4 },
      "kontinuitas_air": { value: 22, score: 4 },
      "penanganan_pengaduan": { value: 92, score: 4 },
      "efisiensi_produksi": { value: 85, score: 4 },
      "tingkat_kehilangan_air": { value: 18, score: 3 },
      "jam_operasi": { value: 22, score: 4 },
      "tekanan_air": { value: 0.95, score: 4 },
      "penggantian_meter": { value: 18, score: 4 },
      "rasio_pegawai": { value: 5.5, score: 3 },
      "rasio_diklat": { value: 35, score: 4 },
      "biaya_diklat": { value: 5.5, score: 3 }
    },
    totalScore: 3.75,
    status: "completed" as "completed" | "draft"
  },
  {
    id: "2",
    name: "PDAM Tirta Raharja",
    year: 2023,
    date: "2023-06-22",
    userId: "1",
    values: {
      "roe": { value: 4.2, score: 3 },
      "rasio_operasi": { value: 0.78, score: 3 },
      "cash_ratio": { value: 0.85, score: 3 },
      "efektivitas_penagihan": { value: 83, score: 3 },
      "solvabilitas": { value: 1.9, score: 3 },
      "cakupan_pelayanan": { value: 62, score: 4 },
      "kualitas_air": { value: 92, score: 3 },
      "kontinuitas_air": { value: 18, score: 3 },
      "penanganan_pengaduan": { value: 82, score: 3 },
      "efisiensi_produksi": { value: 75, score: 3 },
      "tingkat_kehilangan_air": { value: 26, score: 2 },
      "jam_operasi": { value: 18, score: 3 },
      "tekanan_air": { value: 0.75, score: 3 },
      "penggantian_meter": { value: 12, score: 3 },
      "rasio_pegawai": { value: 7.5, score: 2 },
      "rasio_diklat": { value: 28, score: 3 },
      "biaya_diklat": { value: 3.8, score: 2 }
    },
    totalScore: 2.95,
    status: "completed" as "completed" | "draft"
  }
];

const AssessmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would be a database or API call
  const assessment = mockAssessments.find(a => a.id === id);
  
  const handleEdit = () => {
    navigate(`/assessment/${id}/edit`);
  };
  
  const handleExport = (type: "csv" | "pdf") => {
    if (!assessment) return;
    
    if (type === "csv") {
      downloadCSV(assessment);
    } else {
      downloadPDF(assessment);
    }
  };
  
  // Prepare chart data
  const chartData = useMemo(() => {
    if (!assessment) return [];
    
    // Group by category
    return Object.entries(assessment.values).map(([indicatorId, valueObj]) => {
      const indicator = indicators.find(ind => ind.id === indicatorId);
      return {
        name: indicator?.name || indicatorId,
        category: indicator?.category || "Unknown",
        score: valueObj.score,
        weightedScore: valueObj.score * (indicator?.weight || 0),
      };
    });
  }, [assessment]);
  
  // Group indicators by category
  const categoryData = useMemo(() => {
    if (!assessment) return {};
    
    const result: Record<string, any[]> = {};
    
    indicators.forEach(indicator => {
      const valueObj = assessment.values[indicator.id];
      if (!valueObj) return;
      
      if (!result[indicator.category]) {
        result[indicator.category] = [];
      }
      
      result[indicator.category].push({
        ...indicator,
        value: valueObj.value,
        score: valueObj.score,
        weightedScore: valueObj.score * indicator.weight
      });
    });
    
    return result;
  }, [assessment]);
  
  if (!assessment) {
    return (
      <div className="container mx-auto py-6 text-center">
        <p>Penilaian tidak ditemukan</p>
        <Button 
          onClick={() => navigate("/assessments")}
          className="mt-4"
        >
          Kembali ke Daftar Penilaian
        </Button>
      </div>
    );
  }
  
  const healthCategory = getHealthCategory(assessment.totalScore);
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Penilaian</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4">Informasi Umum</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Nama PDAM:</span>
              <span className="font-medium">{assessment.name}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Tahun Penilaian:</span>
              <span className="font-medium">{assessment.year}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Tanggal Penilaian:</span>
              <span className="font-medium">{new Date(assessment.date).toLocaleDateString('id-ID')}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium capitalize">{assessment.status}</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4">Hasil Penilaian</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Total Skor:</span>
              <span className="font-medium">{assessment.totalScore.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Kategori:</span>
              <span className={`font-medium px-2 py-0.5 rounded-full text-white text-sm ${healthCategory.color} inline-block text-center`}>
                {healthCategory.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="border rounded-lg p-4 mb-8 bg-background">
        <h2 className="text-lg font-semibold mb-4">Grafik Penilaian</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [value.toFixed(2), name === "weightedScore" ? "Nilai Tertimbang" : "Skor"]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar name="Nilai Tertimbang" dataKey="weightedScore" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Detailed Assessment */}
      {Object.entries(categoryData).map(([category, indicators]) => (
        <div key={category} className="border rounded-lg p-4 mb-6 bg-background">
          <h2 className="text-lg font-semibold mb-4">Aspek {category}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Indikator</th>
                  <th className="py-2 px-4 text-left">Nilai</th>
                  <th className="py-2 px-4 text-left">Skor</th>
                  <th className="py-2 px-4 text-left">Bobot</th>
                  <th className="py-2 px-4 text-left">Nilai Tertimbang</th>
                </tr>
              </thead>
              <tbody>
                {indicators.map((indicator) => (
                  <tr key={indicator.id} className="border-b last:border-0">
                    <td className="py-2 px-4">{indicator.name}</td>
                    <td className="py-2 px-4">{indicator.value} {indicator.unit}</td>
                    <td className="py-2 px-4">{indicator.score}</td>
                    <td className="py-2 px-4">{indicator.weight.toFixed(3)}</td>
                    <td className="py-2 px-4">{indicator.weightedScore.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssessmentDetail;
