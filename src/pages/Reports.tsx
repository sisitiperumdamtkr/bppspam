
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ReportFilters from "@/components/reports/ReportFilters";
import SummaryCards from "@/components/reports/SummaryCards";
import ChartContainer from "@/components/reports/ChartContainer";
import AssessmentDataTable from "@/components/reports/AssessmentDataTable";
import ReportActions from "@/components/reports/ReportActions";
import { getHealthCategory } from "@/models/health-categories";

// Color scheme for charts
const ASPECT_COLORS = {
  Keuangan: '#0088FE',
  Pelayanan: '#00C49F',
  Operasional: '#FFBB28',
  SDM: '#FF8042'
};

// Mock data for reports
const mockAssessments = [
  {
    id: "1",
    name: "PDAM Tirta Pakuan",
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
    name: "PDAM Tirta Raharja",
    year: 2023,
    date: "2023-06-22",
    totalScore: 2.95,
    aspectScores: {
      Keuangan: 3.1,
      Pelayanan: 2.8,
      Operasional: 3.0,
      SDM: 2.9
    },
    status: "completed",
  },
  {
    id: "3",
    name: "PDAM Tirta Pakuan",
    year: 2022,
    date: "2022-05-10",
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
    name: "PDAM Tirta Raharja",
    year: 2022,
    date: "2022-06-18",
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
    name: "PDAM Tirta Pakuan",
    year: 2021,
    date: "2021-05-20",
    totalScore: 3.25,
    aspectScores: {
      Keuangan: 3.3,
      Pelayanan: 3.2,
      Operasional: 3.3,
      SDM: 3.2
    },
    status: "completed",
  },
];

const Reports = () => {
  const [selectedPdam, setSelectedPdam] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  // Get unique PDAM names and years
  const pdamNames = Array.from(new Set(mockAssessments.map(a => a.name)));
  const years = Array.from(new Set(mockAssessments.map(a => a.year))).sort((a, b) => b - a);
  
  // Filter assessments based on selection
  const filteredAssessments = mockAssessments.filter(assessment => {
    const pdamMatch = selectedPdam === "all" || assessment.name === selectedPdam;
    const yearMatch = selectedYear === "all" || assessment.year.toString() === selectedYear;
    return pdamMatch && yearMatch;
  });
  
  // Prepare data for trend chart
  const trendData = years.map(year => {
    const yearAssessments = mockAssessments.filter(a => a.year === year);
    const avgScore = yearAssessments.length > 0 
      ? yearAssessments.reduce((sum, a) => sum + a.totalScore, 0) / yearAssessments.length
      : 0;
    
    return {
      year,
      score: parseFloat(avgScore.toFixed(2))
    };
  }).sort((a, b) => a.year - b.year); // Sort by year ascending
  
  // Prepare data for aspect comparison
  const aspectData = pdamNames.map(pdamName => {
    const latestAssessment = mockAssessments
      .filter(a => a.name === pdamName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    return {
      name: pdamName,
      ...latestAssessment?.aspectScores
    };
  });
  
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
  
  // Prepare data for radar chart
  const radarData = Object.keys(ASPECT_COLORS).map(aspect => {
    const avgScore = filteredAssessments.length > 0
      ? filteredAssessments.reduce((sum, a) => sum + (a.aspectScores[aspect as keyof typeof a.aspectScores] || 0), 0) / filteredAssessments.length
      : 0;
    
    return {
      aspect,
      score: parseFloat(avgScore.toFixed(2))
    };
  });
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <DashboardLayout title="Laporan">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Laporan Penilaian PDAM</h1>
          <ReportActions onPrint={handlePrint} />
        </div>
        
        {/* Filter controls */}
        <ReportFilters 
          selectedPdam={selectedPdam}
          setSelectedPdam={setSelectedPdam}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          pdamNames={pdamNames}
          years={years}
        />
        
        {/* Summary cards */}
        <SummaryCards filteredAssessments={filteredAssessments} />
        
        {/* Charts */}
        <ChartContainer 
          trendData={trendData}
          aspectData={aspectData}
          categoryDistributionData={categoryDistributionData}
          radarData={radarData}
        />
        
        {/* Data Table */}
        <AssessmentDataTable filteredAssessments={filteredAssessments} />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
