
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
      
    case "ratio_laba_terhadap_penjualan":
      if (!inputs.laba_sebelum_pajak || !inputs.pendapatan_operasi) return 0;
      return (inputs.laba_sebelum_pajak / inputs.pendapatan_operasi) * 100;
      
    case "peningkatan_ratio_laba_penjualan":
      if (!inputs.rasio_tahun_ini || !inputs.rasio_tahun_lalu) return 0;
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
      
    case "ratio_aktiva_lancar_utang_lancar":
      if (!inputs.aktiva_lancar || !inputs.utang_lancar) return 0;
      return inputs.aktiva_lancar / inputs.utang_lancar;
      
    case "rasio_utang_jangka_panjang_ekuitas":
      if (!inputs.utang_jangka_panjang || !inputs.ekuitas) return 0;
      return inputs.utang_jangka_panjang / inputs.ekuitas;
      
    case "rasio_total_aktiva_total_utang":
      if (!inputs.total_aktiva || !inputs.total_utang) return 0;
      return inputs.total_aktiva / inputs.total_utang;
      
    case "rasio_biaya_operasi_pendapatan_operasi":
      if (!inputs.biaya_operasi || !inputs.pendapatan_operasi) return 0;
      return inputs.biaya_operasi / inputs.pendapatan_operasi;
      
    case "ratio_laba_operasi_angsuran":
      if (!inputs.laba_operasi || !(inputs.angsuran_pokok + inputs.bunga_jatuh_tempo)) return 0;
      return inputs.laba_operasi / (inputs.angsuran_pokok + inputs.bunga_jatuh_tempo);
      
    case "ratio_aktiva_produktif_penjualan_air":
      if (!inputs.aktiva_produktif || !inputs.penjualan_air) return 0;
      return inputs.aktiva_produktif / inputs.penjualan_air;
      
    case "jangka_waktu_penagihan_piutang":
      if (!inputs.piutang_usaha || !inputs.penjualan_per_hari) return 0;
      return inputs.piutang_usaha / inputs.penjualan_per_hari;
      
    case "efektifitas_penagihan":
      if (!inputs.rekening_tertagih || !inputs.penjualan_air) return 0;
      return (inputs.rekening_tertagih / inputs.penjualan_air) * 100;
      
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

/**
 * Mengembalikan daftar input yang diperlukan untuk formula berdasarkan ID indikator
 * @param indicatorId ID indikator
 * @returns Array dari objek dengan nama dan label input
 */
export const getKemendagriFormulaInputs = (indicatorId: string) => {
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
      
    case "ratio_laba_terhadap_penjualan":
      return [
        { name: "laba_sebelum_pajak", label: "Laba Sebelum Pajak" },
        { name: "pendapatan_operasi", label: "Pendapatan Operasi" }
      ];
      
    case "peningkatan_ratio_laba_penjualan":
      return [
        { name: "rasio_tahun_ini", label: "Ratio Laba Terhadap Penjualan Tahun Ini (%)" },
        { name: "rasio_tahun_lalu", label: "Ratio Laba Terhadap Penjualan Tahun Lalu (%)" }
      ];
      
    case "ratio_aktiva_lancar_utang_lancar":
      return [
        { name: "aktiva_lancar", label: "Aktiva Lancar" },
        { name: "utang_lancar", label: "Utang Lancar" }
      ];
      
    case "rasio_utang_jangka_panjang_ekuitas":
      return [
        { name: "utang_jangka_panjang", label: "Utang Jangka Panjang" },
        { name: "ekuitas", label: "Ekuitas" }
      ];
      
    case "rasio_total_aktiva_total_utang":
      return [
        { name: "total_aktiva", label: "Total Aktiva" },
        { name: "total_utang", label: "Total Utang" }
      ];
      
    case "rasio_biaya_operasi_pendapatan_operasi":
      return [
        { name: "biaya_operasi", label: "Total Biaya Operasi" },
        { name: "pendapatan_operasi", label: "Total Pendapatan Operasi" }
      ];
      
    case "ratio_laba_operasi_angsuran":
      return [
        { name: "laba_operasi", label: "Laba Operasi" },
        { name: "angsuran_pokok", label: "Angsuran Pokok" },
        { name: "bunga_jatuh_tempo", label: "Bunga Jatuh Tempo" }
      ];
      
    case "ratio_aktiva_produktif_penjualan_air":
      return [
        { name: "aktiva_produktif", label: "Aktiva Produktif" },
        { name: "penjualan_air", label: "Penjualan Air" }
      ];
      
    case "jangka_waktu_penagihan_piutang":
      return [
        { name: "piutang_usaha", label: "Piutang Usaha" },
        { name: "penjualan_per_hari", label: "Jumlah Penjualan per Hari" }
      ];
      
    case "efektifitas_penagihan":
      return [
        { name: "rekening_tertagih", label: "Rekening Tertagih" },
        { name: "penjualan_air", label: "Penjualan Air" }
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
        { name: "uji_memenuhi_syarat", label: "Jumlah Uji Kualitas yang Memenuhi Syarat" },
        { name: "jumlah_diuji", label: "Jumlah yang Diuji" }
      ];
      
    case "konsumsi_air_domestik":
      return [
        { name: "air_terjual_domestik", label: "Jumlah Air yang Terjual Domestik Setahun" },
        { name: "jumlah_pelanggan_domestik", label: "Jumlah Pelanggan Domestik" }
      ];
      
    case "efisiensi_produksi":
      return [
        { name: "volume_produksi", label: "Volume Produksi Riil (m3)" },
        { name: "kapasitas_terpasang", label: "Kapasitas Terpasang (m3)" }
      ];
      
    case "tingkat_kehilangan_air":
      return [
        { name: "distribusi_air", label: "Distribusi Air" },
        { name: "air_terjual", label: "Air Terjual" }
      ];
      
    case "jam_operasi_layanan":
      return [
        { name: "waktu_distribusi", label: "Waktu Distribusi Air ke Pelanggan 1 Tahun" }
      ];
      
    case "tekanan_air_samb_pelanggan":
      return [
        { name: "pelanggan_tekanan_baik", label: "Jumlah Pelanggan Dilayani dengan Tekanan > 0.7 Bar" },
        { name: "jumlah_pelanggan_total", label: "Jumlah Pelanggan" }
      ];
      
    case "penggantian_meter_air":
      return [
        { name: "meter_diganti", label: "Jumlah Meter yang Diganti atau Dikalibrasi" },
        { name: "jumlah_pelanggan", label: "Jumlah Pelanggan" }
      ];
      
    case "rasio_pegawai_per_1000_pelanggan":
      return [
        { name: "jumlah_pegawai", label: "Jumlah Pegawai" },
        { name: "jumlah_pelanggan", label: "Jumlah Pelanggan" }
      ];
      
    case "ratio_diklat_pegawai":
      return [
        { name: "pegawai_ikut_diklat", label: "Jumlah Pegawai yang Ikut Diklat" },
        { name: "jumlah_pegawai_total", label: "Jumlah Pegawai" }
      ];
      
    case "biaya_diklat_terhadap_biaya":
      return [
        { name: "biaya_diklat", label: "Biaya Diklat" },
        { name: "biaya_pegawai", label: "Biaya Pegawai" }
      ];
      
    default:
      console.error(`Unknown indicator ID for inputs: ${indicatorId}`);
      return [];
  }
};
