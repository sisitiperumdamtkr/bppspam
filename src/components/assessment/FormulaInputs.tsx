
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getFormulaInputs } from "@/utils/formulaUtils";

interface FormulaInputsProps {
  indicatorId: string;
  formulaInputs: Record<string, Record<string, number>>;
  onInputChange: (indicatorId: string, inputName: string, value: number) => void;
}

const FormulaInputs = ({ 
  indicatorId, 
  formulaInputs,
  onInputChange 
}: FormulaInputsProps) => {
  const inputs = getFormulaInputs(indicatorId);
  
  if (inputs.length === 0) {
    return (
      <div className="mt-4 border-t pt-4">
        <h4 className="font-medium mb-2">Input Komponen Formula:</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground italic">Input manual tidak diperlukan. Nilai akan dihitung otomatis berdasarkan rumus.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium mb-2">Input Komponen Formula:</h4>
      <div className="grid md:grid-cols-2 gap-4">
        {inputs.map((input) => (
          <div key={input.name}>
            <Label htmlFor={`${indicatorId}-${input.name}`}>
              {input.label}
            </Label>
            <Input
              id={`${indicatorId}-${input.name}`}
              type="number"
              value={formulaInputs[indicatorId]?.[input.name] || ""}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                onInputChange(
                  indicatorId, 
                  input.name, 
                  isNaN(value) ? 0 : value
                );
              }}
              placeholder={`Masukkan ${input.label.toLowerCase()}`}
              className="mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormulaInputs;
