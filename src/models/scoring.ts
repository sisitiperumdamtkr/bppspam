
import { Value } from './types';
import { indicators } from './indicators';

// Fungsi untuk menghitung skor berdasarkan nilai dan indikator sesuai BPPSPAM
export const calculateScore = (value: number, indicatorId: string): number => {
  // Menerapkan rumus yang ada di petunjuk pengguna
  switch (indicatorId) {
    // Aspek Keuangan
    case "ROE":
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 1) return 2;
      if (value <= 0) return 1;
      
    case "RasioOperasi":
      if (value <= 0.5) return 5;
      if (value <= 0.65) return 4;
      if (value <= 0.85) return 3;
      if (value >= 1) return 2;
      if (value <= 1) return 1;
      
    case "CashRatio":
      if (value >= 100) return 5;
      if (value >= 80) return 4;
      if (value >= 60) return 3;
      if (value >= 40) return 2;
      return 1;
      
    case "EfektifitasPenagihan":
      if (value >= 90) return 5;
      if (value >= 85) return 4;
      if (value >= 80) return 3;
      if (value >= 75) return 2;
      return 1;
      
    case "Solvabilitas":
      if (value >= 200) return 5;
      if (value >= 170) return 4;
      if (value >= 135) return 3;
      if (value >= 100) return 2;
      return 1;
      
    // Aspek Pelayanan
    case "CakupanPelayananTeknis":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "PertumbuhanPelanggan":
      if (value >= 10) return 5;
      if (value >= 8) return 4;
      if (value >= 6) return 3;
      if (value >= 4) return 2;
      return 1;
      
    case "TingkatPenyelesaianAduan":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "KualitasAirPelanggan":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "KonsumsiAirDomestik":
      if (value >= 30) return 5;
      if (value >= 25) return 4;
      if (value >= 20) return 3;
      if (value >= 15) return 2;
      return 1;
      
    // Aspek Operasional
    case "EfisiensiProduksi":
      if (value >= 90) return 5;
      if (value >= 80) return 4;
      if (value >= 70) return 3;
      if (value >= 60) return 2;
      return 1;
      
    case "TingkatKehilanganAir":
      if (value <= 25) return 5;
      if (value <= 30) return 4;
      if (value <= 35) return 3;
      if (value <= 40) return 2;
      return 1;
      
    case "JamOperasiLayanan":
      if (value <= 25) return 5;
      if (value <= 30) return 4;
      if (value <= 35) return 3;
      if (value >= 40) return 2;
      return 1;
      
    case "TekananAirSambPelanggan":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "PenggantianMeterAir":
      if (value >= 20) return 5;
      if (value >= 15) return 4;
      if (value >= 10) return 3;
      if (value >= 5) return 2;
      return 1;
      
    // Aspek SDM
    case "RasioJumlahPegawai":
      if (value <= 6) return 5;
      if (value <= 8) return 4;
      if (value <= 10) return 3;
      if (value <= 12) return 2;
      return 1;
      
    case "RatioDiklatPegawai":
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "BiayaDiklatTerhadapBiaya":
      if (value >= 5) return 5;
      if (value >= 4) return 4;
      if (value >= 3) return 3;
      if (value >= 2) return 2;
      return 1;
      
    default:
      return 0;
  }
};

// Fungsi untuk menghitung total skor berdasarkan rumus yang diminta
export const calculateTotalScore = (values: Record<string, Value>): number => {
  // Hitung skor total berdasarkan bobot indikator
  let totalScore = 0;
  
  // Iterasi melalui semua indikator
  for (const indicator of indicators) {
    const valueObj = values[indicator.id];
    if (valueObj) {
      // Tambahkan hasil (skor * bobot) ke total
      totalScore += valueObj.score * indicator.weight;
    }
  }
  
  return totalScore;
};
