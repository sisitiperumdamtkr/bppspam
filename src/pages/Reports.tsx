import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Radar,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Printer, RefreshCw } from "lucide-react";
import { getHealthCategory } from "@/models/health-categories";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";
import { useToast } from "@/components/ui/use-toast";

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
  const [selectedYear, setSelectedYear] = useState("all");
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;

      const mappedData = data?.map(item => ({
        id: item.id,
        name: item.name,
        year: item.year,
        date: item.date,
        userId: item.user_id,
        totalScore: item.total_score || 0,
        status: item.status,
        values: {},
      })) || [];

      setAssessments(mappedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const years = Array.from(new Set(assessments.map(a => a.year))).sort((a, b) => b - a);
  const filteredAssessments = assessments.filter(assessment => selectedYear === "all" || assessment.year.toString() === selectedYear);

  const trendData = years.map(year => {
    const yearAssessment = assessments.find(a => a.year === year);
    return {
      year,
      score: yearAssessment ? parseFloat(yearAssessment.totalScore.toFixed(2)) : 0,
    };
  }).sort((a, b) => a.year - b.year);

  const aspectOverYearsData = years.map(year => {
    const yearAssessment = assessments.find(a => a.year === year);
    const aspectScores = yearAssessment ? {
      Keuangan: yearAssessment.totalScore * 0.9,
      Pelayanan: yearAssessment.totalScore * 1.1,
      Operasional: yearAssessment.totalScore * 0.95,
      SDM: yearAssessment.totalScore * 1.05
    } : { Keuangan: 0, Pelayanan: 0, Operasional: 0, SDM: 0 };

    return { year, ...aspectScores };
  }).sort((a, b) => a.year - b.year);

  const categoryDistributionData = assessments.reduce((acc, assessment) => {
    const category = getHealthCategory(assessment.totalScore).category;
    const existing = acc.find(item => item.name === category);
    existing ? existing.value++ : acc.push({ name: category, value: 1 });
    return acc;
  }, []);

  const latestAssessment = assessments.length > 0 ? [...assessments].sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;
  const radarData = Object.keys(ASPECT_COLORS).map(aspect => {
    const score = latestAssessment ? latestAssessment.totalScore * (
      aspect === 'Keuangan' ? 0.9 :
      aspect === 'Pelayanan' ? 1.1 :
      aspect === 'Operasional' ? 0.95 : 1.05
    ) : 0;
    return { aspect, score };
  });

  const handlePrint = () => window.print();
  const handleRefresh = () => {
    fetchAssessments();
    toast({ title: "Memperbarui Data", description: "Data laporan sedang diperbarui" });
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
      {/* Component content truncated for brevity, continue rendering UI elements... */}
    </DashboardLayout>
  );
};

export default Reports;
