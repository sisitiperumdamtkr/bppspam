
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Color scheme for charts
const ASPECT_COLORS = {
  Keuangan: '#0088FE',
  Pelayanan: '#00C49F',
  Operasional: '#FFBB28',
  SDM: '#FF8042'
};

interface AspectComparisonChartProps {
  aspectData: any[];
}

const AspectComparisonChart = ({ aspectData }: AspectComparisonChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Perbandingan Aspek Penilaian</CardTitle>
        <CardDescription>
          Skor per aspek untuk setiap PDAM (data terbaru)
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={aspectData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            {Object.keys(ASPECT_COLORS).map((aspect) => (
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
  );
};

export default AspectComparisonChart;
