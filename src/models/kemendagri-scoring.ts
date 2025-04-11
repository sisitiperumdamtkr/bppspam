
import { Indicator, Value } from "./types";
import { kemendagriIndicators } from "./kemendagri-indicators";

/**
 * Menghitung skor berdasarkan nilai indikator
 * @param value Nilai indikator
 * @param indicatorId ID indikator
 * @returns Skor yang dihitung
 */
export const calculateKemendagriScore = (value: number, indicatorId: string): number => {
  if (value < 30) return 1;
  if (value >= 30 && value < 45) return 2;
  if (value >= 45 && value < 60) return 3;
  if (value >= 60 && value < 75) return 4;
  if (value >= 75) return 5;
  
  return 0;
};

/**
 * Menghitung total skor dari semua indikator
 * @param values Object berisi nilai dan skor untuk setiap indikator
 * @returns Total skor tertimbang
 */
export const calculateKemendagriTotalScore = (values: Record<string, Value>): number => {
  let totalScore = 0;
  
  kemendagriIndicators.forEach((indicator) => {
    const valueObj = values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      totalScore += weightedScore;
    }
  });
  
  return totalScore;
};
