
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
      
    case "peningkatan_rasio_laba_aktiva":
      return [
        { name: "rasio_tahun_ini", label: "Rasio Laba terhadap Aktiva Produktif Tahun Ini (%)" },
        { name: "rasio_tahun_lalu", label: "Rasio Laba terhadap Aktiva Produktif Tahun Lalu (%)" }
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

/**
 * Menghitung nilai berdasarkan formula untuk indikator tertentu
 * @param indicatorId ID indikator
 * @param inputs Inputan untuk formula
 * @returns Nilai yang dihitung
 */
export const calculateFormulaValue = (
  indicatorId: string,
  inputs: Record<string, number>
): number => {
  console.log(`Calculating formula value for: ${indicatorId}`, inputs);
  
  // Pastikan semua input yang diperlukan ada
  if (!inputs || Object.keys(inputs).length === 0) {
    console.error(`No inputs provided for formula: ${indicatorId}`);
    return 0;
  }
  
  // Hitung berdasarkan ID indikator
  switch (indicatorId) {
    case "rasio_laba_aktiva_produktif":
      if (!inputs.laba_sebelum_pajak || !inputs.aktiva_produktif) return 0;
      return (inputs.laba_sebelum_pajak / inputs.aktiva_produktif) * 100;
      
    case "peningkatan_rasio_laba_aktiva":
      if (!inputs.rasio_tahun_ini || !inputs.rasio_tahun_lalu) return 0;
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
      
    case "cash_ratio":
      if (!inputs.kas || !inputs.utang_lancar) return 0;
      return (inputs.kas / inputs.utang_lancar) * 100;
      
    case "efektifitas_penagihan":
      if (!inputs.penerimaan_rekening || !inputs.jumlah_rekening) return 0;
      return (inputs.penerimaan_rekening / inputs.jumlah_rekening) * 100;
      
    case "solvabilitas":
      if (!inputs.total_aktiva || !inputs.total_utang) return 0;
      return (inputs.total_aktiva / inputs.total_utang) * 100;
      
    case "cakupan_pelayanan_teknis":
      if (!inputs.penduduk_terlayani || !inputs.penduduk_wilayah) return 0;
      return (inputs.penduduk_terlayani / inputs.penduduk_wilayah) * 100;
      
    case "pertumbuhan_pelanggan":
      if (!inputs.pelanggan_tahun_ini || !inputs.pelanggan_tahun_lalu) return 0;
      return ((inputs.pelanggan_tahun_ini - inputs.pelanggan_tahun_lalu) / inputs.pelanggan_tahun_lalu) * 100;
      
    case "tingkat_penyelesaian_aduan":
      if (!inputs.pengaduan_selesai || !inputs.jumlah_pengaduan) return 0;
      return (inputs.pengaduan_selesai / inputs.jumlah_pengaduan) * 100;
      
    case "kualitas_air_pelanggan":
      if (!inputs.uji_memenuhi_syarat || !inputs.jumlah_diuji) return 0;
      return inputs.uji_memenuhi_syarat / inputs.jumlah_diuji;
      
    case "konsumsi_air_domestik":
      if (!inputs.air_terjual_domestik || !inputs.jumlah_pelanggan_domestik) return 0;
      return (inputs.air_terjual_domestik / 12) / inputs.jumlah_pelanggan_domestik;
      
    case "efisiensi_produksi":
      if (!inputs.volume_produksi || !inputs.kapasitas_terpasang) return 0;
      return (inputs.volume_produksi / inputs.kapasitas_terpasang) * 100;
      
    case "tingkat_kehilangan_air":
      if (!inputs.distribusi_air || !inputs.air_terjual) return 0;
      return ((inputs.distribusi_air - inputs.air_terjual) / inputs.distribusi_air) * 100;
      
    case "jam_operasi_layanan":
      if (!inputs.waktu_distribusi) return 0;
      return inputs.waktu_distribusi / 365;
      
    case "tekanan_air_samb_pelanggan":
      if (!inputs.pelanggan_tekanan_baik || !inputs.jumlah_pelanggan_total) return 0;
      return (inputs.pelanggan_tekanan_baik / inputs.jumlah_pelanggan_total) * 100;
      
    case "penggantian_meter_air":
      if (!inputs.meter_diganti || !inputs.jumlah_pelanggan) return 0;
      return (inputs.meter_diganti / inputs.jumlah_pelanggan) * 100;
      
    case "rasio_pegawai_per_1000_pelanggan":
      if (!inputs.jumlah_pegawai || !inputs.jumlah_pelanggan) return 0;
      return (inputs.jumlah_pegawai / inputs.jumlah_pelanggan) * 1000;
      
    case "ratio_diklat_pegawai":
      if (!inputs.pegawai_ikut_diklat || !inputs.jumlah_pegawai_total) return 0;
      return (inputs.pegawai_ikut_diklat / inputs.jumlah_pegawai_total) * 100;
      
    case "biaya_diklat_terhadap_biaya":
      if (!inputs.biaya_diklat || !inputs.biaya_pegawai) return 0;
      return (inputs.biaya_diklat / inputs.biaya_pegawai) * 100;
      
    default:
      console.error(`Unknown indicator ID: ${indicatorId}`);
      return 0;
  }
};
