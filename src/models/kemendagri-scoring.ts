
import { Indicator, Value } from "./types";
import { kemendagriIndicators } from "./kemendagri-indicators";

/**
 * Menghitung skor berdasarkan nilai indikator
 * @param value Nilai indikator
 * @param indicatorId ID indikator
 * @returns Skor yang dihitung
 */
export const calculateKemendagriScore = (value: number, indicatorId: string): number => {
  if (value <= 0) return 1;
  if (value > 0 && value <= 3) return 2;
  if (value > 3 && value <= 7) return 3;
  if (value > 7 && value <= 10) return 4;
  if (value > 10) return 5;
  
  return 0;
};

/**
 * Menghitung total skor dari semua indikator
 * @param values Object berisi nilai dan skor untuk setiap indikator
 * @returns Total skor tertimbang
 */
export const calculateKemendagriTotalScore = (values: Record<string, Value>): number => {
  let totalScore = 0;
  let totalIndicators = 0;
  
  kemendagriIndicators.forEach((indicator) => {
    const valueObj = values[indicator.id];
    if (valueObj) {
      totalScore += valueObj.score;
      totalIndicators++;
    }
  });
  
  return totalIndicators > 0 ? totalScore / totalIndicators : 0;
};
