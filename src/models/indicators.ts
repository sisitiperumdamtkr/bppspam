
import { Indicator } from './types';

// Data indikator penilaian PDAM berdasarkan BPPSPAM
export const indicators: Indicator[] = [
  // Aspek Keuangan
  {
    id: "roe",
    name: "Return on Equity (ROE)",
    category: "Keuangan",
    formula: "Laba (Rugi) Bersih setelah Pajak / Jumlah Ekuitas × 100%",
    weight: 0.055,
    unit: "%"
  },
  {
    id: "rasio_operasi",
    name: "Rasio Operasi",
    category: "Keuangan",
    formula: "Biaya Operasi / Pendapatan Operasi",
    weight: 0.055,
    unit: ""
  },
  {
    id: "cash_ratio",
    name: "Cash Ratio",
    category: "Keuangan",
    formula: "Kas + Setara Kas / Utang Lancar × 100%",
    weight: 0.055,
    unit: "%"
  },
  {
    id: "efektivitas_penagihan",
    name: "Efektivitas Penagihan",
    category: "Keuangan",
    formula: "Jumlah Penerimaan Rek Air / Jumah Rekening Air × 100%",
    weight: 0.055,
    unit: "%"
  },
  {
    id: "solvabilitas",
    name: "Solvabilitas",
    category: "Keuangan",
    formula: "Total Aktiva / Total Utang × 100%",
    weight: 0.030,
    unit: "%"
  },
  
  // Aspek Pelayanan
  {
    id: "cakupan_pelayanan",
    name: "Cakupan Pelayanan Teknis",
    category: "Pelayanan",
    formula: "Jumlah Penduduk Terlayani / Jumlah Penduduk wilayah pelayanan × 100%",
    weight: 0.050,
    unit: "%"
  },
  {
    id: "pertumbuhan_pelanggan",
    name: "Pertumbuhan Pelanggan",
    category: "Pelayanan",
    formula: "(Jml Pelanggan) / pelanggan tahun lalu × 100%",
    weight: 0.050,
    unit: "%"
  },
  {
    id: "penyelesaian_aduan",
    name: "Tingkat Penyelesaian Aduan",
    category: "Pelayanan",
    formula: "Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan × 100%",
    weight: 0.025,
    unit: "%"
  },
  {
    id: "kualitas_air",
    name: "Kualitas Air Pelanggan",
    category: "Pelayanan",
    formula: "JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji × 100",
    weight: 0.075,
    unit: "%"
  },
  {
    id: "konsumsi_air",
    name: "Konsumsi Air Domestik",
    category: "Pelayanan",
    formula: "(Jmh Air Yang Terjual Domestik Setahun) / Jumlah Pelanggan Domestik",
    weight: 0.050,
    unit: "m³/bulan"
  },
  
  // Aspek Operasional
  {
    id: "efisiensi_produksi",
    name: "Efisiensi Produksi",
    category: "Operasional",
    formula: "Volume Produksi Riil (m³) / Kapasitas terpasang (m³) × 100%",
    weight: 0.070,
    unit: "%"
  },
  {
    id: "tingkat_kehilangan_air",
    name: "Tingkat Kehilangan Air",
    category: "Operasional",
    formula: "Air Terjual / Distribusi Air × 100%",
    weight: 0.070,
    unit: "%"
  },
  {
    id: "jam_operasi",
    name: "Jam Operasi Layanan",
    category: "Operasional",
    formula: "Waktu Distribusi Air Ke pelggan 1 thn / 365 hari",
    weight: 0.080,
    unit: "jam/hari"
  },
  {
    id: "tekanan_air",
    name: "Tekanan Air Samb Pelanggan",
    category: "Operasional",
    formula: "Jmh Pelanggan dilayani dgn tekanan> 0,7Bar / Jumlah Pelanggan × 100%",
    weight: 0.065,
    unit: "%"
  },
  {
    id: "penggantian_meter",
    name: "Penggantian Meter Air",
    category: "Operasional",
    formula: "Jumlah Meter Yg diganti/dikalibrasi tahun ybs / Jumlah Pelanggan × 100%",
    weight: 0.065,
    unit: "%"
  },
  
  // Aspek SDM
  {
    id: "rasio_pegawai",
    name: "Rasio Jmh Pegawai / 1000 pelanggan",
    category: "SDM",
    formula: "Jumlah Pegawai / Jumlah Pelanggan × 1000",
    weight: 0.070,
    unit: "orang/1000 pel"
  },
  {
    id: "rasio_diklat",
    name: "Ratio Diklat Pegawai / Peningkatan Kompetensi",
    category: "SDM",
    formula: "Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai × 100%",
    weight: 0.040,
    unit: "%"
  },
  {
    id: "biaya_diklat",
    name: "Biaya Diklat Terhadap Biaya Pegawai",
    category: "SDM",
    formula: "Biaya Diklat / Biaya Pegawai × 100%",
    weight: 0.040,
    unit: "%"
  }
];
