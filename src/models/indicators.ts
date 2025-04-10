import { Indicator } from './types';

// Data indikator penilaian PDAM berdasarkan BPPSPAM
export const indicators: Indicator[] = [
  // Aspek Keuangan
  {
    id: "ROE",
    name: "Return on Equity (ROE)",
    category: "Keuangan",
    formula: "Laba (Rugi) Bersih setelah Pajak / Jumlah Ekuitas × 100%",
    weight: 0.055,
    unit: "%"
  },
  {
    id: "RasioOperasi",
    name: "Rasio Operasi",
    category: "Keuangan",
    formula: "Biaya Operasi / Pendapatan Operasi",
    weight: 0.055,
    unit: ""
  },
  {
    id: "CashRatio",
    name: "Cash Ratio",
    category: "Keuangan",
    formula: "Kas + Setara Kas / Utang Lancar × 100%",
    weight: 0.055,
    unit: "%"
  },
  {
    id: "EfektifitasPenagihan",
    name: "Efektivitas Penagihan",
    category: "Keuangan",
    formula: "Jumlah Penerimaan Rek Air / Jumah Rekening Air × 100%",
    weight: 0.055,
    unit: "%"
  },
  {
    id: "Solvabilitas",
    name: "Solvabilitas",
    category: "Keuangan",
    formula: "Total Aktiva / Total Utang × 100%",
    weight: 0.030,
    unit: "%"
  },
  
  // Aspek Pelayanan
  {
    id: "CakupanPelayananTeknis",
    name: "Cakupan Pelayanan Teknis",
    category: "Pelayanan",
    formula: "Jumlah Penduduk Terlayani / Jumlah Penduduk wilayah pelayanan × 100%",
    weight: 0.050,
    unit: "%"
  },
  {
    id: "PertumbuhanPelanggan",
    name: "Pertumbuhan Pelanggan",
    category: "Pelayanan",
    formula: "Jumlah Pelanggan tahun ini / pelanggan tahun lalu × 100%",
    weight: 0.050,
    unit: "%"
  },
  {
    id: "TingkatPenyelesaianAduan",
    name: "Tingkat Penyelesaian Aduan",
    category: "Pelayanan",
    formula: "Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan × 100%",
    weight: 0.025,
    unit: "%"
  },
  {
    id: "KualitasAirPelanggan",
    name: "Kualitas Air Pelanggan",
    category: "Pelayanan",
    formula: "JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji",
    weight: 0.075,
    unit: ""
  },
  {
    id: "KonsumsiAirDomestik",
    name: "Konsumsi Air Domestik",
    category: "Pelayanan",
    formula: "(Jmh Air Yang Terjual Domestik Setahun/12) / Jumlah Pelanggan Domestik",
    weight: 0.050,
    unit: "m³/bulan"
  },
  
  // Aspek Operasional
  {
    id: "EfisiensiProduksi",
    name: "Efisiensi Produksi",
    category: "Operasional",
    formula: "Volume Produksi Riil (m³) / Kapasitas terpasang (m³) × 100%",
    weight: 0.070,
    unit: "%"
  },
  {
    id: "TingkatKehilanganAir",
    name: "Tingkat Kehilangan Air",
    category: "Operasional",
    formula: "Distribusi Air / Air Terjual × 100%",
    weight: 0.070,
    unit: "%"
  },
  {
    id: "JamOperasiLayanan",
    name: "Jam Operasi Layanan",
    category: "Operasional",
    formula: "Waktu Distribusi Air Ke pelggan 1 thn / 365 hari",
    weight: 0.080,
    unit: "jam/hari"
  },
  {
    id: "TekananAirSambPelanggan",
    name: "Tekanan Air Samb Pelanggan",
    category: "Operasional",
    formula: "Jmh Pelanggan dilayani dgn tekanan> 0,7Bar / Jumlah Pelanggan × 100%",
    weight: 0.065,
    unit: "%"
  },
  {
    id: "PenggantianMeterAir",
    name: "Penggantian Meter Air",
    category: "Operasional",
    formula: "Jumlah Meter Yg diganti/dikalibrasi tahun ybs / Jumlah Pelanggan × 100%",
    weight: 0.065,
    unit: "%"
  },
  
  // Aspek SDM
  {
    id: "RasioJumlahPegawai",
    name: "Rasio Jmh Pegawai per 1000 pelanggan",
    category: "SDM",
    formula: "Jumlah Pegawai / Jumlah Pelanggan × 1000",
    weight: 0.070,
    unit: "orang/1000 pel"
  },
  {
    id: "RatioDiklatPegawai",
    name: "Ratio Diklat Pegawai / Peningkatan Kompetensi",
    category: "SDM",
    formula: "Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai × 100%",
    weight: 0.040,
    unit: "%"
  },
  {
    id: "BiayaDiklatTerhadapBiaya",
    name: "Biaya Diklat Terhadap Biaya Pegawai",
    category: "SDM",
    formula: "Biaya Diklat / Biaya Pegawai × 100%",
    weight: 0.040,
    unit: "%"
  }
];
