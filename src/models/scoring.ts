
import { Value } from './types';
import { indicators } from './indicators';

// Fungsi untuk menghitung skor berdasarkan nilai dan indikator
export const calculateScore = (value: number, indicatorId: string): number => {
  // Implementasi rumus-rumus penilaian berdasarkan kriteria:
  switch (indicatorId) {
    // Aspek Keuangan
    case "roe":
      // ROE = Laba (Rugi) Bersih setelah Pajak / Jumlah Ekuitas * 100 %
      // Nilai = IF(ROE>=10;5;IF(ROE>=7;4;IF(ROE>=3;3;IF(ROE>=0;2;IF(ROE<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "rasio_operasi":
      // Rasio Operasi = Biaya Operasi / Pendapatan Operasi
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "cash_ratio":
      // Cash Ratio = Kas+Setara Kas / Utang Lancar * 100 %
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "efektivitas_penagihan":
      // Efektifitas Penagihan = Jumlah Penerimaan Rek Air / Jumah Rekening Air * 100 %
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "solvabilitas":
      // Solvabilitas = Total Aktiva / Total Utang * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    // Aspek Pelayanan
    case "cakupan_pelayanan":
      // Cakupan Pelayanan Teknis = Jumlah Penduduk Terlayani / Jumlah Penduduk * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "pertumbuhan_pelanggan":
      // Pertumbuhan Pelanggan = (Jmh Pelanggan thn ini - pelanggan thn lalu) / pelanggan tahun lalu * 100 %
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "penyelesaian_aduan":
      // Tingkat Penyelesaian Aduan = Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan *100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "kualitas_air":
      // Kualitas Air Pelanggan = JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "konsumsi_air":
      // Konsumsi Air Domestik = (Jmh Air Yang Terjual Domestik Setahun/12) / Jumlah Pelanggan Domestik
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    // Aspek Operasional
    case "efisiensi_produksi":
      // Efisiensi Produksi = Volume Produksi Riil (m3) / Kapasitas terpasang (m3) * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "tingkat_kehilangan_air":
      // Tingkat Kehilangan Air = Distribusi Air - Air Terjual / Distribusi Air * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "jam_operasi":
      // Jam Operasi Layanan = Waktu Distribusi Air Ke pelggan 1 thn / 365
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "tekanan_air":
      // Tekanan Air Samb Pelanggan = Jmh Pelanggan dilayani dgn tekanan diatas 0,7Bar / Jumlah Pelanggan * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "penggantian_meter":
      // Penggantian Meter Air = Jumlah Meter Yg diganti atau dikalibrasi tahun ybs / Jumlah Pelanggan * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    // Aspek SDM
    case "rasio_pegawai":
      // Rasio Jmh Pegawai per 1000 pelanggan = Jumlah Pegawai / Jumlah Pelanggan * 1000
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "rasio_diklat":
      // Ratio Diklat Pegawai atau Peningkatan Kompetensi = Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai *100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "biaya_diklat":
      // Biaya Diklat Terhadap Biaya = Biaya Diklat / Pegawai Biaya Pegawai * 100%
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
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
