
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
    // ASPEK KEUANGAN
    case "rasio_laba_terhadap_aktiva_produktif":
      if (!inputs.laba_sebelum_pajak || !inputs.aktiva_produktif) return 0;
      return (inputs.laba_sebelum_pajak / inputs.aktiva_produktif) * 100;
      
    case "peningkatan_rasio_laba_terhadap_aktiva":
      if (!inputs.rasio_tahun_ini || inputs.rasio_tahun_lalu === undefined) return 0;
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
      
    case "rasio_laba_terhadap_penjualan":
      if (!inputs.laba_sebelum_pajak || !inputs.pendapatan_operasi) return 0;
      return (inputs.laba_sebelum_pajak / inputs.pendapatan_operasi) * 100;
      
    case "peningkatan_rasio_laba_terhadap_penjualan":
      if (!inputs.rasio_tahun_ini || inputs.rasio_tahun_lalu === undefined) return 0;
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
      
    case "rasio_aktiva_lancar":
      if (!inputs.aktiva_lancar || !inputs.utang_lancar) return 0;
      return inputs.aktiva_lancar / inputs.utang_lancar;
      
    case "rasio_utang_jangka_panjang":
      if (!inputs.utang_jangka_panjang || !inputs.ekuitas) return 0;
      return inputs.utang_jangka_panjang / inputs.ekuitas;
      
    case "rasio_total_aktiva":
      if (!inputs.total_aktiva || !inputs.total_utang) return 0;
      return inputs.total_aktiva / inputs.total_utang;
      
    case "rasio_biaya_operasi":
      if (!inputs.total_biaya_operasi || !inputs.total_pendapatan_operasi) return 0;
      return inputs.total_biaya_operasi / inputs.total_pendapatan_operasi;
      
    case "rasio_laba_operasi":
      if (!inputs.laba_operasi_sebelum_penyusutan || !inputs.angsuran_pokok) return 0;
      return inputs.laba_operasi_sebelum_penyusutan / inputs.angsuran_pokok;
      
    case "rasio_aktiva_produktif":
      if (!inputs.aktiva_produktif || !inputs.penjualan_air) return 0;
      return inputs.aktiva_produktif / inputs.penjualan_air;
      
    case "jangka_waktu_penagihan":
      if (!inputs.piutang_usaha || !inputs.penjualan_perhari) return 0;
      return inputs.piutang_usaha / inputs.penjualan_perhari;
      
    case "efektivitas_penagihan":
      if (!inputs.rekening_tertagih || !inputs.penjualan_air) return 0;
      return (inputs.rekening_tertagih / inputs.penjualan_air) * 100;
      
    // ASPEK OPERASIONAL
    case "cakupan_pelayanan":
      if (!inputs.penduduk_terlayani || !inputs.jumlah_penduduk) return 0;
      return (inputs.penduduk_terlayani / inputs.jumlah_penduduk) * 100;
      
    case "peningkatan_cakupan_pelayanan":
      if (!inputs.cakupan_tahun_ini || inputs.cakupan_tahun_lalu === undefined) return 0;
      return inputs.cakupan_tahun_ini - inputs.cakupan_tahun_lalu;
      
    case "kualitas_air_distribusi":
      // Radio button return value: 0, 1, 2, 3
      return inputs.kualitas_air !== undefined ? inputs.kualitas_air : 0;
      
    case "kontinuitas_air":
      // Radio button return value: 1, 2
      return inputs.kontinuitas !== undefined ? inputs.kontinuitas : 0;
      
    case "produktivitas_pemanfaatan":
      if (!inputs.kapasitas_produksi || !inputs.kapasitas_terpasang) return 0;
      return (inputs.kapasitas_produksi / inputs.kapasitas_terpasang) * 100;
      
    case "tingkat_kehilangan_air":
      if (!inputs.air_didistribusikan || !inputs.air_terjual) return 0;
      return ((inputs.air_didistribusikan - inputs.air_terjual) / inputs.air_didistribusikan) * 100;
      
    case "penurunan_kehilangan_air":
      if (!inputs.rasio_tahun_ini || inputs.rasio_tahun_lalu === undefined) return 0;
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
      
    case "peneraan_meter":
      if (!inputs.pelanggan_ditera || !inputs.total_pelanggan) return 0;
      return (inputs.pelanggan_ditera / inputs.total_pelanggan) * 100;
      
    case "kecepatan_penyambungan":
      // Radio button return value: 1, 2
      return inputs.kecepatan !== undefined ? inputs.kecepatan : 0;
      
    // ASPEK ADMINISTRASI
    case "rencana_jangka_panjang":
      // Radio button return value: 1, 2, 3, 4
      return inputs.nilai !== undefined ? inputs.nilai : 0;
      
    case "rencana_organisasi":
      // Radio button return value: 1, 2, 3, 4
      return inputs.nilai !== undefined ? inputs.nilai : 0;
      
    case "prosedur_operasi":
      // Radio button return value: 1, 2, 3, 4
      return inputs.nilai !== undefined ? inputs.nilai : 0;
      
    case "gambar_nyata_laksana":
      // Radio button return value: 1, 2, 3, 4
      return inputs.nilai !== undefined ? inputs.nilai : 0;
      
    case "pedoman_penilaian_kinerja":
      // Radio button return value: 1, 2, 3, 4
      return inputs.nilai !== undefined ? inputs.nilai : 0;
      
    case "rencana_kerja":
      // Radio button return value: 1, 2, 3, 4
      return inputs.nilai !== undefined ? inputs.nilai : 0;
      
    default:
      console.error(`Unknown indicator ID: ${indicatorId}`);
      return 0;
  }
};

/**
 * Mendapatkan input yang diperlukan untuk formula berdasarkan ID indikator
 * @param indicatorId ID indikator
 * @returns Array dari nama input dan label
 */
export const getKemendagriFormulaInputs = (indicatorId: string) => {
  switch (indicatorId) {
    // ASPEK KEUANGAN
    case "rasio_laba_terhadap_aktiva_produktif":
      return [
        { name: "laba_sebelum_pajak", label: "Laba Sebelum Pajak" },
        { name: "aktiva_produktif", label: "Aktiva Produktif" }
      ];
      
    case "peningkatan_rasio_laba_terhadap_aktiva":
      return [
        { name: "rasio_tahun_ini", label: "Rasio Laba Terhadap Aktiva Produktif Tahun Ini" },
        { name: "rasio_tahun_lalu", label: "Rasio Laba Terhadap Aktiva Produktif Tahun Lalu" }
      ];
      
    case "rasio_laba_terhadap_penjualan":
      return [
        { name: "laba_sebelum_pajak", label: "Laba Sebelum Pajak" },
        { name: "pendapatan_operasi", label: "Pendapatan Operasi" }
      ];
      
    case "peningkatan_rasio_laba_terhadap_penjualan":
      return [
        { name: "rasio_tahun_ini", label: "Rasio Laba Terhadap Penjualan Tahun Ini" },
        { name: "rasio_tahun_lalu", label: "Rasio Laba Terhadap Penjualan Tahun Lalu" }
      ];
      
    case "rasio_aktiva_lancar":
      return [
        { name: "aktiva_lancar", label: "Aktiva Lancar" },
        { name: "utang_lancar", label: "Utang Lancar" }
      ];
      
    case "rasio_utang_jangka_panjang":
      return [
        { name: "utang_jangka_panjang", label: "Utang Jangka Panjang" },
        { name: "ekuitas", label: "Ekuitas" }
      ];
      
    case "rasio_total_aktiva":
      return [
        { name: "total_aktiva", label: "Total Aktiva" },
        { name: "total_utang", label: "Total Utang" }
      ];
      
    case "rasio_biaya_operasi":
      return [
        { name: "total_biaya_operasi", label: "Total Biaya Operasi" },
        { name: "total_pendapatan_operasi", label: "Total Pendapatan Operasi" }
      ];
      
    case "rasio_laba_operasi":
      return [
        { name: "laba_operasi_sebelum_penyusutan", label: "Laba Operasi Sebelum Biaya Penyusutan" },
        { name: "angsuran_pokok", label: "Angsuran Pokok" }
      ];
      
    case "rasio_aktiva_produktif":
      return [
        { name: "aktiva_produktif", label: "Aktiva Produktif" },
        { name: "penjualan_air", label: "Penjualan Air" }
      ];
      
    case "jangka_waktu_penagihan":
      return [
        { name: "piutang_usaha", label: "Piutang Usaha" },
        { name: "penjualan_perhari", label: "Jumlah Penjualan Perhari" }
      ];
      
    case "efektivitas_penagihan":
      return [
        { name: "rekening_tertagih", label: "Rekening Tertagih" },
        { name: "penjualan_air", label: "Penjualan Air" }
      ];
      
    // ASPEK OPERASIONAL
    case "cakupan_pelayanan":
      return [
        { name: "penduduk_terlayani", label: "Jumlah Penduduk Terlayani" },
        { name: "jumlah_penduduk", label: "Jumlah Penduduk" }
      ];
      
    case "peningkatan_cakupan_pelayanan":
      return [
        { name: "cakupan_tahun_ini", label: "Cakupan Pelayanan Tahun Ini" },
        { name: "cakupan_tahun_lalu", label: "Cakupan Pelayanan Tahun Lalu" }
      ];
      
    case "kualitas_air_distribusi":
      return [
        { name: "kualitas_air", label: "Kualitas Air Distribusi", type: "radio", options: [
          { value: 0, label: "Tidak Dilakukan Tes" },
          { value: 1, label: "Tidak Memenuhi Syarat" },
          { value: 2, label: "Memenuhi Syarat Air Bersih" },
          { value: 3, label: "Memenuhi Syarat Air Minum" }
        ]}
      ];
      
    case "kontinuitas_air":
      return [
        { name: "kontinuitas", label: "Kontinuitas Air", type: "radio", options: [
          { value: 1, label: "Tidak Semua Pelanggan Mendapat Aliran 24 Jam" },
          { value: 2, label: "Semua Pelanggan Mendapat Aliran Air 24 Jam" }
        ]}
      ];
      
    case "produktivitas_pemanfaatan":
      return [
        { name: "kapasitas_produksi", label: "Kapasitas Produksi" },
        { name: "kapasitas_terpasang", label: "Kapasitas Terpasang" }
      ];
      
    case "tingkat_kehilangan_air":
      return [
        { name: "air_didistribusikan", label: "Jumlah Air Didistribusikan" },
        { name: "air_terjual", label: "Air Terjual" }
      ];
      
    case "penurunan_kehilangan_air":
      return [
        { name: "rasio_tahun_ini", label: "Rasio Kehilangan Air Tahun Ini" },
        { name: "rasio_tahun_lalu", label: "Rasio Kehilangan Air Tahun Lalu" }
      ];
      
    case "peneraan_meter":
      return [
        { name: "pelanggan_ditera", label: "Jumlah Pelanggan yang Di Tera" },
        { name: "total_pelanggan", label: "Jumlah Total Pelanggan" }
      ];
      
    case "kecepatan_penyambungan":
      return [
        { name: "kecepatan", label: "Kecepatan Penyambungan", type: "radio", options: [
          { value: 1, label: "> 6 Hari" },
          { value: 2, label: "<= 6 Hari" }
        ]}
      ];
      
    // ASPEK ADMINISTRASI
    case "rencana_jangka_panjang":
    case "rencana_organisasi":
    case "prosedur_operasi":
    case "gambar_nyata_laksana":
    case "pedoman_penilaian_kinerja":
    case "rencana_kerja":
      return [
        { name: "nilai", label: "Pilihan", type: "radio", options: [
          { value: 1, label: "Belum Memiliki (D)" },
          { value: 2, label: "Memiliki (C)" },
          { value: 3, label: "Sebagian Di Pedomani (B)" },
          { value: 4, label: "Sepenuhnya Di Pedomani (A)" }
        ]}
      ];
      
    default:
      return [];
  }
};

/**
 * Menghitung total tertimbang untuk setiap kategori
 * @param values Nilai-nilai indikator
 * @param category Kategori yang akan dihitung
 * @returns Total nilai tertimbang untuk kategori
 */
export const calculateKemendagriAspectScore = (
  values: Record<string, { value: number, score: number }>,
  category: string
) => {
  // Hitung total nilai untuk kategori
  const categoryIndicators = kemendagriIndicators.filter(
    (indicator) => indicator.category === category
  );
  
  let totalScore = 0;
  let maxCategoryScore = 0;
  
  categoryIndicators.forEach(indicator => {
    if (values[indicator.id]) {
      totalScore += values[indicator.id].score;
    }
    // Skor maksimum untuk kategori: jumlah indikator * 5 (nilai maks per indikator)
    maxCategoryScore += 5;
  });
  
  // Normalisasi skor berdasarkan kategori
  switch (category) {
    case "Keuangan":
      // Total aspek keuangan: total aspek/60*45
      return (totalScore / maxCategoryScore) * 45;
    case "Operasional":
      // Total aspek operasional: total aspek/47*40
      return (totalScore / maxCategoryScore) * 40;
    case "Administrasi":
      // Total aspek administrasi: total aspek/24*15
      return (totalScore / maxCategoryScore) * 15;
    default:
      return totalScore;
  }
};
