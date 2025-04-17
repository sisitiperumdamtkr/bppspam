/**
 * Interface untuk input formula
 */
interface FormulaInput {
  name: string;
  label: string;
}

/**
 * Mendapatkan input formula berdasarkan ID indikator
 * @param indicatorId ID indikator
 * @returns Daftar input formula
 */
export const getFormulaInputs = (indicatorId: string): FormulaInput[] => {
  switch (indicatorId) {
    case "ROE":
      return [
        { name: "labaBersih", label: "Laba Bersih" },
        { name: "ekuitas", label: "Jumlah Ekuitas" },
      ];
    case "RasioOperasi":
      return [
        { name: "biayaOperasi", label: "Biaya Operasi" },
        { name: "pendapatanOperasi", label: "Pendapatan Operasi" },
      ];
    case "CashRatio":
      return [
        { name: "kas", label: "Kas" },
        { name: "setaraKas", label: "Setara Kas" },
        { name: "utangLancar", label: "Utang Lancar" },
      ];
    case "EfektifitasPenagihan":
      return [
        { name: "penerimaanRekAir", label: "Jumlah Penerimaan Rekening Air" },
        { name: "jumlahRekeningAir", label: "Jumlah Rekening Air" },
      ];
    case "Solvabilitas":
      return [
        { name: "totalAktiva", label: "Total Aktiva" },
        { name: "totalUtang", label: "Total Utang" },
      ];
    case "CakupanPelayananTeknis":
      return [
        { name: "pendudukTerlayani", label: "Jumlah Penduduk Terlayani" },
        { name: "totalPenduduk", label: "Jumlah Penduduk" },
      ];
    case "PertumbuhanPelanggan":
      return [
        { name: "pelangganTahunIni", label: "Jumlah Pelanggan Tahun Ini" },
        { name: "pelangganTahunLalu", label: "Jumlah Pelanggan Tahun Lalu" },
      ];
    case "TingkatPenyelesaianAduan":
      return [
        { name: "aduanSelesai", label: "Jumlah Aduan Selesai" },
        { name: "totalAduan", label: "Jumlah Total Aduan" },
      ];
    case "KualitasAirPelanggan":
      return [
        { name: "ujiMemenuhi", label: "Jumlah Uji Yang Memenuhi Syarat" },
        { name: "totalUji", label: "Jumlah Total Pengujian" },
      ];
    case "KonsumsiAirDomestik":
      return [
        { name: "airTerjualDomestik", label: "Air Terjual Domestik (m³/tahun)" },
        { name: "pelangganDomestik", label: "Jumlah Pelanggan Domestik" },
      ];
    case "EfisiensiProduksi":
      return [
        { name: "produksiRiil", label: "Volume Produksi Riil (m³)" },
        { name: "kapasitasTerpasang", label: "Kapasitas Terpasang (m³)" },
      ];
    case "TingkatKehilanganAir":
      return [
        { name: "distribusiAir", label: "Distribusi Air (m³)" },
        { name: "airTerjual", label: "Air Terjual (m³)" },
      ];
    case "JamOperasiLayanan":
      return [
        { name: "totalJamOperasi", label: "Total Jam Operasi Dalam Setahun" },
      ];
    case "TekananAirSambPelanggan":
      return [
        { name: "pelangganTekananBaik", label: "Pelanggan Tekanan > 0.7 Bar" },
        { name: "totalPelanggan", label: "Jumlah Total Pelanggan" },
      ];
    case "PenggantianMeterAir":
      return [
        { name: "meterDiganti", label: "Meter Air yang Diganti" },
        { name: "jumlahPelanggan", label: "Jumlah Total Pelanggan" },
      ];
    case "RasioJumlahPegawai":
      return [
        { name: "jumlahPegawai", label: "Jumlah Pegawai" },
        { name: "pelanggan", label: "Jumlah Pelanggan" },
      ];
    case "RatioDiklatPegawai":
      return [
        { name: "pegawaiDiklat", label: "Pegawai yang Mengikuti Diklat" },
        { name: "totalPegawai", label: "Jumlah Total Pegawai" },
      ];
    case "BiayaDiklatTerhadapBiaya":
      return [
        { name: "biayaDiklat", label: "Biaya Diklat" },
        { name: "biayaPegawai", label: "Total Biaya Pegawai" },
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
  if (!inputs || Object.keys(inputs).length === 0) {
    console.error(`Input tidak tersedia untuk indikator: ${indicatorId}`);
    return 0;
  }

  switch (indicatorId) {
    case "ROE":
      return safeDivide(inputs.labaBersih, inputs.ekuitas) * 100;

    case "RasioOperasi":
      return safeDivide(inputs.biayaOperasi, inputs.pendapatanOperasi);

    case "CashRatio":
      return safeDivide(inputs.kas + inputs.setaraKas, inputs.utangLancar) * 100;

    case "EfektifitasPenagihan":
      return safeDivide(inputs.penerimaanRekAir, inputs.jumlahRekeningAir) * 100;

    case "Solvabilitas":
      return safeDivide(inputs.totalAktiva, inputs.totalUtang) * 100;

    case "CakupanPelayananTeknis":
      return safeDivide(inputs.pendudukTerlayani, inputs.totalPenduduk) * 100;

    case "PertumbuhanPelanggan":
      return safeDivide(inputs.pelangganTahunIni, inputs.pelangganTahunLalu) * 100;

    case "TingkatPenyelesaianAduan":
      return safeDivide(inputs.aduanSelesai, inputs.totalAduan) * 100;

    case "KualitasAirPelanggan":
      return safeDivide(inputs.ujiMemenuhi, inputs.totalUji) * 100;

    case "KonsumsiAirDomestik":
      return safeDivide(inputs.airTerjualDomestik / 12, inputs.pelangganDomestik);

    case "EfisiensiProduksi":
      return safeDivide(inputs.produksiRiil, inputs.kapasitasTerpasang) * 100;

    case "TingkatKehilanganAir":
      return safeDivide(inputs.distribusiAir, inputs.airTerjual) * 100;

    case "JamOperasiLayanan":
      return safeDivide(inputs.totalJamOperasi, 365);

    case "TekananAirSambPelanggan":
      return safeDivide(inputs.pelangganTekananBaik, inputs.totalPelanggan) * 100;

    case "PenggantianMeterAir":
      return safeDivide(inputs.meterDiganti, inputs.jumlahPelanggan) * 100;

    case "RasioJumlahPegawai":
      return safeDivide(inputs.jumlahPegawai, inputs.pelanggan);

    case "RatioDiklatPegawai":
      return safeDivide(inputs.pegawaiDiklat, inputs.totalPegawai) * 100;

    case "BiayaDiklatTerhadapBiaya":
      return safeDivide(inputs.biayaDiklat, inputs.biayaPegawai) * 100;

    default:
      console.warn(`Indikator tidak dikenali: ${indicatorId}`);
      return 0;
  }
};

/**
 * Fungsi pembagi aman untuk menghindari pembagian dengan nol
 */
const safeDivide = (a?: number, b?: number): number => {
  return b && b !== 0 ? (a ?? 0) / b : 0;
};