
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";
import { kemendagriIndicators } from "@/models/kemendagri-indicators";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { getHealthCategory } from "@/models/health-categories";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ReportsKemendagri = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        
        // Ambil semua penilaian Kemendagri
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
        
        // Ambil data nilai untuk semua penilaian
        const { data: valuesData, error: valuesError } = await supabase
          .from('kemendagri_assessment_values' as any)
          .select('*');
        
        if (valuesError) {
          console.error('Error fetching assessment values:', valuesError);
          return;
        }
        
        // Map data ke format yang kita perlukan
        const mappedAssessments = assessmentData.map((assessment: any) => {
          const values: Record<string, { value: number, score: number }> = {};
          
          // Filter nilai untuk assessment ini
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

  // Data untuk grafik perbandingan total skor per tahun
  const yearlyScoreData = assessments.map(assessment => ({
    year: assessment.year,
    score: assessment.totalScore,
    category: getHealthCategory(assessment.totalScore).category
  }));
  
  // Data untuk grafik distribusi kategori kesehatan
  const healthCategories = assessments.reduce<Record<string, number>>((acc, assessment) => {
    const category = getHealthCategory(assessment.totalScore).category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const healthCategoryData = Object.entries(healthCategories).map(([category, count]) => ({
    name: category,
    value: count
  }));
  
  // Data untuk grafik aspek per tahun
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
  
  const yearlyAspectScores = assessments.map(assessment => {
    const aspectScores: Record<string, number> = {};
    
    Object.entries(aspectData).forEach(([category, { indicators }]) => {
      let totalWeightedScore = 0;
      let totalWeight = 0;
      
      indicators.forEach(indicatorId => {
        const indicator = kemendagriIndicators.find(ind => ind.id === indicatorId);
        const value = assessment.values[indicatorId];
        
        if (indicator && value) {
          totalWeightedScore += value.score * indicator.weight;
          totalWeight += indicator.weight;
        }
      });
      
      aspectScores[category] = totalWeight ? totalWeightedScore / totalWeight : 0;
    });
    
    return {
      year: assessment.year,
      ...aspectScores
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
          
          <div className="border rounded-lg p-6 bg-background">
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-2">Belum ada data penilaian KEMENDAGRI</p>
              <p className="text-sm text-muted-foreground">Silahkan buat penilaian KEMENDAGRI terlebih dahulu</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Laporan Penilaian KEMENDAGRI</h1>
        </div>
        
        {/* Grafik Skor Total Per Tahun */}
        <div className="border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4">Skor Total Per Tahun</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 5]} />
              <Tooltip
                formatter={(value: number) => [value.toFixed(2), "Skor"]}
                labelFormatter={(label) => `Tahun ${label}`}
              />
              <Legend />
              <Bar dataKey="score" name="Skor Total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Grafik Distribusi Kategori Kesehatan */}
        <div className="border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4">Distribusi Kategori Kesehatan</h2>
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
                <Tooltip 
                  formatter={(value: number, name: string) => [value, name]} 
                  labelFormatter={() => "Jumlah"} 
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 md:mt-0 md:ml-4">
              <h3 className="text-md font-medium mb-2">Legenda</h3>
              <ul className="space-y-1">
                {healthCategoryData.map((entry, index) => (
                  <li key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{entry.name}: {entry.value} penilaian</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Grafik Aspek Per Tahun */}
        <div className="border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4">Skor Aspek Per Tahun</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyAspectScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                formatter={(value: number, name: string) => [value.toFixed(2), `Aspek ${name}`]}
                labelFormatter={(label) => `Tahun ${label}`}
              />
              <Legend />
              {Object.keys(aspectData).map((category, index) => (
                <Line 
                  key={category}
                  type="monotone" 
                  dataKey={category} 
                  name={`Aspek ${category}`} 
                  stroke={COLORS[index % COLORS.length]} 
                  activeDot={{ r: 8 }} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Tabel Skor Per Tahun */}
        <div className="border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4">Tabel Skor Per Tahun</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Tahun</th>
                  <th className="py-2 px-4 text-left">Skor Total</th>
                  <th className="py-2 px-4 text-left">Kategori</th>
                  {Object.keys(aspectData).map(category => (
                    <th key={category} className="py-2 px-4 text-left">Aspek {category}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {yearlyAspectScores.map((yearData, index) => {
                  const assessment = assessments[index];
                  const healthCategory = getHealthCategory(assessment.totalScore);
                  
                  return (
                    <tr key={yearData.year} className="border-b last:border-0">
                      <td className="py-2 px-4">{yearData.year}</td>
                      <td className="py-2 px-4">{assessment.totalScore.toFixed(2)}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-white text-xs ${healthCategory.color}`}>
                          {healthCategory.category}
                        </span>
                      </td>
                      {Object.keys(aspectData).map(category => (
                        <td key={category} className="py-2 px-4">{yearData[category].toFixed(2)}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsKemendagri;
