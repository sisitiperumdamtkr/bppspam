/**
 * Mendapatkan input komponen untuk rumus tertentu
 */
export const getFormulaInputs = (indicatorId: string) => {
  switch (indicatorId) {
    case "rasio_laba_aktiva_produktif":
      return [
        { name: "laba_sebelum_pajak", label: "Laba Sebelum Pajak" },
        { name: "aktiva_produktif", label: "Aktiva Produktif" }
      ];
      
    case "rasio_operasi":
      return [
        { name: "biaya_operasi", label: "Biaya Operasi" },
        { name: "pendapatan_operasi", label: "Pendapatan Operasi" }
      ];
      
    case "cash_ratio":
      return [
        { name: "kas", label: "Kas + Setara Kas" },
        { name: "utang_lancar", label: "Utang Lancar" }
      ];
      
    case "efektifitas_penagihan":
      return [
        { name: "penerimaan_rekening", label: "Jumlah Penerimaan Rekening Air" },
        { name: "jumlah_rekening", label: "Jumlah Rekening Air" }
      ];
      
    case "solvabilitas":
      return [
        { name: "total_aktiva", label: "Total Aktiva" },
        { name: "total_utang", label: "Total Utang" }
      ];
      
    case "cakupan_pelayanan_teknis":
      return [
        { name: "penduduk_terlayani", label: "Jumlah Penduduk Terlayani" },
        { name: "penduduk_wilayah", label: "Jumlah Penduduk Wilayah Pelayanan" }
      ];
      
    case "pertumbuhan_pelanggan":
      return [
        { name: "pelanggan_tahun_ini", label: "Jumlah Pelanggan Tahun Ini" },
        { name: "pelanggan_tahun_lalu", label: "Jumlah Pelanggan Tahun Lalu" }
      ];
      
    case "tingkat_penyelesaian_aduan":
      return [
        { name: "pengaduan_selesai", label: "Jumlah Pengaduan Selesai Ditangani" },
        { name: "jumlah_pengaduan", label: "Jumlah Pengaduan" }
      ];
      
    case "kualitas_air_pelanggan":
      return [
        { name: "uji_memenuhi_syarat", label: "Jumlah Uji Kualitas Memenuhi Syarat" },
        { name: "jumlah_diuji", label: "Jumlah Yang Diuji" }
      ];
      
    case "konsumsi_air_domestik":
      return [
        { name: "air_terjual_domestik", label: "Air Terjual Domestik Setahun (m³)" },
        { name: "jumlah_pelanggan_domestik", label: "Jumlah Pelanggan Domestik" }
      ];
      
    case "efisiensi_produksi":
      return [
        { name: "volume_produksi", label: "Volume Produksi Riil (m³)" },
        { name: "kapasitas_terpasang", label: "Kapasitas Terpasang (m³)" }
      ];
      
    case "tingkat_kehilangan_air":
      return [
        { name: "distribusi_air", label: "Distribusi Air (m³)" },
        { name: "air_terjual", label: "Air Terjual (m³)" }
      ];
      
    case "jam_operasi_layanan":
      return [
        { name: "waktu_distribusi", label: "Waktu Distribusi Air ke Pelanggan 1 Tahun (jam)" }
      ];
      
    case "tekanan_air_samb_pelanggan":
      return [
        { name: "pelanggan_tekanan_baik", label: "Jumlah Pelanggan Dilayani Tekanan > 0,7 Bar" },
        { name: "jumlah_pelanggan_total", label: "Jumlah Pelanggan Total" }
      ];
      
    case "penggantian_meter_air":
      return [
        { name: "meter_diganti", label: "Jumlah Meter Diganti/Dikalibrasi" },
        { name: "jumlah_pelanggan", label: "Jumlah Pelanggan" }
      ];
      
    case "rasio_pegawai_per_1000_pelanggan":
      return [
        { name: "jumlah_pegawai", label: "Jumlah Pegawai" },
        { name: "jumlah_pelanggan", label: "Jumlah Pelanggan" }
      ];
      
    case "ratio_diklat_pegawai":
      return [
        { name: "pegawai_ikut_diklat", label: "Jumlah Pegawai Ikut Diklat" },
        { name: "jumlah_pegawai_total", label: "Jumlah Pegawai Total" }
      ];
      
    case "biaya_diklat_terhadap_biaya":
      return [
        { name: "biaya_diklat", label: "Biaya Diklat" },
        { name: "biaya_pegawai", label: "Biaya Pegawai" }
      ];
      
    default:
      return [];
  }
};
