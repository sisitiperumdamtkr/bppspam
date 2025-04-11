
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getKemendagriFormulaInputs } from "@/utils/kemendagriFormulaUtils";

interface FormulaInputsKemendagriProps {
  indicatorId: string;
  formulaInputs: Record<string, Record<string, number>>;
  onInputChange: (indicatorId: string, inputName: string, value: number) => void;
}

const FormulaInputsKemendagri = ({ 
  indicatorId, 
  formulaInputs,
  onInputChange 
}: FormulaInputsKemendagriProps) => {
  const inputs = getKemendagriFormulaInputs(indicatorId);
  
  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium mb-2">Input Komponen Formula KEMENDAGRI:</h4>
      <div className="grid md:grid-cols-2 gap-4">
        {inputs.map((input) => {
          if (input.type === "radio" && input.options) {
            return (
              <div key={input.name} className="space-y-2">
                <Label>{input.label}</Label>
                <RadioGroup
                  value={formulaInputs[indicatorId]?.[input.name]?.toString() || ""}
                  onValueChange={(value) => {
                    onInputChange(
                      indicatorId,
                      input.name,
                      parseInt(value, 10)
                    );
                  }}
                  className="flex flex-col space-y-1 mt-2"
                >
                  {input.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        id={`${indicatorId}-${input.name}-${option.value}`} 
                        value={option.value.toString()} 
                      />
                      <Label htmlFor={`${indicatorId}-${input.name}-${option.value}`} className="font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            );
          }
          
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default FormulaInputsKemendagri;
