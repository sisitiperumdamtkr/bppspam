
import React from "react";
import { getHealthCategory } from "@/models/health-categories";

interface ScoreSummaryProps {
  totalScore: number;
}

const ScoreSummary = ({ totalScore }: ScoreSummaryProps) => {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Skor:</h2>
        <div className="text-2xl font-bold">{totalScore.toFixed(3)}</div>
      </div>
      {totalScore > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Kategori:</h3>
            <div className={`${getHealthCategory(totalScore).color} text-white px-3 py-1 rounded-md`}>
              {getHealthCategory(totalScore).category}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreSummary;
