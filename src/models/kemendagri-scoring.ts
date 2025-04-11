
import { Indicator, Value } from "./types";
import { kemendagriIndicators } from "./kemendagri-indicators";
import { calculateKemendagriAspectScore } from "@/utils/kemendagriFormulaUtils";

/**
 * Menghitung skor berdasarkan nilai indikator
 * @param value Nilai indikator
 * @param indicatorId ID indikator
 * @returns Skor yang dihitung
 */
export const calculateKemendagriScore = (value: number, indicatorId: string): number => {
  // Kategori: "Keuangan", "Operasional", atau "Administrasi"
  const indicator = kemendagriIndicators.find(ind => ind.id === indicatorId);
  const category = indicator?.category;

  // Jika indikator menggunakan nilai radio button, gunakan nilai itu langsung
  if (["kualitas_air_distribusi", "kontinuitas_air", "kecepatan_penyambungan", 
       "rencana_jangka_panjang", "rencana_organisasi", "prosedur_operasi", 
       "gambar_nyata_laksana", "pedoman_penilaian_kinerja", "rencana_kerja"].includes(indicatorId)) {
    // Untuk indikator administratif, nilai input langsung menjadi skor
    return value;
  }

  // Penilaian berdasarkan kategori dan rentang nilai
  switch (category) {
    case "Keuangan":
      // Rasio Laba Terhadap Aktiva Produktif
      if (indicatorId === "rasio_laba_terhadap_aktiva_produktif") {
        if (value > 10) return 5;
        if (value > 7) return 4;
        if (value > 3) return 3;
        if (value > 0) return 2;
        return 1;
      }
      
      // Peningkatan Rasio Laba Terhadap Aktiva
      if (indicatorId === "peningkatan_rasio_laba_terhadap_aktiva") {
        if (value > 2) return 5;
        if (value > 1) return 4;
        if (value > 0) return 3;
        if (value > -1) return 2;
        return 1;
      }
      
      // Rasio Laba Terhadap Penjualan
      if (indicatorId === "rasio_laba_terhadap_penjualan") {
        if (value > 20) return 5;
        if (value > 14) return 4;
        if (value > 6) return 3;
        if (value > 0) return 2;
        return 1;
      }
      
      // Peningkatan Rasio Laba Terhadap Penjualan
      if (indicatorId === "peningkatan_rasio_laba_terhadap_penjualan") {
        if (value > 2) return 5;
        if (value > 1) return 4;
        if (value > 0) return 3;
        if (value > -1) return 2;
        return 1;
      }
      
      // Rasio Aktiva Lancar
      if (indicatorId === "rasio_aktiva_lancar") {
        if (value > 2) return 5;
        if (value > 1.5) return 4;
        if (value > 1) return 3;
        if (value > 0.5) return 2;
        return 1;
      }
      
      // Rasio Utang Jangka Panjang
      if (indicatorId === "rasio_utang_jangka_panjang") {
        if (value < 0.5) return 5;
        if (value < 0.7) return 4;
        if (value < 0.8) return 3;
        if (value < 1) return 2;
        return 1;
      }
      
      // Rasio Total Aktiva Terhadap Utang
      if (indicatorId === "rasio_total_aktiva") {
        if (value > 2) return 5;
        if (value > 1.7) return 4;
        if (value > 1.3) return 3;
        if (value > 1) return 2;
        return 1;
      }
      
      // Rasio Biaya Operasi
      if (indicatorId === "rasio_biaya_operasi") {
        if (value < 0.5) return 5;
        if (value < 0.65) return 4;
        if (value < 0.85) return 3;
        if (value < 1) return 2;
        return 1;
      }
      
      // Rasio Laba Operasi
      if (indicatorId === "rasio_laba_operasi") {
        if (value > 2) return 5;
        if (value > 1.7) return 4;
        if (value > 1.3) return 3;
        if (value > 1) return 2;
        return 1;
      }
      
      // Rasio Aktiva Produktif
      if (indicatorId === "rasio_aktiva_produktif") {
        if (value < 2) return 5;
        if (value < 4) return 4;
        if (value < 6) return 3;
        if (value < 8) return 2;
        return 1;
      }
      
      // Jangka Waktu Penagihan
      if (indicatorId === "jangka_waktu_penagihan") {
        if (value < 30) return 5;
        if (value < 60) return 4;
        if (value < 90) return 3;
        if (value < 120) return 2;
        return 1;
      }
      
      // Efektivitas Penagihan
      if (indicatorId === "efektivitas_penagihan") {
        if (value > 90) return 5;
        if (value > 85) return 4;
        if (value > 80) return 3;
        if (value > 75) return 2;
        return 1;
      }
      
      break;
      
    case "Operasional":
      // Cakupan Pelayanan
      if (indicatorId === "cakupan_pelayanan") {
        if (value > 80) return 5;
        if (value > 60) return 4;
        if (value > 40) return 3;
        if (value > 20) return 2;
        return 1;
      }
      
      // Peningkatan Cakupan Pelayanan
      if (indicatorId === "peningkatan_cakupan_pelayanan") {
        if (value > 10) return 5;
        if (value > 7) return 4;
        if (value > 5) return 3;
        if (value > 2) return 2;
        return 1;
      }
      
      // Produktivitas Pemanfaatan Instalasi
      if (indicatorId === "produktivitas_pemanfaatan") {
        if (value > 90) return 5;
        if (value > 80) return 4;
        if (value > 70) return 3;
        if (value > 60) return 2;
        return 1;
      }
      
      // Tingkat Kehilangan Air
      if (indicatorId === "tingkat_kehilangan_air") {
        if (value < 20) return 5;
        if (value < 30) return 4;
        if (value < 40) return 3;
        if (value < 50) return 2;
        return 1;
      }
      
      // Penurunan Kehilangan Air
      if (indicatorId === "penurunan_kehilangan_air") {
        if (value < -5) return 5;
        if (value < -3) return 4;
        if (value < 0) return 3;
        if (value < 3) return 2;
        return 1;
      }
      
      // Peneraan Meter
      if (indicatorId === "peneraan_meter") {
        if (value > 20) return 5;
        if (value > 15) return 4;
        if (value > 10) return 3;
        if (value > 5) return 2;
        return 1;
      }
      
      break;
  }
  
  // Default return jika tidak ada kondisi spesifik
  return 1;
};

/**
 * Menghitung total skor dari semua indikator
 * @param values Object berisi nilai dan skor untuk setiap indikator
 * @returns Total skor tertimbang
 */
export const calculateKemendagriTotalScore = (values: Record<string, Value>): number => {
  // Menghitung skor untuk setiap aspek
  const keuanganScore = calculateKemendagriAspectScore(values, "Keuangan");
  const operasionalScore = calculateKemendagriAspectScore(values, "Operasional");
  const administrasiScore = calculateKemendagriAspectScore(values, "Administrasi");
  
  // Total skor dari semua aspek
  const totalScore = keuanganScore + operasionalScore + administrasiScore;
  
  return totalScore;
};
