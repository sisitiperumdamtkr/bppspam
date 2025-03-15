
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Assessment {
  id: string;
  name: string;
  year: number;
  date: string;
  totalScore: number;
  aspectScores: Record<string, number>;
  status: string;
}

interface SummaryCardsProps {
  filteredAssessments: Assessment[];
}

const SummaryCards = ({ filteredAssessments }: SummaryCardsProps) => {
  const calculateAverage = () => {
    if (filteredAssessments.length === 0) return "-";
    const average = filteredAssessments.reduce((sum, a) => sum + a.totalScore, 0) / filteredAssessments.length;
    return average.toFixed(2);
  };

  const getHighestScore = () => {
    if (filteredAssessments.length === 0) return "-";
    return Math.max(...filteredAssessments.map(a => a.totalScore)).toFixed(2);
  };

  const getLowestScore = () => {
    if (filteredAssessments.length === 0) return "-";
    return Math.min(...filteredAssessments.map(a => a.totalScore)).toFixed(2);
  };

  return (
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
          <div className="text-2xl font-bold">{calculateAverage()}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Skor Tertinggi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getHighestScore()}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Skor Terendah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getLowestScore()}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
