
import React, { useState } from "react";
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
import { Download, Printer, Filter } from "lucide-react";
import { getHealthCategory } from "@/models/health-categories";

// Mock data for reports - updated to include only PERUMDAM TIRTA KERTA RAHARJA over different years
const mockAssessments = [
  {
    id: "1",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2023,
    date: "2023-05-15",
    totalScore: 3.75,
    aspectScores: {
      Keuangan: 3.8,
      Pelayanan: 3.6,
      Operasional: 3.9,
      SDM: 3.7
    },
    status: "completed",
  },
  {
    id: "2",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2022,
    date: "2022-06-22",
    totalScore: 3.25,
    aspectScores: {
      Keuangan: 3.3,
      Pelayanan: 3.2,
      Operasional: 3.3,
      SDM: 3.2
    },
    status: "completed",
  },
  {
    id: "3",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2021,
    date: "2021-05-10",
    totalScore: 3.45,
    aspectScores: {
      Keuangan: 3.5,
      Pelayanan: 3.4,
      Operasional: 3.5,
      SDM: 3.4
    },
    status: "completed",
  },
  {
    id: "4",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2020,
    date: "2020-06-18",
    totalScore: 2.75,
    aspectScores: {
      Keuangan: 2.9,
      Pelayanan: 2.7,
      Operasional: 2.8,
      SDM: 2.6
    },
    status: "completed",
  },
  {
    id: "5",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2019,
    date: "2019-05-20",
    totalScore: 2.5,
    aspectScores: {
      Keuangan: 2.6,
      Pelayanan: 2.5,
      Operasional: 2.4,
      SDM: 2.5
    },
    status: "completed",
  },
];

// Color scheme for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const ASPECT_COLORS = {
  Keuangan: '#0088FE',
  Pelayanan: '#00C49F',
  Operasional: '#FFBB28',
  SDM: '#FF8042'
};

const Reports = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  // Get unique years
  const years = Array.from(new Set(mockAssessments.map(a => a.year))).sort((a, b) => b - a);
  
  // Filter assessments based on selection
  const filteredAssessments = mockAssessments.filter(assessment => {
    const yearMatch = selectedYear === "all" || assessment.year.toString() === selectedYear;
    return yearMatch;
  });
  
  // Prepare data for trend chart
  const trendData = years.map(year => {
    const yearAssessment = mockAssessments.find(a => a.year === year);
    
    return {
      year,
      score: yearAssessment ? parseFloat(yearAssessment.totalScore.toFixed(2)) : 0
    };
  }).sort((a, b) => a.year - b.year); // Sort by year ascending
  
  // Prepare data for aspect comparison over years
  const aspectOverYearsData = years.map(year => {
    const yearAssessment = mockAssessments.find(a => a.year === year);
    
    return {
      year,
      ...yearAssessment?.aspectScores
    };
  }).sort((a, b) => a.year - b.year); // Sort by year ascending
  
  // Prepare data for category distribution
  const categoryDistributionData = mockAssessments.reduce((acc, assessment) => {
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
  const latestAssessment = mockAssessments.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  
  const radarData = Object.keys(ASPECT_COLORS).map(aspect => {
    return {
      aspect,
      score: latestAssessment?.aspectScores[aspect as keyof typeof latestAssessment.aspectScores] || 0
    };
  });
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <DashboardLayout title="Laporan">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Laporan Penilaian PERUMDAM TIRTA KERTA RAHARJA</h1>
          <div className="flex gap-2">
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
        
        {/* Filter controls */}
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
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Tren Skor Tahunan</CardTitle>
              <CardDescription>
                Perkembangan skor penilaian PERUMDAM TIRTA KERTA RAHARJA per tahun
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
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
          
          {/* Aspect Comparison Over Years */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Perkembangan Aspek Penilaian</CardTitle>
              <CardDescription>
                Skor per aspek dari tahun ke tahun
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aspectOverYearsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  {Object.keys(ASPECT_COLORS).map((aspect, index) => (
                    <Bar
                      key={aspect}
                      dataKey={aspect}
                      fill={ASPECT_COLORS[aspect as keyof typeof ASPECT_COLORS]}
                      name={`Aspek ${aspect}`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Category Distribution */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Distribusi Kategori Penilaian</CardTitle>
              <CardDescription>
                Jumlah penilaian per kategori kesehatan
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Radar Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Profil Kinerja Terkini</CardTitle>
              <CardDescription>
                Skor per aspek penilaian pada tahun terbaru ({latestAssessment?.year})
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
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
                  </tr>
                </thead>
                <tbody>
                  {filteredAssessments.map((assessment) => {
                    const healthCategory = getHealthCategory(assessment.totalScore);
                    return (
                      <tr key={assessment.id} className="border-b hover:bg-muted/50 cursor-pointer" 
                          onClick={() => navigate(`/assessment/${assessment.id}`)}>
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
                  })}
                  {filteredAssessments.length === 0 && (
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
      </div>
    </DashboardLayout>
  );
};

export default Reports;
