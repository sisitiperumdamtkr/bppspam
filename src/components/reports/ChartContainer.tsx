
import React from "react";
import TrendChart from "./TrendChart";
import AspectComparisonChart from "./AspectComparisonChart";
import CategoryDistributionChart from "./CategoryDistributionChart";
import RadarPerformanceChart from "./RadarPerformanceChart";

interface ChartContainerProps {
  trendData: {
    year: number;
    score: number;
  }[];
  aspectData: any[];
  categoryDistributionData: {
    name: string;
    value: number;
  }[];
  radarData: {
    aspect: string;
    score: number;
  }[];
}

const ChartContainer = ({
  trendData,
  aspectData,
  categoryDistributionData,
  radarData
}: ChartContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrendChart trendData={trendData} />
      <AspectComparisonChart aspectData={aspectData} />
      <CategoryDistributionChart categoryDistributionData={categoryDistributionData} />
      <RadarPerformanceChart radarData={radarData} />
    </div>
  );
};

export default ChartContainer;
