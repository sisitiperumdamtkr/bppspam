
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Color scheme for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface CategoryDistributionChartProps {
  categoryDistributionData: {
    name: string;
    value: number;
  }[];
}

const CategoryDistributionChart = ({ categoryDistributionData }: CategoryDistributionChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Distribusi Kategori Penilaian</CardTitle>
        <CardDescription>
          Jumlah penilaian per kategori
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
  );
};

export default CategoryDistributionChart;
