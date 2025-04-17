
import React from "react";
import { Indicator, Value } from "@/models/types";

interface IndicatorResultsProps {
  indicator: Indicator;
  valueObj?: Value;
}

const IndicatorResults = ({ indicator, valueObj }: IndicatorResultsProps) => {
  return (
    <div className="mt-4 border-t pt-4">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h4 className="font-medium mb-2">Penilaian</h4>
          <p className="text-lg">{valueObj?.value !== undefined ? valueObj.value.toFixed(2) : "-"}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Bobot</h4>
          <p className="text-lg">{indicator.weight.toFixed(3)}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Nilai</h4>
          <p className="text-lg">{valueObj?.score !== undefined ? valueObj.score.toFixed(2) : "-"}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Hasil</h4>
          <p className="text-lg">
            {valueObj ? (valueObj.score * indicator.weight).toFixed(3) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndicatorResults;
