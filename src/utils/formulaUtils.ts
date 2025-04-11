import { Indicator } from "@/models/types";

/**
 * Mendapatkan input-input formula untuk indikator tertentu
 * @param indicatorId ID indikator
 * @returns Array input formula
 */
export const getFormulaInputs = (indicatorId: string) => {
  // Input formula untuk PUPR
  const purpInputs: Record<string, { name: string; label: string }[]> = {
    // Indikator PUPR lainnya
    // ...
  };

  // Input formula untuk KEMENDAGRI
  const kemendagriInputs: Record<string, { name: string; label: string }[]> = {
    // ASPEK KEUANGAN
    "roe": [
      { name: "laba_bersih", label: "Laba (Rugi) Bersih setelah Pajak" },
      { name: "jumlah_ekuitas", label: "Jumlah Ekuitas" }
    ],
    "rasio_operasi": [
      { name: "biaya_operasi", label: "Biaya Operasi" },
      { name: "pendapatan_operasi", label: "Pendapatan Operasi" }
    ],
    "cash_ratio": [
      { name: "kas", label: "Kas + Setara Kas" },
      { name: "utang_lancar", label: "Utang Lancar" }
    ],
    "efektifitas_penagihan": [
      { name: "penerimaan_rekening", label: "Jumlah Penerimaan Rekening Air" },
      { name: "jumlah_rekening", label: "Jumlah Rekening Air" }
    ],
    "solvabilitas": [
      { name: "total_aktiva", label: "Total Aktiva" },
      { name: "total_utang", label: "Total Utang" }
    ],
    
    // ASPEK PELAYANAN
    "cakupan_pelayanan_teknis": [
      { name: "penduduk_terlayani", label: "Jumlah Penduduk Terlayani" },
      { name: "penduduk_wilayah", label: "Jumlah Penduduk Wilayah Pelayanan" }
    ],
    "pertumbuhan_pelanggan": [
      { name: "pelanggan_tahun_ini", label: "Jumlah Pelanggan Tahun Ini" },
      { name: "pelanggan_tahun_lalu", label: "Jumlah Pelanggan Tahun Lalu" }
    ],
    "tingkat_penyelesaian_aduan": [
      { name: "pengaduan_selesai", label: "Jumlah Pengaduan Selesai Ditangani" },
      { name: "jumlah_pengaduan", label: "Jumlah Pengaduan" }
    ],
    "kualitas_air_pelanggan": [
      { name: "uji_memenuhi_syarat", label: "Jumlah Uji Kualitas Yang Memenuhi Syarat" },
      { name: "jumlah_diuji", label: "Jumlah Yang Diuji" }
    ],
    "konsumsi_air_domestik": [
      { name: "air_terjual_domestik", label: "Jumlah Air Yang Terjual Domestik Setahun (m³)" },
      { name: "jumlah_pelanggan_domestik", label: "Jumlah Pelanggan Domestik" }
    ],
    
    // ASPEK OPERASIONAL
    "efisiensi_produksi": [
      { name: "volume_produksi", label: "Volume Produksi Riil (m³)" },
      { name: "kapasitas_terpasang", label: "Kapasitas Terpasang (m³)" }
    ],
    "tingkat_kehilangan_air": [
      { name: "distribusi_air", label: "Distribusi Air (m³)" },
      { name: "air_terjual", label: "Air Terjual (m³)" }
    ],
    "jam_operasi_layanan": [
      { name: "waktu_distribusi", label: "Waktu Distribusi Air Ke Pelanggan 1 Tahun (jam)" }
    ],
    "tekanan_air_samb_pelanggan": [
      { name: "pelanggan_tekanan_baik", label: "Jumlah Pelanggan Dilayani dengan Tekanan > 0,7 Bar" },
      { name: "jumlah_pelanggan_total", label: "Jumlah Pelanggan Total" }
    ],
    "penggantian_meter_air": [
      { name: "meter_diganti", label: "Jumlah Meter Air Yang Diganti/Dikalibrasi" },
      { name: "jumlah_pelanggan", label: "Jumlah Pelanggan" }
    ],
    
    // ASPEK SDM
    "rasio_pegawai_per_1000_pelanggan": [
      { name: "jumlah_pegawai", label: "Jumlah Pegawai" },
      { name: "jumlah_pelanggan", label: "Jumlah Pelanggan" }
    ],
    "ratio_diklat_pegawai": [
      { name: "pegawai_ikut_diklat", label: "Jumlah Pegawai Yang Ikut Diklat" },
      { name: "jumlah_pegawai_total", label: "Jumlah Pegawai Total" }
    ],
    "biaya_diklat_terhadap_biaya": [
      { name: "biaya_diklat", label: "Biaya Diklat" },
      { name: "biaya_pegawai", label: "Biaya Pegawai" }
    ]
  };

  // Cek apakah indikator adalah untuk KEMENDAGRI
  if (indicatorId in kemendagriInputs) {
    return kemendagriInputs[indicatorId] || [];
  }

  // Default ke PUPR jika tidak ada di KEMENDAGRI
  return purpInputs[indicatorId] || [];
};

// Helper function to calculate value based on inputs
export const calculateFormulaValue = (
  indicatorId: string,
  inputs: Record<string, number>
): number => {
  let calculatedValue = 0;
  
  switch (indicatorId) {
    case "ROE":
      if (inputs.laba_bersih !== undefined && inputs.jumlah_ekuitas !== undefined && inputs.jumlah_ekuitas !== 0) {
        calculatedValue = (inputs.laba_bersih / inputs.jumlah_ekuitas) * 100;
      }
      break;
    
    case "RasioOperasi":
      if (inputs.biaya_operasi !== undefined && inputs.pendapatan_operasi !== undefined && inputs.pendapatan_operasi !== 0) {
        calculatedValue = inputs.biaya_operasi / inputs.pendapatan_operasi;
      }
      break;
    
    case "CashRatio":
      if (inputs.kas !== undefined && inputs.utang_lancar !== undefined && inputs.utang_lancar !== 0) {
        calculatedValue = (inputs.kas  / inputs.utang_lancar) * 100;
      }
      break;
    
    case "EfektifitasPenagihan":
      if (inputs.penerimaan_rekening !== undefined && inputs.jumlah_rekening !== undefined && inputs.jumlah_rekening !== 0) {
        calculatedValue = (inputs.penerimaan_rekening / inputs.jumlah_rekening) * 100;
      }
      break;
    
    case "Solvabilitas":
      if (inputs.total_aktiva !== undefined && inputs.total_utang !== undefined && inputs.total_utang !== 0) {
        calculatedValue = (inputs.total_aktiva / inputs.total_utang) * 100;
      }
      break;
    
    case "CakupanPelayananTeknis":
      if (inputs.penduduk_terlayani !== undefined && inputs.penduduk_wilayah !== undefined && inputs.penduduk_wilayah !== 0) {
        calculatedValue = (inputs.penduduk_terlayani / inputs.penduduk_wilayah) * 100;
      }
      break;
    
    case "PertumbuhanPelanggan":
      if (inputs.pelanggan_tahun_ini !== undefined && inputs.pelanggan_tahun_lalu !== undefined && inputs.pelanggan_tahun_lalu !== 0) {
        calculatedValue = (inputs.pelanggan_tahun_ini / inputs.pelanggan_tahun_lalu) * 100;
      }
      break;
    
    case "TingkatPenyelesaianAduan":
      if (inputs.pengaduan_selesai !== undefined && inputs.jumlah_pengaduan !== undefined && inputs.jumlah_pengaduan !== 0) {
        calculatedValue = (inputs.pengaduan_selesai / inputs.jumlah_pengaduan) * 100;
      }
      break;
    
    case "KualitasAirPelanggan":
      if (inputs.uji_memenuhi_syarat !== undefined && inputs.jumlah_diuji !== undefined && inputs.jumlah_diuji !== 0) {
        calculatedValue = (inputs.uji_memenuhi_syarat / inputs.jumlah_diuji)*100;
      }
      break;
    
    case "KonsumsiAirDomestik":
      if (inputs.air_terjual_domestik !== undefined && inputs.jumlah_pelanggan_domestik !== undefined && inputs.jumlah_pelanggan_domestik !== 0) {
        calculatedValue = (inputs.air_terjual_domestik / 12) / inputs.jumlah_pelanggan_domestik;
      }
      break;
    
    case "EfisiensiProduksi":
      if (inputs.volume_produksi !== undefined && inputs.kapasitas_terpasang !== undefined && inputs.kapasitas_terpasang !== 0) {
        calculatedValue = (inputs.volume_produksi / inputs.kapasitas_terpasang) * 100;
      }
      break;
    
    case "TingkatKehilanganAir":
      if (inputs.distribusi_air !== undefined && inputs.air_terjual !== undefined && inputs.air_terjual !== 0) {
        calculatedValue = (inputs.distribusi_air / inputs.air_terjual) * 100;
      }
      break;
    
    case "JamOperasiLayanan":
      if (inputs.waktu_distribusi !== undefined) {
        calculatedValue = inputs.waktu_distribusi / 365;
      }
      break;
    
    case "TekananAirSambPelanggan":
      if (inputs.pelanggan_tekanan_baik !== undefined && inputs.jumlah_pelanggan_total !== undefined && inputs.jumlah_pelanggan_total !== 0) {
        calculatedValue = (inputs.pelanggan_tekanan_baik / inputs.jumlah_pelanggan_total) * 100;
      }
      break;
    
    case "PenggantianMeterAir":
      if (inputs.meter_diganti !== undefined && inputs.jumlah_pelanggan !== undefined && inputs.jumlah_pelanggan !== 0) {
        calculatedValue = (inputs.meter_diganti / inputs.jumlah_pelanggan) * 100;
      }
      break;
    
    case "RasioJumlahPegawai":
      if (inputs.jumlah_pegawai !== undefined && inputs.jumlah_pelanggan !== undefined && inputs.jumlah_pelanggan !== 0) {
        calculatedValue = (inputs.jumlah_pegawai / inputs.jumlah_pelanggan);
      }
      break;
    
    case "RatioDiklatPegawai":
      if (inputs.pegawai_ikut_diklat !== undefined && inputs.jumlah_pegawai_total !== undefined && inputs.jumlah_pegawai_total !== 0) {
        calculatedValue = (inputs.pegawai_ikut_diklat / inputs.jumlah_pegawai_total) * 100;
      }
      break;
    
    case "BiayaDiklatTerhadapBiaya":
      if (inputs.biaya_diklat !== undefined && inputs.biaya_pegawai !== undefined && inputs.biaya_pegawai !== 0) {
        calculatedValue = (inputs.biaya_diklat / inputs.biaya_pegawai) * 100;
      }
      break;
    
    default:
      calculatedValue = 0;
  }
  
  return calculatedValue;
};
