
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
      // Nilai = IF(Rasio Operasi>=10;5;IF(Rasio Operasi>=7;4;IF(Rasio Operasi>=3;3;IF(Rasio Operasi>=0;2;IF(Rasio Operasi<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "cash_ratio":
      // Cash Ratio = Kas+Setara Kas / Utang Lancar *	100 %
      // Nilai = IF(Cash Ratio>=10;5;IF(Cash Ratio>=7;4;IF(Cash Ratio>=3;3;IF(Cash Ratio>=0;2;IF(Cash Ratio<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "efektivitas_penagihan":
      // Efektifitas Penagihan = Jumlah Penerimaan Rek Air / Jumah Rekening Air * 100 %
      // Nilai = IF(Efektifitas Penagihan>=10;5;IF(Efektifitas Penagihan>=7;4;IF(Efektifitas Penagihan>=3;3;IF(Efektifitas Penagihan>=0;2;IF(Efektifitas Penagihan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "solvabilitas":
      // Solvabilitas = Total Aktiva / Total Utang * 100%
      // Nilai = IF(Solvabilitas>=10;5;IF(Solvabilitas>=7;4;IF(Solvabilitas>=3;3;IF(Solvabilitas>=0;2;IF(Solvabilitas<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    // Aspek Pelayanan
    case "cakupan_pelayanan":
      // Cakupan Pelayanan Teknis = Jumlah Penduduk Terlayani / Jumlah Penduduk wilayah pelayanan * 100%
      // Nilai = IF(Cakupan Pelayanan Teknis>=10;5;IF(Cakupan Pelayanan Teknis>=7;4;IF(Cakupan Pelayanan Teknis>=3;3;IF(Cakupan Pelayanan Teknis>=0;2;IF(Cakupan Pelayanan Teknis<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "pertumbuhan_pelanggan":
      // Pertumbuhan Pelanggan = (Jmh Pelanggan thn ini - pelanggan thn lalu) / pelanggan tahun lalu * 100 %
      // Nilai = IF(Pertumbuhan Pelanggan>=10;5;IF(Pertumbuhan Pelanggan>=7;4;IF(Pertumbuhan Pelanggan>=3;3;IF(Pertumbuhan Pelanggan>=0;2;IF(Pertumbuhan Pelanggan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "penyelesaian_aduan":
      // Tingkat Penyelesaian Aduan = Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan *100%
      // Nilai = IF(Tingkat Penyelesaian Aduan>=10;5;IF(Tingkat Penyelesaian Aduan>=7;4;IF(Tingkat Penyelesaian Aduan>=3;3;IF(Tingkat Penyelesaian Aduan>=0;2;IF(Tingkat Penyelesaian Aduan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "kualitas_air":
      // Kualitas Air Pelanggan = JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji	
      // Nilai = IF(Kualitas Air Pelanggan>=10;5;IF(Kualitas Air Pelanggan>=7;4;IF(Kualitas Air Pelanggan>=3;3;IF(Kualitas Air Pelanggan>=0;2;IF(Kualitas Air Pelanggan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "konsumsi_air":
      // Konsumsi Air Domestik = (Jmh Air Yang Terjual Domestik Setahun/12) / Jumlah Pelanggan Domestik	
      // Nilai = IF(Konsumsi Air Domestik>=10;5;IF(Konsumsi Air Domestik>=7;4;IF(Konsumsi Air Domestik>=3;3;IF(Konsumsi Air Domestik>=0;2;IF(Konsumsi Air Domestik<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    // Aspek Operasional
    case "efisiensi_produksi":
      // Efisiensi Produksi = Volume Produksi Riil (m3) / Kapasitas terpasang (m3) * 100%
      // Nilai = IF(Efisiensi Produksi>=10;5;IF(Efisiensi Produksi>=7;4;IF(Efisiensi Produksi>=3;3;IF(Efisiensi Produksi>=0;2;IF(Efisiensi Produksi<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "tingkat_kehilangan_air":
      // Tingkat Kehilangan Air = Distribusi Air - Air Terjual / Distribusi Air * 100%
      // Nilai = IF(Tingkat Kehilangan Air>=10;5;IF(Tingkat Kehilangan Air>=7;4;IF(Tingkat Kehilangan Air>=3;3;IF(Tingkat Kehilangan Air>=0;2;IF(Tingkat Kehilangan Air<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "jam_operasi":
      // Jam Operasi Layanan = Waktu Distribusi Air Ke pelggan 1 thn / 365 
      // Nilai = IF(Jam Operasi Layanan>=10;5;IF(Jam Operasi Layanan>=7;4;IF(Jam Operasi Layanan>=3;3;IF(Jam Operasi Layanan>=0;2;IF(Jam Operasi Layanan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "tekanan_air":
      // Tekanan Air Samb Pelanggan = Jmh Pelanggan  dilayani dgn tekanan diatas 0,7Bar / Jumlah Pelanggan * 100%
      // Nilai = IF(Tekanan Air Samb Pelanggan>=10;5;IF(Tekanan Air Samb Pelanggan>=7;4;IF(Tekanan Air Samb Pelanggan>=3;3;IF(Tekanan Air Samb Pelanggan>=0;2;IF(Tekanan Air Samb Pelanggan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "penggantian_meter":
      // Penggantian Meter Air = Jumlah Meter Yg diganti atau dikalibrasi tahun ybs / Jumlah Pelanggan * 100%
      // Nilai = IF(Penggantian Meter Air>=10;5;IF(Penggantian Meter Air>=7;4;IF(Penggantian Meter Air>=3;3;IF(Penggantian Meter Air>=0;2;IF(Penggantian Meter Air<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    // Aspek SDM
    case "rasio_pegawai":
      // Rasio Jmh Pegawai per 1000 pelanggan = Jumlah Pegawai / Jumlah Pelanggan * 1000
      // Nilai = IF(Rasio Jmh Pegawai per 1000 pelanggan>=10;5;IF(Rasio Jmh Pegawai per 1000 pelanggan>=7;4;IF(Rasio Jmh Pegawai per 1000 pelanggan>=3;3;IF(Rasio Jmh Pegawai per 1000 pelanggan>=0;2;IF(Rasio Jmh Pegawai per 1000 pelanggan<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "rasio_diklat":
      // Ratio Diklat Pegawai atau Peningkatan Kompetensi = Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai *100%
      // Nilai = IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=10;5;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=7;4;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=3;3;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=0;2;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi<0;1)))))
      if (value >= 10) return 5;
      if (value >= 7) return 4;
      if (value >= 3) return 3;
      if (value >= 0) return 2;
      return 1;
      
    case "biaya_diklat":
      // Biaya Diklat Terhadap Biaya = Biaya Diklat /	Pegawai	Biaya Pegawai * 100%
      // Nilai = IF(Biaya Diklat Terhadap Biaya>=10;5;IF(Biaya Diklat Terhadap Biaya>=7;4;IF(Biaya Diklat Terhadap Biaya>=3;3;IF(Biaya Diklat Terhadap Biaya>=0;2;IF(Biaya Diklat Terhadap Biaya<0;1)))))
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
