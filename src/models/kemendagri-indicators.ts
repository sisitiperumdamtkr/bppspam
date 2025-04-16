
import { Indicator } from "./types";

// Indikator penilaian KEMENDAGRI
export const kemendagriIndicators: Indicator[] = [
  // I. ASPEK KEUANGAN
  {
    id: "rasio_laba_aktiva_produktif",
    name: "Rasio Laba terhadap Aktiva Produktif",
    category: "Keuangan",
    formula: "Laba Sebelum Pajak / Aktiva Produktif * 100 %",
    unit: "%",
    weight: 0
  },
  {
    id: "peningkatan_rasio_laba_aktiva",
    name: "Peningkatan Ratio Laba terhadap Aktiva Produktif Dibanding Tahun lalu",
    formula: "Ratio Laba terhadap Aktiva Produktif Tahun ini - Ratio Laba terhadap Aktiva Produktif Tahun lalu",
    category: "Keuangan",
    unit: "%",
    weight: 0
  },
  {
    id: "ratio_laba_terhadap_penjualan",
    name: "Ratio Laba Terhadap Penjualan",
    formula: "Laba Sebelum Pajak / Pendapatan Operasi * 100%",
    category: "Keuangan",
    unit: "%",
    weight: 0
  },
  {
    id: "peningkatan_ratio_laba_penjualan",
    name: "Peningkatan Ratio Laba Terhadap Penjualan dibanding tahun lalu",
    formula: "Ratio Laba Terhadap Penjualan Tahun ini - Ratio Laba Terhadap Penjualan Tahun Lalu",
    category: "Keuangan",
    unit: "%",
    weight: 0
  },
  {
    id: "ratio_aktiva_lancar_utang_lancar",
    name: "Ratio Aktiva Lancar Terhadap Utang Lancar",
    formula: "Aktiva Lancar / Utang Lancar",
    category: "Keuangan",
    unit: "",
    weight: 0
  },
  {
    id: "rasio_utang_jangka_panjang_ekuitas",
    name: "Rasio Utang Jangka Panjang Terhadap Ekuitas",
    formula: "Utang Jangka Panjang / Ekuitas",
    category: "Keuangan",
    unit: "",
    weight: 0
  },
  {
    id: "rasio_total_aktiva_total_utang",
    name: "Rasio Total Aktiva terhadap Total Utang",
    formula: "Total Aktiva / Total Utang",
    category: "Keuangan",
    unit: "",
    weight: 0
  },
  {
    id: "rasio_biaya_operasi_pendapatan_operasi",
    name: "Rasio Biaya Operasi terhadap Pendapatan Operasi",
    formula: "Total Biaya operasi / Total Pendapatan Operasi",
    category: "Keuangan",
    unit: "",
    weight: 0
  },
  {
    id: "ratio_laba_operasi_angsuran",
    name: "Ratio Laba Operasi sebelum Biaya Penyusutan terhadap Angsuran pokok dan Bunga jatuh tempo",
    formula: "Laba Operasi / ( Angsuran Pokok + Bunga Jatuh tempo )",
    category: "Keuangan",
    unit: "",
    weight: 0
  },
  {
    id: "ratio_aktiva_produktif_penjualan_air",
    name: "Ratio Aktiva Produktif terhadap Penjualan Air",
    formula: "Aktiva Produktif / Penjualan Air",
    category: "Keuangan",
    unit: "",
    weight: 0
  },
  {
    id: "jangka_waktu_penagihan_piutang",
    name: "Jangka Waktu Penaggihan Piutang",
    formula: "Piutang Usaha / Jumlah Penjualan per Hari",
    category: "Keuangan",
    unit: "hari",
    weight: 0
  },
  {
    id: "efektifitas_penagihan",
    name: "Efektifitas Penaggihan",
    formula: "Rekening Tertagih / Penjualan Air * 100 %",
    category: "Keuangan",
    unit: "%",
    weight: 0
  },
  
  // II. ASPEK PELAYANAN
  {
    id: "cakupan_pelayanan_teknis",
    name: "Cakupan Pelayanan Teknis",
    formula: "Jumlah Penduduk Terlayani / Jumlah Penduduk wilayah pelayanan * 100%",
    category: "Pelayanan",
    unit: "%",
    weight: 0
  },
  {
    id: "pertumbuhan_pelanggan",
    name: "Pertumbuhan Pelanggan",
    formula: "(Jmh Pelanggan thn ini - pelanggan thn lalu) / pelanggan tahun lalu * 100 %",
    category: "Pelayanan",
    unit: "%",
    weight: 0
  },
  {
    id: "tingkat_penyelesaian_aduan",
    name: "Tingkat Penyelesaian Aduan",
    formula: "Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan *100%",
    category: "Pelayanan",
    unit: "%",
    weight: 0
  },
  {
    id: "kualitas_air_pelanggan",
    name: "Kualitas Air Pelanggan",
    formula: "JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji",
    category: "Pelayanan",
    unit: "",
    weight: 0
  },
  {
    id: "konsumsi_air_domestik",
    name: "Konsumsi Air Domestik",
    formula: "(Jmh Air Yang Terjual Domestik Setahun/12) / Jumlah Pelanggan Domestik",
    category: "Pelayanan",
    unit: "m³/pelanggan/bulan",
    weight: 0
  },
  
  // III. ASPEK OPERASI
  {
    id: "efisiensi_produksi",
    name: "Efisiensi Produksi",
    formula: "Volume Produksi Riil (m3) / Kapasitas terpasang (m3) * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "tingkat_kehilangan_air",
    name: "Tingkat Kehilangan Air",
    formula: "Distribusi Air - Air Terjual / Distribusi Air * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "jam_operasi_layanan",
    name: "Jam Operasi Layanan",
    formula: "Waktu Distribusi Air Ke pelggan 1 thn / 365",
    category: "Operasional",
    unit: "jam/hari",
    weight: 0
  },
  {
    id: "tekanan_air_samb_pelanggan",
    name: "Tekanan Air Samb Pelanggan",
    formula: "Jmh Pelanggan dilayani dgn tekanan diatas 0,7Bar / Jumlah Pelanggan * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "penggantian_meter_air",
    name: "Penggantian Meter Air",
    formula: "Jumlah Meter Yg diganti atau dikalibrasi tahun ybs / Jumlah Pelanggan * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  
  // IV. ASPEK SDM
  {
    id: "rasio_pegawai_per_1000_pelanggan",
    name: "Rasio Jmh Pegawai per 1000 pelanggan",
    formula: "Jumlah Pegawai / Jumlah Pelanggan * 1000",
    category: "SDM",
    unit: "pegawai/1000 pelanggan",
    weight: 0
  },
  {
    id: "ratio_diklat_pegawai",
    name: "Ratio Diklat Pegawai atau Peningkatan Kompetensi",
    formula: "Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai *100%",
    category: "SDM",
    unit: "%",
    weight: 0
  },
  {
    id: "biaya_diklat_terhadap_biaya",
    name: "Biaya Diklat Terhadap Biaya",
    formula: "Biaya Diklat / Biaya Pegawai * 100%",
    category: "SDM",
    unit: "%",
    weight: 0
  }
];
