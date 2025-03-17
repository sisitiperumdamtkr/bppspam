
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
      // Nilai = IF(Rasio Operasi<=0,5;5;IF(Rasio Operasi<=0,65;4;IF(Rasio Operasi<=0,85;3;IF(Rasio Operasi<=1;2;IF(Rasio Operasi>1;1)))))
      if (value <= 0.5) return 5;
      if (value <= 0.65) return 4;
      if (value <= 0.85) return 3;
      if (value <= 1) return 2;
      return 1;
      
    case "cash_ratio":
      // Cash Ratio = Kas+Setara Kas / Utang Lancar * 100 %
      // Nilai = IF(Cash Ratio>=100;5;IF(Cash Ratio>=80;4;IF(Cash Ratio>=60;3;IF(Cash Ratio>=40;2;IF(Cash Ratio<40;1)))))
      if (value >= 100) return 5;
      if (value >= 80) return 4;
      if (value >= 60) return 3;
      if (value >= 40) return 2;
      return 1;
      
    case "efektivitas_penagihan":
      // Efektifitas Penagihan = Jumlah Penerimaan Rek Air / Jumah Rekening Air * 100 %
      // Nilai = IF(Efektifitas Penagihan>=90;5;IF(Efektifitas Penagihan>=85;4;IF(Efektifitas Penagihan>=80;3;IF(Efektifitas Penagihan>=75;2;IF(Efektifitas Penagihan<75;1)))))
      if (value >= 90) return 5;
      if (value >= 85) return 4;
      if (value >= 80) return 3;
      if (value >= 75) return 2;
      return 1;
      
    case "solvabilitas":
      // Solvabilitas = Total Aktiva / Total Utang * 100%
      // Nilai = IF(Solvabilitas>=200;5;IF(Solvabilitas>=170;4;IF(Solvabilitas>=135;3;IF(Solvabilitas>=100;2;IF(Solvabilitas<100;1)))))
      if (value >= 200) return 5;
      if (value >= 170) return 4;
      if (value >= 135) return 3;
      if (value >= 100) return 2;
      return 1;
      
    // Aspek Pelayanan
    case "cakupan_pelayanan":
      // Cakupan Pelayanan Teknis = Jumlah Penduduk Terlayani / Jumlah Penduduk * 100%
      // Nilai = IF(Cakupan Pelayanan Teknis>=80;5;IF(Cakupan Pelayanan Teknis>=60;4;IF(Cakupan Pelayanan Teknis>=40;3;IF(Cakupan Pelayanan Teknis>=20;2;IF(Cakupan Pelayanan Teknis<20;1)))))
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "pertumbuhan_pelanggan":
      // Pertumbuhan Pelanggan = (Jmh Pelanggan thn ini - pelanggan thn lalu) / pelanggan tahun lalu * 100 %
      // Nilai = IF(Pertumbuhan Pelanggan>=10;5;IF(Pertumbuhan Pelanggan>=8;4;IF(Pertumbuhan Pelanggan>=6;3;IF(Pertumbuhan Pelanggan>=4;2;IF(Pertumbuhan Pelanggan<4;1)))))
      if (value >= 10) return 5;
      if (value >= 8) return 4;
      if (value >= 6) return 3;
      if (value >= 4) return 2;
      return 1;
      
    case "penyelesaian_aduan":
      // Tingkat Penyelesaian Aduan = Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan *100%
      // Nilai = IF(Tingkat Penyelesaian Aduan>=80;5;IF(Tingkat Penyelesaian Aduan>=70;4;IF(Tingkat Penyelesaian Aduan>=60;3;IF(Tingkat Penyelesaian Aduan>=50;2;IF(Tingkat Penyelesaian Aduan<50;1)))))
      if (value >= 80) return 5;
      if (value >= 70) return 4;
      if (value >= 60) return 3;
      if (value >= 50) return 2;
      return 1;
      
    case "kualitas_air":
      // Kualitas Air Pelanggan = JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji
      // Nilai = IF(Kualitas Air Pelanggan>=99;5;IF(Kualitas Air Pelanggan>=95;4;IF(Kualitas Air Pelanggan>=90;3;IF(Kualitas Air Pelanggan>=85;2;IF(Kualitas Air Pelanggan<85;1)))))
      if (value >= 99) return 5;
      if (value >= 95) return 4;
      if (value >= 90) return 3;
      if (value >= 85) return 2;
      return 1;
      
    case "konsumsi_air":
      // Konsumsi Air Domestik = (Jmh Air Yang Terjual Domestik Setahun/12) / Jumlah Pelanggan Domestik
      // Nilai = IF(Konsumsi Air Domestik>=30;5;IF(Konsumsi Air Domestik>=25;4;IF(Konsumsi Air Domestik>=20;3;IF(Konsumsi Air Domestik>=15;2;IF(Konsumsi Air Domestik<15;1)))))
      if (value >= 30) return 5;
      if (value >= 25) return 4;
      if (value >= 20) return 3;
      if (value >= 15) return 2;
      return 1;
      
    // Aspek Operasional
    case "efisiensi_produksi":
      // Efisiensi Produksi = Volume Produksi Riil (m3) / Kapasitas terpasang (m3) * 100%
      // Nilai = IF(Efisiensi Produksi>=90;5;IF(Efisiensi Produksi>=80;4;IF(Efisiensi Produksi>=70;3;IF(Efisiensi Produksi>=60;2;IF(Efisiensi Produksi<60;1)))))
      if (value >= 90) return 5;
      if (value >= 80) return 4;
      if (value >= 70) return 3;
      if (value >= 60) return 2;
      return 1;
      
    case "tingkat_kehilangan_air":
      // Tingkat Kehilangan Air = Distribusi Air - Air Terjual / Distribusi Air * 100%
      // Nilai = IF(Tingkat Kehilangan Air<=20;5;IF(Tingkat Kehilangan Air<=25;4;IF(Tingkat Kehilangan Air<=30;3;IF(Tingkat Kehilangan Air<=35;2;IF(Tingkat Kehilangan Air>35;1)))))
      if (value <= 20) return 5;
      if (value <= 25) return 4;
      if (value <= 30) return 3;
      if (value <= 35) return 2;
      return 1;
      
    case "jam_operasi":
      // Jam Operasi Layanan = Waktu Distribusi Air Ke pelggan 1 thn / 365
      // Nilai = IF(Jam Operasi Layanan>=24;5;IF(Jam Operasi Layanan>=20;4;IF(Jam Operasi Layanan>=16;3;IF(Jam Operasi Layanan>=12;2;IF(Jam Operasi Layanan<12;1)))))
      if (value >= 24) return 5;
      if (value >= 20) return 4;
      if (value >= 16) return 3;
      if (value >= 12) return 2;
      return 1;
      
    case "tekanan_air":
      // Tekanan Air Samb Pelanggan = Jmh Pelanggan dilayani dgn tekanan diatas 0,7Bar / Jumlah Pelanggan * 100%
      // Nilai = IF(Tekanan Air Samb Pelanggan>=80;5;IF(Tekanan Air Samb Pelanggan>=60;4;IF(Tekanan Air Samb Pelanggan>=40;3;IF(Tekanan Air Samb Pelanggan>=20;2;IF(Tekanan Air Samb Pelanggan<20;1)))))
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "penggantian_meter":
      // Penggantian Meter Air = Jumlah Meter Yg diganti atau dikalibrasi tahun ybs / Jumlah Pelanggan * 100%
      // Nilai = IF(Penggantian Meter Air>=20;5;IF(Penggantian Meter Air>=15;4;IF(Penggantian Meter Air>=10;3;IF(Penggantian Meter Air>=5;2;IF(Penggantian Meter Air<5;1)))))
      if (value >= 20) return 5;
      if (value >= 15) return 4;
      if (value >= 10) return 3;
      if (value >= 5) return 2;
      return 1;
      
    // Aspek SDM
    case "rasio_pegawai":
      // Rasio Jmh Pegawai per 1000 pelanggan = Jumlah Pegawai / Jumlah Pelanggan * 1000
      // Nilai = IF(Rasio Jmh Pegawai per 1000 pelanggan<=6;5;IF(Rasio Jmh Pegawai per 1000 pelanggan<=8;4;IF(Rasio Jmh Pegawai per 1000 pelanggan<=10;3;IF(Rasio Jmh Pegawai per 1000 pelanggan<=12;2;IF(Rasio Jmh Pegawai per 1000 pelanggan>12;1)))))
      if (value <= 6) return 5;
      if (value <= 8) return 4;
      if (value <= 10) return 3;
      if (value <= 12) return 2;
      return 1;
      
    case "rasio_diklat":
      // Ratio Diklat Pegawai atau Peningkatan Kompetensi = Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai *100%
      // Nilai = IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=80;5;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=60;4;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=40;3;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi>=20;2;IF(Ratio Diklat Pegawai atau Peningkatan Kompetensi<20;1)))))
      if (value >= 80) return 5;
      if (value >= 60) return 4;
      if (value >= 40) return 3;
      if (value >= 20) return 2;
      return 1;
      
    case "biaya_diklat":
      // Biaya Diklat Terhadap Biaya = Biaya Diklat / Pegawai Biaya Pegawai * 100%
      // Nilai = IF(Biaya Diklat Terhadap Biaya>=5;5;IF(Biaya Diklat Terhadap Biaya>=4;4;IF(Biaya Diklat Terhadap Biaya>=3;3;IF(Biaya Diklat Terhadap Biaya>=2;2;IF(Biaya Diklat Terhadap Biaya<2;1)))))
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
