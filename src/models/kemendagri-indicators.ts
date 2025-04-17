
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
  
  // III. ASPEK OPERASI
  {
    id: "cakupan_pelayanan",
    name: "Cakupan Pelayanan",
    formula: "Jumlah Penduduk Terlayani / Jumlah Penduduk * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "peningkatan_cakupan_pelayanan",
    name: "Peningkatan Cakupan Pelayanan",
    formula: "Cakupan Pelayanan Tahun Ini - Cakupan Pelayanan Tahun Lalu",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "kualitas_air_distribusi",
    name: "Kualitas Air Distribusi",
    formula: "Memenuhi Syarat Air Minum = 3, Memenuhi Syarat Air Bersih = 2, Tidak Memenuhi Syarat = 1, Tidak Dilakukan Test = 0",
    category: "Operasional",
    unit: "",
    weight: 0
  },
  {
    id: "kontinuitas_air",
    name: "Kontinuitas Air",
    formula: "Semua Pelanggan mendapat Aliran Air 24 jam = 2, Tidak Semua Pelanggan Mendapat Aliran Air 24 jam = 1",
    category: "Operasional",
    unit: "",
    weight: 0
  },
  {
    id: "produktifitas_pemanfaatan_instalasi",
    name: "Produktifitas Pemanfaatan Instalasi Produksi",
    formula: "Kapasitas Produksi / Kapasitas Terpasang * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "tingkat_kehilangan_air",
    name: "Tingkat Kehilangan Air",
    formula: "(Jumlah air didistribusikan - Air terjual) / Jumlah air yang didistribusikan * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "penurunan_tingkat_kehilangan_air",
    name: "Penurunan Tingkat Kehilangan Air",
    formula: "Rasio Tahun Ini - Rasio Tahun Lalu",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "peneraan_meter",
    name: "Peneraan Meter",
    formula: "Jumlah Pelanggan yang Di Tera / Jumlah Total Pelanggan * 100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "kecepatan_penyambungan_baru",
    name: "Kecepatan Penyambungan Baru",
    formula: ">6 Hari = 1, <=6 Hari = 2",
    category: "Operasional",
    unit: "",
    weight: 0
  },
  {
    id: "kemampuan_penanganan_pengaduan",
    name: "Kemampuan Penanganan Pengaduan Rata-Rata per Bulan",
    formula: "Jumlah Pengaduan yang telah selesai ditangani / Jumlah Seluruh Pengaduan *100%",
    category: "Operasional",
    unit: "%",
    weight: 0
  },
  {
    id: "kemudahan_pelayanan_service_point",
    name: "Kemudahan Pelayanan Service Point di Luar kantor Pusat",
    formula: "Tidak Tersedia = 1, Tersedia = 2",
    category: "Operasional",
    unit: "",
    weight: 0
  },
  {
    id: "ratio_karyawan_per_1000_pelanggan",
    name: "Ratio Karyawan per 1000 Pelanggan",
    formula: "Jumlah Karyawan / Jumlah Pelanggan Aktif * 1000",
    category: "Operasional",
    unit: "",
    weight: 0
  },
  
  // IV. ASPEK ADMINISTRASI - Menggantikan Aspek SDM
  {
    id: "rencana_jangka_panjang",
    name: "Rencana Jangka Panjang",
    formula: "Belum Memiliki \"D\" = 1, Memiliki, belum dipedomani \"C\" = 2, Sebagian Dipedomani \"B\" = 3, Sepenuhnya Dipedomani \"A\" = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "rencana_organisasi",
    name: "Rencana Organisasi dan Uraian tugas",
    formula: "Belum Memiliki \"D\" = 1, Memiliki, belum dipedomani \"C\" = 2, Sebagian Dipedomani \"B\" = 3, Sepenuhnya Dipedomani \"A\" = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "prosedur_operasi_standar",
    name: "Prosedur Operasi Standar",
    formula: "Belum Memiliki \"D\" = 1, Memiliki, belum dipedomani \"C\" = 2, Sebagian Dipedomani \"B\" = 3, Sepenuhnya Dipedomani \"A\" = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "gambar_nyata_laksana",
    name: "Gambar Nyata laksana (As-Built Drawing)",
    formula: "Belum Memiliki \"D\" = 1, Memiliki, belum dipedomani \"C\" = 2, Sebagian Dipedomani \"B\" = 3, Sepenuhnya Dipedomani \"A\" = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "pedoman_penilaian_kinerja",
    name: "Pedoman Penilaian Kinerja karyawan",
    formula: "Belum Memiliki \"D\" = 1, Memiliki, belum dipedomani \"C\" = 2, Sebagian Dipedomani \"B\" = 3, Sepenuhnya Dipedomani \"A\" = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "rencana_kerja_anggaran",
    name: "Rencana Kerja dan Anggaran Perusahaan (RKAP)",
    formula: "Belum Memiliki \"D\" = 1, Memiliki, belum dipedomani \"C\" = 2, Sebagian Dipedomani \"B\" = 3, Sepenuhnya Dipedomani \"A\" = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "tertib_laporan_internal",
    name: "Tertib Laporan Internal",
    formula: "Tidak Tepat Waktu = 1, Tepat Waktu = 2",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "tertib_laporan_eksternal",
    name: "Tertib Laporan Eksternal",
    formula: "Tidak Tepat Waktu = 1, Tepat Waktu = 2",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "opini_auditor_independen",
    name: "Opini Auditor Independen",
    formula: "Not audit = 0, Adverse = 1, Disclaimer = 2, Qualified = 3, Unqualified = 4",
    category: "Administrasi",
    unit: "",
    weight: 0
  },
  {
    id: "tindak_lanjut_hasil_pemeriksaan",
    name: "Tindak Lanjut Hasil Pemeriksaan Tahun Terakhir",
    formula: "Tidak ada Temuan \"A\" = 4, Di-TL, Seluruhnya \"B\" = 3, Di-TL Sebagian \"C\" = 2, Tidak Di-TL \"D\" = 1",
    category: "Administrasi",
    unit: "",
    weight: 0
  }
];
