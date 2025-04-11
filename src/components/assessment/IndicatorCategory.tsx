
import React from "react";
import { Indicator, Value } from "@/models/types";
import FormulaInputs from "./FormulaInputs";
import IndicatorResults from "./IndicatorResults";

interface IndicatorCategoryProps {
  category: string;
  indicators: Indicator[];
  values: Record<string, Value>;
  formulaInputs: Record<string, Record<string, number>>;
  onFormulaInputChange: (indicatorId: string, inputName: string, value: number) => void;
}

const IndicatorCategory = ({
  category,
  indicators,
  values,
  formulaInputs,
  onFormulaInputChange
}: IndicatorCategoryProps) => {
  // Menghitung total skor untuk kategori
  const categoryTotalScore = indicators.reduce((total, indicator) => {
    const valueObj = values[indicator.id];
    if (valueObj) {
      return total + (valueObj.score * indicator.weight);
    }
    return total;
  }, 0);

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-lg font-semibold">Aspek {category}</h2>
        {categoryTotalScore > 0 && (
          <div className="mt-2 md:mt-0 text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
            Total Skor Aspek: {categoryTotalScore.toFixed(3)}
          </div>
        )}
      </div>
      
      <div className="space-y-6 mt-4">
        {indicators.map((indicator) => {
          const valueObj = values[indicator.id];
          
          return (
            <div key={indicator.id} className="border p-4 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h3 className="font-medium text-base md:w-1/3">{indicator.name}</h3>
                <div className="text-sm text-muted-foreground md:w-2/3">
                  Formula: {indicator.formula}
                </div>
              </div>
              
              <FormulaInputs 
                indicatorId={indicator.id}
                formulaInputs={formulaInputs}
                onInputChange={onFormulaInputChange}
              />
              
              <IndicatorResults 
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

export default IndicatorCategory;
