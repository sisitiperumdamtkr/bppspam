
import { Value } from './types';
import { indicators } from './indicators';

// Fungsi untuk menghitung skor berdasarkan nilai dan indikator
export const calculateScore = (value: number, indicatorId: string): number => {
  switch (indicatorId) {
    // Aspek Keuangan
    case "roe":
      if (value < 0) return 1;
      if (value < 3) return 2;
      if (value < 7) return 3;
      if (value < 10) return 4;
      return 5;
      
    case "rasio_operasi":
      if (value > 1.0) return 1;
      if (value > 0.85) return 2;
      if (value > 0.68) return 3;
      if (value > 0.5) return 4;
      return 5;
      
    case "cash_ratio":
      if (value < 0.3) return 1;
      if (value < 0.6) return 2;
      if (value < 0.9) return 3;
      if (value < 1.2) return 4;
      return 5;
      
    case "efektivitas_penagihan":
      if (value < 75) return 1;
      if (value < 80) return 2;
      if (value < 85) return 3;
      if (value < 90) return 4;
      return 5;
      
    case "solvabilitas":
      if (value < 1) return 1;
      if (value < 1.7) return 2;
      if (value < 2.3) return 3;
      if (value < 3) return 4;
      return 5;
      
    // Aspek Pelayanan
    case "cakupan_pelayanan":
      if (value < 20) return 1;
      if (value < 40) return 2;
      if (value < 60) return 3;
      if (value < 80) return 4;
      return 5;
      
    case "pertumbuhan_pelanggan":
      if (value < 2) return 1;
      if (value < 4) return 2;
      if (value < 6) return 3;
      if (value < 10) return 4;
      return 5;
      
    case "penyelesaian_aduan":
      if (value < 60) return 1;
      if (value < 75) return 2;
      if (value < 85) return 3;
      if (value < 95) return 4;
      return 5;
      
    case "kualitas_air":
      if (value < 80) return 1;
      if (value < 90) return 2;
      if (value < 95) return 3;
      if (value < 99) return 4;
      return 5;
      
    case "konsumsi_air":
      if (value < 10) return 1;
      if (value < 15) return 2;
      if (value < 20) return 3;
      if (value < 30) return 4;
      return 5;
      
    // Aspek Operasional
    case "efisiensi_produksi":
      if (value < 60) return 1;
      if (value < 70) return 2;
      if (value < 80) return 3;
      if (value < 90) return 4;
      return 5;
      
    case "tingkat_kehilangan_air":
      // Lower is better
      if (value > 40) return 1;
      if (value > 30) return 2;
      if (value > 20) return 3;
      if (value > 10) return 4;
      return 5;
      
    case "jam_operasi":
      if (value < 12) return 1;
      if (value < 16) return 2;
      if (value < 20) return 3;
      if (value < 23) return 4;
      return 5;
      
    case "tekanan_air":
      if (value < 20) return 1;
      if (value < 40) return 2;
      if (value < 60) return 3;
      if (value < 80) return 4;
      return 5;
      
    case "penggantian_meter":
      if (value < 5) return 1;
      if (value < 10) return 2;
      if (value < 15) return 3;
      if (value < 20) return 4;
      return 5;
      
    // Aspek SDM
    case "rasio_pegawai":
      // Lower is better
      if (value > 10) return 1;
      if (value > 8) return 2;
      if (value > 6) return 3;
      if (value > 4) return 4;
      return 5;
      
    case "rasio_diklat":
      if (value < 10) return 1;
      if (value < 20) return 2;
      if (value < 30) return 3;
      if (value < 40) return 4;
      return 5;
      
    case "biaya_diklat":
      if (value < 2) return 1;
      if (value < 4) return 2;
      if (value < 6) return 3;
      if (value < 8) return 4;
      return 5;
      
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
