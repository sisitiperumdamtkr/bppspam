
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
  
  // Hitung total nilai hasil untuk kategori ini 
  // (jumlah dari semua nilai hasil indikator)
  const categoryTotalScore = useMemo(() => {
    return indicators.reduce((total, indicator) => {
      const valueObj = values[indicator.id];
      if (valueObj) {
        return total + valueObj.score;
      }
      return total;
    }, 0);
  }, [indicators, values]);

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

  // Menampilkan total skor aspek (nilai hasil)
  const displayScore = useMemo(() => {
    return categoryTotalScore.toFixed(0);
  }, [categoryTotalScore]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-between items-center">
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
                <div className="text-sm text-muted-foreground md:w-2/3 break-words">
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
