
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealthCategory } from "@/models/health-categories";

interface Assessment {
  id: string;
  name: string;
  year: number;
  date: string;
  totalScore: number;
  aspectScores: Record<string, number>;
  status: string;
}

interface AssessmentDataTableProps {
  filteredAssessments: Assessment[];
}

const AssessmentDataTable = ({ filteredAssessments }: AssessmentDataTableProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Penilaian</CardTitle>
        <CardDescription>
          Daftar semua penilaian PDAM yang telah dilakukan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">PDAM</th>
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
                    <td className="p-2">{assessment.name}</td>
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
  );
};

export default AssessmentDataTable;
