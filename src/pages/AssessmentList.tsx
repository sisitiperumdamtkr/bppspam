
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { getHealthCategory } from "@/models/health-categories";

// Mock assessment data - in a real app this would come from an API
// Updated to show only PERUMDAM TIRTA KERTA RAHARJA assessments over different years
const mockAssessments = [
  {
    id: "1",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2023,
    date: "2023-05-15",
    totalScore: 3.75,
    status: "completed",
  },
  {
    id: "2",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2022,
    date: "2022-06-22",
    totalScore: 2.95,
    status: "completed",
  },
  {
    id: "3",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2021,
    date: "2021-05-10",
    totalScore: 3.45,
    status: "completed",
  },
  {
    id: "4",
    name: "PERUMDAM TIRTA KERTA RAHARJA",
    year: 2020,
    date: "2020-06-18",
    totalScore: 2.75,
    status: "completed",
  },
];

const AssessmentList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCreateNew = () => {
    navigate("/assessment/new");
  };
  
  const handleViewAssessment = (id: string) => {
    navigate(`/assessment/${id}`);
  };

  return (
    <DashboardLayout title="Penilaian PERUMDAM">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Penilaian PERUMDAM TIRTA KERTA RAHARJA</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Buat Penilaian Baru
        </Button>
      </div>
      
      {mockAssessments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">Belum ada penilaian yang dibuat</p>
          <Button onClick={handleCreateNew} variant="outline">
            Buat Penilaian Pertama
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockAssessments.map((assessment) => {
            const healthCategory = getHealthCategory(assessment.totalScore);
                  
            return (
              <div 
                key={assessment.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewAssessment(assessment.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Tahun {assessment.year}</h3>
                  <div className={`${healthCategory.color} text-white text-xs px-2 py-1 rounded-full`}>
                    {healthCategory.category}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Tanggal: {new Date(assessment.date).toLocaleDateString('id-ID')}
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">
                    Skor: {assessment.totalScore.toFixed(2)}
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    Lihat
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AssessmentList;
