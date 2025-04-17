
// Indikator penilaian
export interface Indicator {
  id: string;
  name: string;
  category: "Keuangan" | "Pelayanan" | "Operasional" | "SDM" | "Administrasi";
  formula: string;
  weight: number;
  unit: string;
  minValue?: number;
  maxValue?: number;
}

// Nilai untuk setiap indikator
export interface Value {
  value: number;
  score: number;
}

export type AssessmentStatus = "draft" | "completed";

// Hasil penilaian
export interface Assessment {
  id: string;
  name: string;
  year: number;
  date: string;
  userId: string;
  values: Record<string, Value>;
  totalScore: number;
  status: AssessmentStatus;
}
