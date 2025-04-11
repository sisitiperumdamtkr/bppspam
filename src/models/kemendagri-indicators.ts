
import { Indicator } from "./types";

// Indikator penilaian KEMENDAGRI
export const kemendagriIndicators: Indicator[] = [
  // I. ASPEK KEUANGAN
  {
    id: "rasio_laba_terhadap_aktiva_produktif",
    name: "Rasio Laba Terhadap Aktiva Produktif",
    category: "Keuangan",
    formula: "Laba Sebelum Pajak / Aktiva Produktif * 100",
    unit: "%",
    weight: 0.05
  },
  {
    id: "peningkatan_rasio_laba_terhadap_aktiva",
    name: "Peningkatan Rasio Laba Terhadap Aktiva Produktif",
    formula: "Rasio Laba Terhadap Aktiva Produktif Tahun Ini - Rasio Tahun Lalu",
    category: "Keuangan",
    unit: "%",
    weight: 0.05
  },
  {
    id: "rasio_laba_terhadap_penjualan",
    name: "Rasio Laba Terhadap Penjualan",
    formula: "Laba Sebelum Pajak / Pendapatan Operasi * 100",
    category: "Keuangan",
    unit: "%",
    weight: 0.05
  },
  {
    id: "peningkatan_rasio_laba_terhadap_penjualan",
    name: "Peningkatan Rasio Laba Terhadap Penjualan",
    formula: "Rasio Laba Terhadap Penjualan Tahun Ini - Rasio Tahun Lalu",
    category: "Keuangan",
    unit: "%",
    weight: 0.05
  },
  {
    id: "rasio_aktiva_lancar",
    name: "Rasio Aktiva Lancar Terhadap Hutang Lancar",
    formula: "Aktiva Lancar / Utang Lancar",
    category: "Keuangan",
    unit: "",
    weight: 0.05
  },
  {
    id: "rasio_utang_jangka_panjang",
    name: "Rasio Utang Jangka Panjang Terhadap Ekuitas",
    formula: "Utang Jangka Panjang / Ekuitas",
    category: "Keuangan",
    unit: "",
    weight: 0.05
  },
  {
    id: "rasio_total_aktiva",
    name: "Rasio Total Aktiva Terhadap Utang",
    formula: "Total Aktiva / Total Utang",
    category: "Keuangan",
    unit: "",
    weight: 0.05
  },
  {
    id: "rasio_biaya_operasi",
    name: "Rasio Biaya Operasi Terhadap Pendapatan Operasi",
    formula: "Total Biaya Operasi / Total Pendapatan Operasi",
    category: "Keuangan",
    unit: "",
    weight: 0.05
  },
  {
    id: "rasio_laba_operasi",
    name: "Rasio Laba Operasi Sebelum Biaya Penyusutan",
    formula: "Laba Operasi Sebelum Biaya Penyusutan / Angsuran Pokok",
    category: "Keuangan",
    unit: "",
    weight: 0.05
  },
  {
    id: "rasio_aktiva_produktif",
    name: "Rasio Aktiva Produktif Terhadap Penjualan Air",
    formula: "Aktiva Produktif / Penjualan Air",
    category: "Keuangan",
    unit: "",
    weight: 0.05
  },
  {
    id: "jangka_waktu_penagihan",
    name: "Jangka Waktu Penagihan Piutang",
    formula: "Piutang Usaha / Jumlah Penjualan Perhari",
    category: "Keuangan",
    unit: "hari",
    weight: 0.05
  },
  {
    id: "efektivitas_penagihan",
    name: "Efektivitas Penagihan",
    formula: "Rekening Tertagih / Penjualan Air * 100",
    category: "Keuangan",
    unit: "%",
    weight: 0.05
  },
  
  // II. ASPEK OPERASIONAL
  {
    id: "cakupan_pelayanan",
    name: "Cakupan Pelayanan",
    formula: "Jumlah Penduduk Terlayani / Jumlah Penduduk * 100",
    category: "Operasional",
    unit: "%",
    weight: 0.05
  },
  {
    id: "peningkatan_cakupan_pelayanan",
    name: "Peningkatan Cakupan Pelayanan",
    formula: "Cakupan Pelayanan Tahun Ini - Cakupan Pelayanan Tahun Lalu",
    category: "Operasional",
    unit: "%",
    weight: 0.05
  },
  {
    id: "kualitas_air_distribusi",
    name: "Kualitas Air Distribusi",
    formula: "Pilihan: 0 = Tidak Dilakukan Tes, 1 = Tidak Memenuhi Syarat, 2 = Memenuhi Syarat Air Bersih, 3 = Memenuhi Syarat Air Minum",
    category: "Operasional",
    unit: "",
    weight: 0.07
  },
  {
    id: "kontinuitas_air",
    name: "Kontinuitas Air",
    formula: "Pilihan: 1 = Tidak Semua Pelanggan Mendapat Aliran 24 Jam, 2 = Semua Pelanggan Mendapat Aliran Air 24 Jam",
    category: "Operasional",
    unit: "",
    weight: 0.07
  },
  {
    id: "produktivitas_pemanfaatan",
    name: "Produktivitas Pemanfaatan Instalasi Produksi",
    formula: "Kapasitas Produksi / Kapasitas Terpasang * 100",
    category: "Operasional",
    unit: "%",
    weight: 0.07
  },
  {
    id: "tingkat_kehilangan_air",
    name: "Tingkat Kehilangan Air",
    formula: "(Jumlah Air Didistribusikan - Air Terjual) / Jumlah Air Didistribusikan * 100",
    category: "Operasional",
    unit: "%",
    weight: 0.05
  },
  {
    id: "penurunan_kehilangan_air",
    name: "Penurunan Tingkat Kehilangan Air",
    formula: "Rasio Tahun Ini - Rasio Tahun Lalu",
    category: "Operasional",
    unit: "%",
    weight: 0.05
  },
  {
    id: "peneraan_meter",
    name: "Peneraan Meter Air",
    formula: "Jumlah Pelanggan yang Di Tera / Jumlah Total Pelanggan",
    category: "Operasional",
    unit: "%",
    weight: 0.05
  },
  {
    id: "kecepatan_penyambungan",
    name: "Kecepatan Penyambungan Baru",
    formula: "Pilihan: 1 = > 6 Hari, 2 = <= 6 Hari",
    category: "Operasional",
    unit: "",
    weight: 0.04
  },
  
  // III. ASPEK ADMINISTRASI
  {
    id: "rencana_jangka_panjang",
    name: "Rencana Jangka Panjang",
    formula: "Pilihan: 1 = Belum Memiliki (D), 2 = Memiliki (C), 3 = Sebagian Di Pedomani (B), 4 = Sepenuhnya Di Pedomani (A)",
    category: "Administrasi",
    unit: "",
    weight: 0.05
  },
  {
    id: "rencana_organisasi",
    name: "Rencana Organisasi",
    formula: "Pilihan: 1 = Belum Memiliki (D), 2 = Memiliki (C), 3 = Sebagian Di Pedomani (B), 4 = Sepenuhnya Di Pedomani (A)",
    category: "Administrasi",
    unit: "",
    weight: 0.05
  },
  {
    id: "prosedur_operasi",
    name: "Prosedur Operasi",
    formula: "Pilihan: 1 = Belum Memiliki (D), 2 = Memiliki (C), 3 = Sebagian Di Pedomani (B), 4 = Sepenuhnya Di Pedomani (A)",
    category: "Administrasi",
    unit: "",
    weight: 0.05
  },
  {
    id: "gambar_nyata_laksana",
    name: "Gambar Nyata Laksana",
    formula: "Pilihan: 1 = Belum Memiliki (D), 2 = Memiliki (C), 3 = Sebagian Di Pedomani (B), 4 = Sepenuhnya Di Pedomani (A)",
    category: "Administrasi",
    unit: "",
    weight: 0.05
  },
  {
    id: "pedoman_penilaian_kinerja",
    name: "Pedoman Penilaian Kinerja Karyawan",
    formula: "Pilihan: 1 = Belum Memiliki (D), 2 = Memiliki (C), 3 = Sebagian Di Pedomani (B), 4 = Sepenuhnya Di Pedomani (A)",
    category: "Administrasi",
    unit: "",
    weight: 0.05
  },
  {
    id: "rencana_kerja",
    name: "Rencana Kerja",
    formula: "Pilihan: 1 = Belum Memiliki (D), 2 = Memiliki (C), 3 = Sebagian Di Pedomani (B), 4 = Sepenuhnya Di Pedomani (A)",
    category: "Administrasi",
    unit: "",
    weight: 0.05
  }
];
