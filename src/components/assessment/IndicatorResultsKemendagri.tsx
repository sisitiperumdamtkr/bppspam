
import React from "react";
import { Label } from "@/components/ui/label";
import { Indicator, Value } from "@/models/types";

interface IndicatorResultsKemendagriProps {
  indicator: Indicator;
  valueObj?: Value;
}

const IndicatorResultsKemendagri = ({ 
  indicator, 
  valueObj 
}: IndicatorResultsKemendagriProps) => {
  const staticScoreIndicators = ["peningkatan_rasio_laba_aktiva", "peningkatan_ratio_laba_penjualan"];
  const isStaticScoreIndicator = staticScoreIndicators.includes(indicator.id);
  
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-4 border-t pt-4">
      <div>
        <Label>Penilaian KEMENDAGRI</Label>
        <div className="h-10 flex items-center mt-1 text-base font-medium">
          {valueObj ? valueObj.value.toFixed(2) : "-"}
        </div>
      </div>
      <div>
        <Label>Nilai</Label>
        <div className="h-10 flex items-center mt-1 text-base">
          {isStaticScoreIndicator ? "1" : (valueObj ? valueObj.score : "-")}
        </div>
      </div>
      <div>
        <Label>Hasil</Label>
        <div className="h-10 flex items-center mt-1 text-base">
          {isStaticScoreIndicator ? "1" : (valueObj ? valueObj.score.toFixed(0) : "-")}
        </div>
      </div>
    </div>
  );
};

export default IndicatorResultsKemendagri;
