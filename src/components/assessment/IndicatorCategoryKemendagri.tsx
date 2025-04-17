
import React, { useMemo } from "react";
import { Indicator, Value } from "@/models/types";
import FormulaInputsKemendagri from "./FormulaInputsKemendagri";
import IndicatorResultsKemendagri from "./IndicatorResultsKemendagri";

interface IndicatorCategoryKemendagriProps {
  category: string;
  indicators: Indicator[];
  values: Record<string, Value>;
  formulaInputs: Record<string, Record<string, number>>;
  onFormulaInputChange: (indicatorId: string, inputName: string, value: number) => void;
}

const IndicatorCategoryKemendagri = ({
  category,
  indicators,
  values,
  formulaInputs,
  onFormulaInputChange
}: IndicatorCategoryKemendagriProps) => {
  
  // Hitung total nilai tertimbang untuk kategori ini
  const categoryTotalScore = useMemo(() => {
    return indicators.reduce((total, indicator) => {
      const valueObj = values[indicator.id];
      if (valueObj) {
        return total + valueObj.score;
      }
      return total;
    }, 0);
  }, [indicators, values]);

  // Perhitungan khusus untuk Aspek Keuangan, Operasional, dan Administrasi
  const displayScore = useMemo(() => {
    if (category === "Keuangan") {
      const maxPossibleScore = indicators.length * 60;
      if (maxPossibleScore === 0) return 0;
      const weightedScore = categoryTotalScore / maxPossibleScore * 0.45;
      return weightedScore.toFixed(3);
    } else if (category === "Operasional") {
      const maxPossibleScore = indicators.length * 47;
      if (maxPossibleScore === 0) return 0;
      const weightedScore = categoryTotalScore / maxPossibleScore * 0.40;
      return weightedScore.toFixed(3);
    } else if (category === "Administrasi") {
      const maxPossibleScore = indicators.length * 36;
      if (maxPossibleScore === 0) return 0;
      const weightedScore = categoryTotalScore / maxPossibleScore * 0.15;
      return weightedScore.toFixed(3);
    }
    return categoryTotalScore.toFixed(3);
  }, [category, categoryTotalScore, indicators.length]);

  // Title dinamis berdasarkan kategori
  const categoryTitle = useMemo(() => {
    if (category === "Keuangan") {
      return "Nilai kinerja Aspek keuangan";
    } else if (category === "Operasional") {
      return "Nilai kinerja Aspek Operasional";
    } else if (category === "Administrasi") {
      return "Nilai kinerja Aspek Administrasi";
    }
    return "Total Aspek";
  }, [category]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4">Aspek {category}</h2>
        <div className="text-sm font-medium">
          {categoryTitle}: {displayScore}
        </div>
      </div>
      
      <div className="space-y-6">
        {indicators.map((indicator) => {
          const valueObj = values[indicator.id];
          
          return (
            <div key={indicator.id} className="border p-4 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h3 className="font-medium text-base md:w-1/3">{indicator.name}</h3>
                <div className="text-sm text-muted-foreground md:w-2/3">
                  Formula KEMENDAGRI: {indicator.formula}
                </div>
              </div>
              
              <FormulaInputsKemendagri 
                indicatorId={indicator.id}
                formulaInputs={formulaInputs}
                onInputChange={onFormulaInputChange}
              />
              
              <IndicatorResultsKemendagri 
                indicator={indicator}
                valueObj={valueObj}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndicatorCategoryKemendagri;
