
/**
 * Menghitung nilai berdasarkan formula untuk indikator tertentu
 * @param indicatorId ID indikator
 * @param inputs Inputan untuk formula
 * @returns Nilai yang dihitung
 */
export const calculateKemendagriFormulaValue = (
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
