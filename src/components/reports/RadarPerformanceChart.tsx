
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface RadarPerformanceChartProps {
  radarData: {
    aspect: string;
    score: number;
  }[];
}

const RadarPerformanceChart = ({ radarData }: RadarPerformanceChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Profil Kinerja PDAM</CardTitle>
        <CardDescription>
          Skor rata-rata untuk setiap aspek penilaian
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="aspect" />
            <PolarRadiusAxis domain={[0, 5]} />
            <Radar
              name="Skor Rata-rata"
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
  );
};

export default RadarPerformanceChart;
