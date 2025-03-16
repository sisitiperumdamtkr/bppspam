
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { getHealthCategory } from "@/models/health-categories";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";

const AssessmentList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch assessments from Supabase
    const fetchAssessments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .order('year', { ascending: false });
        
        if (error) {
          console.error('Error fetching assessments:', error);
          return;
        }
        
        setAssessments(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessments();
  }, [user]);
  
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
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      ) : assessments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">Belum ada penilaian yang dibuat</p>
          <Button onClick={handleCreateNew} variant="outline">
            Buat Penilaian Pertama
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map((assessment) => {
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
