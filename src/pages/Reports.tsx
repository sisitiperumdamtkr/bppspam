import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Printer, Filter, RefreshCw } from "lucide-react";
import { getHealthCategory } from "@/models/health-categories";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";
import { useToast } from "@/components/ui/use-toast";
import { downloadPDF } from "@/utils/exportUtils";
import { printReport } from "@/utils/printUtils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Color scheme for charts with more vibrant colors for better 3D effect
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const ASPECT_COLORS = {
  Keuangan: '#0088FE',
  Pelayanan: '#00C49F',
  Operasional: '#FFBB28',
  SDM: '#FF8042'
};

const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch assessments from Supabase
  const fetchAssessments = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) {
        console.error('Error fetching assessments:', error);
        toast({
          title: "Error",
          description: "Gagal mengambil data penilaian",
          variant: "destructive"
        });
        return;
      }
      
      console.log("Reports - Fetched assessment data:", data);
      
      // Map database column names to our interface properties
      const mappedData = data?.map(item => ({
        id: item.id,
        name: item.name,
        year: item.year,
        date: item.date,
        userId: item.user_id,
        totalScore: item.total_score || 0,
        status: item.status as "draft" | "completed",
        values: {} // Initialize with empty values as we're not fetching them here
      })) || [];
      
      setAssessments(mappedData);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAssessments();
  }, []);
  
  // Get unique years
  const years = Array.from(new Set(assessments.map(a => a.year))).sort((a, b) => b - a);
  
  // Filter assessments based on selection
  const filteredAssessments = assessments.filter(assessment => {
    const yearMatch = selectedYear === "all" || assessment.year.toString() === selectedYear;
    return yearMatch;
  });
  
  // Prepare data for trend chart
  const trendData = years.map(year => {
    const yearAssessment = assessments.find(a => a.year === year);
    
    return {
      year,
      score: yearAssessment ? parseFloat(yearAssessment.totalScore.toFixed(2)) : 0
    };
  }).sort((a, b) => a.year - b.year); // Sort by year ascending
  
  // Prepare data for aspect comparison over years
  const aspectOverYearsData = years.map(year => {
    const yearAssessment = assessments.find(a => a.year === year);
    
    // For this demo, we'll create aspect scores based on the totalScore
    // In a real app, you'd fetch the actual aspect scores
    const aspectScores = yearAssessment ? {
      Keuangan: yearAssessment.totalScore * 0.9,
      Pelayanan: yearAssessment.totalScore * 1.1,
      Operasional: yearAssessment.totalScore * 0.95,
      SDM: yearAssessment.totalScore * 1.05
    } : { Keuangan: 0, Pelayanan: 0, Operasional: 0, SDM: 0 };
    
    return {
      year,
      ...aspectScores
    };
  }).sort((a, b) => a.year - b.year); // Sort by year ascending
  
  // Prepare data for category distribution
  const categoryDistributionData = assessments.reduce((acc, assessment) => {
    const category = getHealthCategory(assessment.totalScore).category;
    const existingCategory = acc.find(item => item.name === category);
    
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);
  
  // Prepare data for radar chart - latest assessment
  const latestAssessment = assessments.length > 0 ? 
    assessments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : 
    null;
  
  const radarData = Object.keys(ASPECT_COLORS).map(aspect => {
    // For this demo, we'll create aspect scores based on the totalScore of the latest assessment
    // In a real app, you'd fetch the actual aspect scores
    const score = latestAssessment ? 
      latestAssessment.totalScore * (aspect === 'Keuangan' ? 0.9 : 
                                      aspect === 'Pelayanan' ? 1.1 : 
                                      aspect === 'Operasional' ? 0.95 : 1.05) : 
      0;
    
    return {
      aspect,
      score
    };
  });
  
  const handlePrint = () => {
    printReport();
  };
  
  const handleDownloadPDF = () => {
    if (assessments.length > 0) {
      // Gunakan assessment terbaru jika ada beberapa
      const latestAssessment = [...assessments].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      
      downloadPDF(latestAssessment);
      
      toast({
        title: "Unduhan Berhasil",
        description: "Laporan PDF telah diunduh",
      });
    } else {
      toast({
        title: "Tidak Ada Data",
        description: "Tidak ada data untuk diunduh",
        variant: "destructive"
      });
    }
  };
  
  const handleRefresh = () => {
    fetchAssessments();
    toast({
      title: "Memperbarui Data",
      description: "Data laporan sedang diperbarui",
    });
  };

  if (loading) {
    return (
      <DashboardLayout title="Laporan">
        <div className="text-center py-10">
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Laporan">
      <div className="flex flex-col gap-6 printable">
        <div className="flex justify-between items-center non-printable">
          <h1 className="text-2xl font-bold">Laporan Penilaian PERUMDAM TIRTA KERTA RAHARJA</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              className="flex items-center gap-2 non-printable"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint} 
              className="flex items-center gap-2 non-printable"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden md:inline">Cetak</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownloadPDF} 
              className="flex items-center gap-2 non-printable"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Unduh PDF</span>
            </Button>
          </div>
        </div>
        
        {/* Header untuk cetak */}
        <div className="hidden print:block print:mb-4">
          <h1 className="text-2xl font-bold text-center">Laporan Penilaian PERUMDAM TIRTA KERTA RAHARJA</h1>
          <div className="text-center text-sm text-muted-foreground">
            Tanggal cetak: {new Date().toLocaleDateString('id-ID')}
          </div>
        </div>
        
        {/* Filter controls */}
        <Card className="non-printable">
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
                    {years.map((year) => (
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
              <div className="text-2xl font-bold">{filteredAssessments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Skor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredAssessments.length > 0 
                  ? (filteredAssessments.reduce((sum, a) => sum + a.totalScore, 0) / filteredAssessments.length).toFixed(2)
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
                {filteredAssessments.length > 0 
                  ? Math.max(...filteredAssessments.map(a => a.totalScore)).toFixed(2)
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
                {filteredAssessments.length > 0 
                  ? Math.min(...filteredAssessments.map(a => a.totalScore)).toFixed(2)
                  : "-"}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts dengan efek 3D */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:break-inside-avoid">
          {/* Trend Chart with 3D effect */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Tren Skor Tahunan</CardTitle>
              <CardDescription>
                Perkembangan skor penilaian PERUMDAM TIRTA KERTA RAHARJA per tahun
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {trendData.length > 0 ? (
                <ChartContainer config={{ score: { color: '#8884d8' } }} className="w-full aspect-[4/3]">
                  <LineChart
                    data={trendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 5]} />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent 
                              active={active}
                              payload={payload}
                              is3D={true}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                      dot={{ strokeWidth: 2, r: 6 }}
                      name="Skor Rata-rata"
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Tidak ada data untuk ditampilkan
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Aspect Comparison Over Years with 3D effect */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Perkembangan Aspek Penilaian</CardTitle>
              <CardDescription>
                Skor per aspek dari tahun ke tahun
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {aspectOverYearsData.length > 0 ? (
                <ChartContainer 
                  config={{
                    Keuangan: { color: ASPECT_COLORS.Keuangan },
                    Pelayanan: { color: ASPECT_COLORS.Pelayanan },
                    Operasional: { color: ASPECT_COLORS.Operasional },
                    SDM: { color: ASPECT_COLORS.SDM },
                  }}
                  className="w-full aspect-[4/3]"
                >
                  <BarChart
                    data={aspectOverYearsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 5]} />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent 
                              active={active}
                              payload={payload}
                              is3D={true}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    {Object.keys(ASPECT_COLORS).map((aspect, index) => (
                      <Bar
                        key={aspect}
                        dataKey={aspect}
                        fill={ASPECT_COLORS[aspect as keyof typeof ASPECT_COLORS]}
                        name={`Aspek ${aspect}`}
                        stackId="a"
                        fillOpacity={0.8}
                        stroke="#000"
                        strokeOpacity={0.2}
                        strokeWidth={1}
                      />
                    ))}
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Tidak ada data untuk ditampilkan
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Category Distribution with 3D effect */}
          <Card className="col-span-1 print:break-inside-avoid">
            <CardHeader>
              <CardTitle>Distribusi Kategori Penilaian</CardTitle>
              <CardDescription>
                Jumlah penilaian per kategori kesehatan
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {categoryDistributionData.length > 0 ? (
                <ChartContainer 
                  config={categoryDistributionData.reduce((acc, item, index) => ({
                    ...acc,
                    [item.name]: { color: COLORS[index % COLORS.length] }
                  }), {})}
                  className="w-full aspect-[4/3]"
                >
                  <PieChart>
                    <Pie
                      data={categoryDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={5}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistributionData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent 
                              active={active}
                              payload={payload}
                              is3D={true}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ChartContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Tidak ada data untuk ditampilkan
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Radar Chart with 3D effect */}
          <Card className="col-span-1 print:break-inside-avoid">
            <CardHeader>
              <CardTitle>Profil Kinerja Terkini</CardTitle>
              <CardDescription>
                Skor per aspek penilaian pada tahun terbaru ({latestAssessment?.year || 'Tidak ada data'})
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {latestAssessment ? (
                <ChartContainer 
                  config={radarData.reduce((acc, item) => ({
                    ...acc,
                    [item.aspect]: { color: ASPECT_COLORS[item.aspect as keyof typeof ASPECT_COLORS] || '#8884d8' }
                  }), {})}
                  className="w-full aspect-[4/3]"
                >
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid gridType="circle" />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis domain={[0, 5]} />
                    <Radar
                      name="Skor Aspek"
                      dataKey="score"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.7}
                      strokeWidth={2}
                    />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent 
                              active={active}
                              payload={payload}
                              is3D={true}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ChartContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Tidak ada data untuk ditampilkan
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Data Table */}
        <Card className="print:break-inside-avoid">
          <CardHeader>
            <CardTitle>Data Penilaian</CardTitle>
            <CardDescription>
              Daftar penilaian PERUMDAM TIRTA KERTA RAHARJA dari tahun ke tahun
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
                    <th className="text-right p-2 non-printable">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssessments.length > 0 ? (
                    filteredAssessments.map((assessment) => {
                      const healthCategory = getHealthCategory(assessment.totalScore);
                      return (
                        <tr 
                          key={assessment.id} 
                          className="border-b hover:bg-muted/50 cursor-pointer" 
                        >
                          <td className="p-2">{assessment.year}</td>
                          <td className="p-2">{new Date(assessment.date).toLocaleDateString("id-ID")}</td>
                          <td className="p-2 text-right font-medium">{assessment.totalScore.toFixed(2)}</td>
                          <td className="p-2">
                            <span className={`${healthCategory.color} text-white text-xs px-2 py-1 rounded-full`}>
                              {healthCategory.category}
                            </span>
                          </td>
                          <td className="p-2 text-right non-printable">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/assessment/${assessment.id}`)}
                            >
                              Detail
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-muted-foreground">
                        Tidak ada data yang sesuai dengan filter
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer untuk cetak */}
        <div className="hidden print:block print:mt-6 print:pt-4 print:border-t print:text-center">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} - PERUMDAM TIRTA KERTA RAHARJA
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
