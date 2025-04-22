import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Printer, RefreshCw } from "lucide-react";
import { getHealthCategorykemendagri } from "@/models/health-categories";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";
import { useToast } from "@/components/ui/use-toast";
import { kemendagriIndicators } from "@/models/kemendagri-indicators";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ReportsKemendagri = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('kemendagri_assessments' as any)
          .select('*')
          .order('year', { ascending: true });
        
        if (assessmentError) {
          console.error('Error fetching assessments:', assessmentError);
          return;
        }
        
        if (!assessmentData || assessmentData.length === 0) {
          setLoading(false);
          return;
        }
        
        const { data: valuesData, error: valuesError } = await supabase
          .from('kemendagri_assessment_values' as any)
          .select('*');
        
        if (valuesError) {
          console.error('Error fetching assessment values:', valuesError);
          return;
        }
        
        const mappedAssessments = assessmentData.map((assessment: any) => {
          const values: Record<string, { value: number, score: number }> = {};
          
          valuesData
            .filter((value: any) => value.assessment_id === assessment.id)
            .forEach((value: any) => {
              values[value.indicator_id] = {
                value: Number(value.value),
                score: Number(value.score)
              };
            });
          
          return {
            id: assessment.id,
            name: assessment.name,
            year: assessment.year,
            date: assessment.date,
            userId: assessment.user_id,
            totalScore: assessment.total_score || 0,
            status: assessment.status as "draft" | "completed",
            values: values
          };
        });
        
        setAssessments(mappedAssessments);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessments();
  }, []);

  const handlePrint = () => {
    window.print();
  };
  
  const handleRefresh = () => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('kemendagri_assessments' as any)
          .select('*')
          .order('year', { ascending: true });
        
        if (assessmentError) {
          console.error('Error fetching assessments:', assessmentError);
          return;
        }
        
        if (!assessmentData || assessmentData.length === 0) {
          setLoading(false);
          return;
        }
        
        const { data: valuesData, error: valuesError } = await supabase
          .from('kemendagri_assessment_values' as any)
          .select('*');
        
        if (valuesError) {
          console.error('Error fetching assessment values:', valuesError);
          return;
        }
        
        const mappedAssessments = assessmentData.map((assessment: any) => {
          const values: Record<string, { value: number, score: number }> = {};
          
          valuesData
            .filter((value: any) => value.assessment_id === assessment.id)
            .forEach((value: any) => {
              values[value.indicator_id] = {
                value: Number(value.value),
                score: Number(value.score)
              };
            });
          
          return {
            id: assessment.id,
            name: assessment.name,
            year: assessment.year,
            date: assessment.date,
            userId: assessment.user_id,
            totalScore: assessment.total_score || 0,
            status: assessment.status as "draft" | "completed",
            values: values
          };
        });
        
        setAssessments(mappedAssessments);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
    toast({
      title: "Memperbarui Data",
      description: "Data laporan sedang diperbarui",
    });
  };

  const yearlyScoreData = assessments.map(assessment => ({
    year: assessment.year,
    score: assessment.totalScore,
    category: getHealthCategorykemendagri(assessment.totalScore).category
  }));
  
  const healthCategories = assessments.reduce<Record<string, number>>((acc, assessment) => {
    const category = getHealthCategorykemendagri(assessment.totalScore).category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const healthCategoryData = Object.entries(healthCategories).map(([category, count]) => ({
    name: category,
    value: count
  }));
  
  const aspectData = kemendagriIndicators.reduce<Record<string, { category: string, indicators: string[] }>>((acc, indicator) => {
    if (!acc[indicator.category]) {
      acc[indicator.category] = {
        category: indicator.category,
        indicators: []
      };
    }
    acc[indicator.category].indicators.push(indicator.id);
    return acc;
  }, {});
  
  // Hitung total nilai masing-masing aspek dari tahun ke tahun
  const yearlyAspectScores = assessments.map(assessment => {
    const aspectScores: Record<string, number> = {};

    Object.entries(aspectData).forEach(([category, { indicators }]) => {
      let totalScore = 0;

      indicators.forEach(indicatorId => {
        const value = assessment.values[indicatorId];
        if (value) {
          totalScore += value.score; // Hitung total nilai, bukan rata-rata
        }
      });

      aspectScores[category] = totalScore; // Simpan total nilai untuk setiap aspek
    });

    return {
      year: assessment.year,
      ...aspectScores,
    };
  });

  if (loading) {
    return (
      <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
        <div className="text-center py-10">
          <p className="text-muted-foreground">Memuat data laporan...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (assessments.length === 0) {
    return (
      <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Laporan Penilaian KEMENDAGRI</h1>
          </div>
          
          <Card>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-2">Belum ada data penilaian KEMENDAGRI</p>
                <p className="text-sm text-muted-foreground">Silahkan buat penilaian KEMENDAGRI terlebih dahulu</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
      <div className="flex flex-col gap-6">
        {/* Existing header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Laporan Penilaian KEMENDAGRI</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span className="hidden md:inline">Cetak</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Unduh PDF</span>
            </Button>
          </div>
        </div>
        
        {/* Filter card - existing */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year-select">Tahun</Label>
                <Select 
                  value={selectedYear}
                  onValueChange={(value) => setSelectedYear(value)}
                >
                  <SelectTrigger id="year-select">
                    <SelectValue placeholder="Pilih Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    {Array.from(new Set(assessments.map(a => a.year))).sort((a, b) => b - a).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Penilaian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Skor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assessments.length > 0 
                  ? (assessments.reduce((sum, a) => sum + a.totalScore, 0) / assessments.length).toFixed(2)
                  : "-"}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Skor Tertinggi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assessments.length > 0 
                  ? Math.max(...assessments.map(a => a.totalScore)).toFixed(2)
                  : "-"}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Skor Terendah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assessments.length > 0 
                  ? Math.min(...assessments.map(a => a.totalScore)).toFixed(2)
                  : "-"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Tren Skor Tahunan</CardTitle>
              <CardDescription>
                Perkembangan skor penilaian KEMENDAGRI per tahun
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yearlyScoreData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Skor Rata-rata"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Aspect Comparison Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Perkembangan Aspek Penilaian</CardTitle>
              <CardDescription>
                Total nilai masing-masing aspek dari tahun ke tahun
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyAspectScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 'auto']} />
                  <Tooltip />
                  <Legend />
                  {Object.keys(aspectData).map((category, index) => (
                    <Bar
                      key={category}
                      dataKey={category}
                      name={`Aspek ${category}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Distribusi Kategori Penilaian</CardTitle>
              <CardDescription>
                Jumlah penilaian per kategori kesehatan
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={healthCategoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {healthCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Latest Assessment Radar Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Profil Kinerja Terkini</CardTitle>
              <CardDescription>
                Skor per aspek penilaian pada tahun terbaru
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={Object.entries(aspectData).map(([category]) => ({
                    aspect: category,
                    score: yearlyAspectScores[yearlyAspectScores.length - 1]?.[category] || 0
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="aspect" />
                  <PolarRadiusAxis domain={[0, 5]} />
                  <Radar
                    name="Skor Aspek"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Data Penilaian</CardTitle>
            <CardDescription>
              Daftar penilaian KEMENDAGRI dari tahun ke tahun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Tahun</th>
                    <th className="text-left p-2">Tanggal</th>
                    <th className="text-right p-2">Skor</th>
                    <th className="text-left p-2">Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.length > 0 ? (
                    assessments.map((assessment) => {
                      const healthCategory = getHealthCategorykemendagri(assessment.totalScore);
                      return (
                        <tr key={assessment.id} className="border-b hover:bg-muted/50 cursor-pointer">
                          <td className="p-2">{assessment.year}</td>
                          <td className="p-2">{new Date(assessment.date).toLocaleDateString("id-ID")}</td>
                          <td className="p-2 text-right font-medium">{assessment.totalScore.toFixed(2)}</td>
                          <td className="p-2">
                            <span className={`${healthCategory.color} text-white text-xs px-2 py-1 rounded-full`}>
                              {healthCategory.category}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        Tidak ada data yang sesuai dengan filter
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsKemendagri;
