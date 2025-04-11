
import React from "react";
import { Label } from "@/components/ui/label";
import { Indicator, Value } from "@/models/types";

interface IndicatorResultsProps {
  indicator: Indicator;
  valueObj?: Value;
}

const IndicatorResults = ({ 
  indicator, 
  valueObj 
}: IndicatorResultsProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mt-4 border-t pt-4">
      <div>
        <Label>Nilai</Label>
        <div className="h-10 flex items-center mt-1 text-base font-medium">
          {valueObj ? valueObj.value.toFixed(2) : "-"}
        </div>
      </div>
      <div>
        <Label>Bobot</Label>
        <div className="h-10 flex items-center mt-1 text-base">
          {indicator.weight.toFixed(3)}
        </div>
      </div>
      <div>
        <Label>Skor (1-5)</Label>
        <div className="h-10 flex items-center mt-1 text-base">
          {valueObj ? valueObj.score : "-"}
        </div>
      </div>
      <div>
        <Label>Hasil</Label>
        <div className="h-10 flex items-center mt-1 text-base font-medium">
          {valueObj 
            ? (valueObj.score * indicator.weight).toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
};

export default IndicatorResults;
