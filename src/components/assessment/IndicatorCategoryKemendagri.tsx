
import React, { useMemo } from "react";
import { Indicator, Value } from "@/models/types";
import FormulaInputsKemendagri from "./FormulaInputsKemendagri";
import IndicatorResultsKemendagri from "./IndicatorResultsKemendagri";
import { calculateKemendagriAspectScore } from "@/utils/kemendagriFormulaUtils";

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
  
  // Hitung total skor untuk kategori ini
  const categoryTotalScore = useMemo(() => {
    return calculateKemendagriAspectScore(values, category);
  }, [category, values]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4">Aspek {category}</h2>
        <div className="text-sm font-medium">
          Total Aspek: {categoryTotalScore.toFixed(3)}
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
