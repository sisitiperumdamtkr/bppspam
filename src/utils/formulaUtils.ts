
interface FormulaInput {
  name: string;
  label: string;
}

// Fungsi helper untuk mendapatkan input formula
export const getFormulaInputs = (indicatorId: string): FormulaInput[] => {
  switch (indicatorId) {
    case "roe":
      return [
        { name: "labaBersih", label: "Laba Bersih" },
        { name: "ekuitas", label: "Jumlah Ekuitas" },
      ];
    case "rasio_operasi":
      return [
        { name: "biayaOperasi", label: "Biaya Operasi" },
        { name: "pendapatanOperasi", label: "Pendapatan Operasi" },
      ];
    case "cash_ratio":
      return [
        { name: "kas", label: "Kas" },
        { name: "setaraKas", label: "Setara Kas" },
        { name: "utangLancar", label: "Utang Lancar" },
      ];
    case "efektivitas_penagihan":
      return [
        { name: "penerimaanRekAir", label: "Jumlah Penerimaan Rekening Air" },
        { name: "jumlahRekeningAir", label: "Jumlah Rekening Air" },
      ];
    case "solvabilitas":
      return [
        { name: "totalAktiva", label: "Total Aktiva" },
        { name: "totalUtang", label: "Total Utang" },
      ];
    case "cakupan_pelayanan":
      return [
        { name: "pendudukTerlayani", label: "Jumlah Penduduk Terlayani" },
        { name: "totalPenduduk", label: "Jumlah Penduduk" },
      ];
    case "pertumbuhan_pelanggan":
      return [
        { name: "pelangganTahunIni", label: "Jumlah Pelanggan Tahun Ini" },
        { name: "pelangganTahunLalu", label: "Jumlah Pelanggan Tahun Lalu" },
      ];
    case "penyelesaian_aduan":
      return [
        { name: "aduanSelesai", label: "Jumlah Aduan Selesai" },
        { name: "totalAduan", label: "Jumlah Total Aduan" },
      ];
    case "kualitas_air":
      return [
        { name: "ujiMemenuhi", label: "Jumlah Uji Yang Memenuhi Syarat" },
        { name: "totalUji", label: "Jumlah Total Pengujian" },
      ];
    case "konsumsi_air":
      return [
        { name: "airTerjualDomestik", label: "Air Terjual Domestik (m³/tahun)" },
        { name: "pelangganDomestik", label: "Jumlah Pelanggan Domestik" },
      ];
    case "efisiensi_produksi":
      return [
        { name: "produksiRiil", label: "Volume Produksi Riil (m³)" },
        { name: "kapasitasTerpasang", label: "Kapasitas Terpasang (m³)" },
      ];
    case "tingkat_kehilangan_air":
      return [
        { name: "distribusiAir", label: "Distribusi Air (m³)" },
        { name: "airTerjual", label: "Air Terjual (m³)" },
      ];
    case "jam_operasi":
      return [
        { name: "totalJamOperasi", label: "Total Jam Operasi Dalam Setahun" },
      ];
    case "tekanan_air":
      return [
        { name: "pelangganTekananBaik", label: "Jumlah Pelanggan dengan Tekanan > 0.7 Bar" },
        { name: "totalPelanggan", label: "Jumlah Total Pelanggan" },
      ];
    case "penggantian_meter":
      return [
        { name: "meterDiganti", label: "Jumlah Meter Air yang Diganti" },
        { name: "jumlahPelanggan", label: "Jumlah Total Pelanggan" },
      ];
    case "rasio_pegawai":
      return [
        { name: "jumlahPegawai", label: "Jumlah Pegawai" },
        { name: "pelanggan", label: "Jumlah Pelanggan" },
      ];
    case "rasio_diklat":
      return [
        { name: "pegawaiDiklat", label: "Jumlah Pegawai yang Mengikuti Diklat" },
        { name: "totalPegawai", label: "Jumlah Total Pegawai" },
      ];
    case "biaya_diklat":
      return [
        { name: "biayaDiklat", label: "Biaya Diklat" },
        { name: "biayaPegawai", label: "Total Biaya Pegawai" },
      ];
    default:
      return [];
  }
};

// Helper function to calculate value based on inputs
export const calculateFormulaValue = (
  indicatorId: string,
  inputs: Record<string, number>
): number => {
  let calculatedValue = 0;
  
  switch (indicatorId) {
    case "roe":
      if (inputs.labaBersih !== undefined && inputs.ekuitas !== undefined && inputs.ekuitas !== 0) {
        calculatedValue = (inputs.labaBersih / inputs.ekuitas) * 100;
      }
      break;
    
    case "rasio_operasi":
      if (inputs.biayaOperasi !== undefined && inputs.pendapatanOperasi !== undefined && inputs.pendapatanOperasi !== 0) {
        calculatedValue = inputs.biayaOperasi / inputs.pendapatanOperasi;
      }
      break;
    
    case "cash_ratio":
      if (inputs.kas !== undefined && inputs.setaraKas !== undefined && inputs.utangLancar !== undefined && inputs.utangLancar !== 0) {
        calculatedValue = ((inputs.kas + inputs.setaraKas) / inputs.utangLancar) * 100;
      }
      break;
    
    case "efektivitas_penagihan":
      if (inputs.penerimaanRekAir !== undefined && inputs.jumlahRekeningAir !== undefined && inputs.jumlahRekeningAir !== 0) {
        calculatedValue = (inputs.penerimaanRekAir / inputs.jumlahRekeningAir) * 100;
      }
      break;
    
    case "solvabilitas":
      if (inputs.totalAktiva !== undefined && inputs.totalUtang !== undefined && inputs.totalUtang !== 0) {
        calculatedValue = (inputs.totalAktiva / inputs.totalUtang) * 100;
      }
      break;
    
    case "cakupan_pelayanan":
      if (inputs.pendudukTerlayani !== undefined && inputs.totalPenduduk !== undefined && inputs.totalPenduduk !== 0) {
        calculatedValue = (inputs.pendudukTerlayani / inputs.totalPenduduk) * 100;
      }
      break;
    
    case "pertumbuhan_pelanggan":
      if (inputs.pelangganTahunIni !== undefined && inputs.pelangganTahunLalu !== undefined && inputs.pelangganTahunLalu !== 0) {
        calculatedValue = ((inputs.pelangganTahunIni - inputs.pelangganTahunLalu) / inputs.pelangganTahunLalu) * 100;
      }
      break;
    
    case "penyelesaian_aduan":
      if (inputs.aduanSelesai !== undefined && inputs.totalAduan !== undefined && inputs.totalAduan !== 0) {
        calculatedValue = (inputs.aduanSelesai / inputs.totalAduan) * 100;
      }
      break;
    
    case "kualitas_air":
      if (inputs.ujiMemenuhi !== undefined && inputs.totalUji !== undefined && inputs.totalUji !== 0) {
        calculatedValue = (inputs.ujiMemenuhi / inputs.totalUji) * 100;
      }
      break;
    
    case "konsumsi_air":
      if (inputs.airTerjualDomestik !== undefined && inputs.pelangganDomestik !== undefined && inputs.pelangganDomestik !== 0) {
        calculatedValue = (inputs.airTerjualDomestik / 12) / inputs.pelangganDomestik;
      }
      break;
    
    case "efisiensi_produksi":
      if (inputs.produksiRiil !== undefined && inputs.kapasitasTerpasang !== undefined && inputs.kapasitasTerpasang !== 0) {
        calculatedValue = (inputs.produksiRiil / inputs.kapasitasTerpasang) * 100;
      }
      break;
    
    case "tingkat_kehilangan_air":
      if (inputs.distribusiAir !== undefined && inputs.airTerjual !== undefined && inputs.distribusiAir !== 0) {
        calculatedValue = ((inputs.distribusiAir - inputs.airTerjual) / inputs.distribusiAir) * 100;
      }
      break;
    
    case "jam_operasi":
      if (inputs.totalJamOperasi !== undefined) {
        calculatedValue = inputs.totalJamOperasi / 365;
      }
      break;
    
    case "tekanan_air":
      if (inputs.pelangganTekananBaik !== undefined && inputs.totalPelanggan !== undefined && inputs.totalPelanggan !== 0) {
        calculatedValue = (inputs.pelangganTekananBaik / inputs.totalPelanggan) * 100;
      }
      break;
    
    case "penggantian_meter":
      if (inputs.meterDiganti !== undefined && inputs.jumlahPelanggan !== undefined && inputs.jumlahPelanggan !== 0) {
        calculatedValue = (inputs.meterDiganti / inputs.jumlahPelanggan) * 100;
      }
      break;
    
    case "rasio_pegawai":
      if (inputs.jumlahPegawai !== undefined && inputs.pelanggan !== undefined && inputs.pelanggan !== 0) {
        calculatedValue = (inputs.jumlahPegawai / inputs.pelanggan) * 1000;
      }
      break;
    
    case "rasio_diklat":
      if (inputs.pegawaiDiklat !== undefined && inputs.totalPegawai !== undefined && inputs.totalPegawai !== 0) {
        calculatedValue = (inputs.pegawaiDiklat / inputs.totalPegawai) * 100;
      }
      break;
    
    case "biaya_diklat":
      if (inputs.biayaDiklat !== undefined && inputs.biayaPegawai !== undefined && inputs.biayaPegawai !== 0) {
        calculatedValue = (inputs.biayaDiklat / inputs.biayaPegawai) * 100;
      }
      break;
    
    default:
      calculatedValue = 0;
  }
  
  return calculatedValue;
};
