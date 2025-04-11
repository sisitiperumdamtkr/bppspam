
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
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Aspek {category}</h2>
      <div className="space-y-6">
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
