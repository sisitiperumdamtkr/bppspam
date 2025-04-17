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
      
    case "cakupan_pelayanan":
      if (!inputs.penduduk_terlayani || !inputs.penduduk_total) return 0;
      return (inputs.penduduk_terlayani / inputs.penduduk_total) * 100;
      
    case "peningkatan_cakupan_pelayanan":
      if (!inputs.cakupan_tahun_ini || !inputs.cakupan_tahun_lalu) return 0;
      return inputs.cakupan_tahun_ini - inputs.cakupan_tahun_lalu;
      
    case "kualitas_air_distribusi":
      if (inputs.kualitas === undefined) return 0;
      return inputs.kualitas;
      
    case "kontinuitas_air":
      if (inputs.kontinuitas === undefined) return 0;
      return inputs.kontinuitas;
      
    case "produktifitas_pemanfaatan_instalasi":
      if (!inputs.kapasitas_produksi || !inputs.kapasitas_terpasang) return 0;
      return (inputs.kapasitas_produksi / inputs.kapasitas_terpasang) * 100;
      
    case "tingkat_kehilangan_air":
      if (!inputs.air_distribusi || !inputs.air_terjual) return 0;
      return (inputs.air_distribusi / inputs.air_terjual) * 100;
      
    case "penurunan_tingkat_kehilangan_air":
      if (!inputs.tingkat_tahun_ini || !inputs.tingkat_tahun_lalu) return 0;
      return inputs.tingkat_tahun_ini - inputs.tingkat_tahun_lalu;
      
    case "peneraan_meter":
      if (!inputs.pelanggan_tera || !inputs.pelanggan_total) return 0;
      return (inputs.pelanggan_tera / inputs.pelanggan_total) * 100;
      
    case "kecepatan_penyambungan_baru":
      if (inputs.kecepatan === undefined) return 0;
      return inputs.kecepatan;
      
    case "kemampuan_penanganan_pengaduan":
      if (!inputs.pengaduan_selesai || !inputs.pengaduan_total) return 0;
      return (inputs.pengaduan_selesai / inputs.pengaduan_total) * 100;
      
    case "kemudahan_pelayanan_service_point":
      if (inputs.ketersediaan === undefined) return 0;
      return inputs.ketersediaan;
      
    case "ratio_karyawan_per_1000_pelanggan":
      if (!inputs.jumlah_karyawan || !inputs.jumlah_pelanggan_aktif) return 0;
      return (inputs.jumlah_karyawan / inputs.jumlah_pelanggan_aktif) * 1000;
      
    case "ratio_diklat_pegawai":
      if (!inputs.pegawai_ikut_diklat || !inputs.jumlah_pegawai_total) return 0;
      return (inputs.pegawai_ikut_diklat / inputs.jumlah_pegawai_total) * 100;
      
    case "biaya_diklat_terhadap_biaya":
      if (!inputs.biaya_diklat || !inputs.biaya_pegawai) return 0;
      return (inputs.biaya_diklat / inputs.biaya_pegawai) * 100;
      
    case "rencana_jangka_panjang":
    case "rencana_organisasi":
    case "prosedur_operasi_standar":
    case "gambar_nyata_laksana":
    case "pedoman_penilaian_kinerja":
    case "rencana_kerja_anggaran":
    case "tertib_laporan_internal":
    case "tertib_laporan_eksternal":
    case "opini_auditor_independen":
    case "tindak_lanjut_hasil_pemeriksaan":
      if (inputs.nilai === undefined) return 0;
      return inputs.nilai;
      
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
      
    case "cakupan_pelayanan":
      return [
        { name: "penduduk_terlayani", label: "Jumlah Penduduk Terlayani" },
        { name: "penduduk_total", label: "Jumlah Penduduk" }
      ];
      
    case "peningkatan_cakupan_pelayanan":
      return [
        { name: "cakupan_tahun_ini", label: "Cakupan Pelayanan Tahun Ini (%)" },
        { name: "cakupan_tahun_lalu", label: "Cakupan Pelayanan Tahun Lalu (%)" }
      ];
      
    case "kualitas_air_distribusi":
      return [
        { name: "kualitas", label: "Kualitas (3=Air Minum, 2=Air Bersih, 1=Tidak Memenuhi Syarat, 0=Tidak Ditest)" }
      ];
      
    case "kontinuitas_air":
      return [
        { name: "kontinuitas", label: "Kontinuitas (2=Semua Pelanggan 24 jam, 1=Tidak Semua 24 jam)" }
      ];
      
    case "produktifitas_pemanfaatan_instalasi":
      return [
        { name: "kapasitas_produksi", label: "Kapasitas Produksi" },
        { name: "kapasitas_terpasang", label: "Kapasitas Terpasang" }
      ];
      
    case "tingkat_kehilangan_air":
      return [
        { name: "air_distribusi", label: "Jumlah Air Didistribusikan" },
        { name: "air_terjual", label: "Air Terjual" }
      ];
      
    case "penurunan_tingkat_kehilangan_air":
      return [
        { name: "tingkat_tahun_ini", label: "Tingkat Kehilangan Air Tahun Ini (%)" },
        { name: "tingkat_tahun_lalu", label: "Tingkat Kehilangan Air Tahun Lalu (%)" }
      ];
      
    case "peneraan_meter":
      return [
        { name: "pelanggan_tera", label: "Jumlah Pelanggan yang Di Tera" },
        { name: "pelanggan_total", label: "Jumlah Total Pelanggan" }
      ];
      
    case "kecepatan_penyambungan_baru":
      return [
        { name: "kecepatan", label: "Kecepatan (2=≤6 Hari, 1=>6 Hari)" }
      ];
      
    case "kemampuan_penanganan_pengaduan":
      return [
        { name: "pengaduan_selesai", label: "Jumlah Pengaduan yang Telah Selesai Ditangani" },
        { name: "pengaduan_total", label: "Jumlah Seluruh Pengaduan" }
      ];
      
    case "kemudahan_pelayanan_service_point":
      return [
        { name: "ketersediaan", label: "Ketersediaan (2=Tersedia, 1=Tidak Tersedia)" }
      ];
      
    case "ratio_karyawan_per_1000_pelanggan":
      return [
        { name: "jumlah_karyawan", label: "Jumlah Karyawan" },
        { name: "jumlah_pelanggan_aktif", label: "Jumlah Pelanggan Aktif" }
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
      
    case "rencana_jangka_panjang":
      return [
        { name: "nilai", label: "Nilai (1=Belum Memiliki \"D\", 2=Memiliki belum dipedomani \"C\", 3=Sebagian Dipedomani \"B\", 4=Sepenuhnya Dipedomani \"A\")" }
      ];
      
    case "rencana_organisasi":
      return [
        { name: "nilai", label: "Nilai (1=Belum Memiliki \"D\", 2=Memiliki belum dipedomani \"C\", 3=Sebagian Dipedomani \"B\", 4=Sepenuhnya Dipedomani \"A\")" }
      ];
      
    case "prosedur_operasi_standar":
      return [
        { name: "nilai", label: "Nilai (1=Belum Memiliki \"D\", 2=Memiliki belum dipedomani \"C\", 3=Sebagian Dipedomani \"B\", 4=Sepenuhnya Dipedomani \"A\")" }
      ];
      
    case "gambar_nyata_laksana":
      return [
        { name: "nilai", label: "Nilai (1=Belum Memiliki \"D\", 2=Memiliki belum dipedomani \"C\", 3=Sebagian Dipedomani \"B\", 4=Sepenuhnya Dipedomani \"A\")" }
      ];
      
    case "pedoman_penilaian_kinerja":
      return [
        { name: "nilai", label: "Nilai (1=Belum Memiliki \"D\", 2=Memiliki belum dipedomani \"C\", 3=Sebagian Dipedomani \"B\", 4=Sepenuhnya Dipedomani \"A\")" }
      ];
      
    case "rencana_kerja_anggaran":
      return [
        { name: "nilai", label: "Nilai (1=Belum Memiliki \"D\", 2=Memiliki belum dipedomani \"C\", 3=Sebagian Dipedomani \"B\", 4=Sepenuhnya Dipedomani \"A\")" }
      ];
      
    case "tertib_laporan_internal":
      return [
        { name: "nilai", label: "Nilai (1=Tidak Tepat Waktu, 2=Tepat Waktu)" }
      ];
      
    case "tertib_laporan_eksternal":
      return [
        { name: "nilai", label: "Nilai (1=Tidak Tepat Waktu, 2=Tepat Waktu)" }
      ];
      
    case "opini_auditor_independen":
      return [
        { name: "nilai", label: "Nilai (0=Not audit, 1=Adverse, 2=Disclaimer, 3=Qualified, 4=Unqualified)" }
      ];
      
    case "tindak_lanjut_hasil_pemeriksaan":
      return [
        { name: "nilai", label: "Nilai (1=Tidak Di-TL \"D\", 2=Di-TL Sebagian \"C\", 3=Di-TL Seluruhnya \"B\", 4=Tidak ada Temuan \"A\")" }
      ];
      
    default:
      console.error(`Unknown indicator ID for inputs: ${indicatorId}`);
      return [];
  }
};
