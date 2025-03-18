
import { Value } from './types';
import { indicators } from './indicators';

// Fungsi untuk menghitung skor berdasarkan nilai dan indikator
export const calculateScore = (value: number, indicatorId: string): number => {
  switch (indicatorId) {
    // Aspek Keuangan
    case "roe":
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "rasio_operasi":
      if (value <= 0.5) return 5;
      if (value <= 0.65) return 4;
      if (value <= 0.85) return 3;
      if (value <= 1) return 2;
      return 1;
      
    case "cash_ratio":
      if (value >= 100) return 5;
      if (value >= 80) return 4;
      if (value >= 60) return 3;
      if (value >= 40) return 2;
      return 1;
      
    case "efektivitas_penagihan":
      if (value >= 90) return 5;
      if (value >= 85) return 4;
      if (value >= 80) return 3;
      if (value >= 75) return 2;
      return 1;
      
    case "solvabilitas":
      if (value >= 200) return 5;
      if (value >= 170) return 4;
      if (value >= 135) return 3;
      if (value >= 100) return 2;
      return 1;
      
    // Aspek Pelayanan
    case "cakupan_pelayanan":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "pertumbuhan_pelanggan":
      if (value >= 10) return 5;
      if (value >= 8) return 4;
      if (value >= 6) return 3;
      if (value >= 4) return 2;
      return 1;
      
    case "penyelesaian_aduan":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "kualitas_air":
      if (value >= 95) return 5;
      if (value >= 80) return 4;
      if (value >= 70) return 3;
      if (value >= 60) return 2;
      return 1;
      
    case "konsumsi_air":
      if (value >= 30) return 5;
      if (value >= 25) return 4;
      if (value >= 20) return 3;
      if (value >= 15) return 2;
      return 1;
      
    // Aspek Operasional
    case "efisiensi_produksi":
      if (value >= 90) return 5;
      if (value >= 80) return 4;
      if (value >= 70) return 3;
      if (value >= 60) return 2;
      return 1;
      
    case "tingkat_kehilangan_air":
      if (value >= 80) return 5; // Diubah karena rumus berubah dari kehilangan ke efisiensi
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "jam_operasi":
      if (value >= 21) return 5;
      if (value >= 16) return 4;
      if (value >= 12) return 3;
      if (value >= 8) return 2;
      return 1;
      
    case "tekanan_air":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "penggantian_meter":
      if (value >= 20) return 5;
      if (value >= 15) return 4;
      if (value >= 10) return 3;
      if (value >= 5) return 2;
      return 1;
      
    // Aspek SDM
    case "rasio_pegawai":
      if (value <= 6) return 5;
      if (value <= 8) return 4;
      if (value <= 10) return 3;
      if (value <= 12) return 2;
      return 1;
      
    case "rasio_diklat":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "biaya_diklat":
      if (value >= 5) return 5;
      if (value >= 4) return 4;
      if (value >= 3) return 3;
      if (value >= 2) return 2;
      return 1;
      
    default:
      return 0;
  }
};

// Fungsi untuk menghitung total skor
export const calculateTotalScore = (values: Record<string, Value>): number => {
  let totalScore = 0;
  
  indicators.forEach((indicator) => {
    const valueObj = values[indicator.id];
    if (valueObj) {
      totalScore += valueObj.score * indicator.weight;
    }
  });
  
  return totalScore;
};
