interface FormulaInput {
  name: string;
  label: string;
}

// Fungsi helper untuk mendapatkan input formula
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
        { name: "pelangganTekananBaik", label: "Jumlah Pelanggan dengan Tekanan > 0.7 Bar" },
        { name: "totalPelanggan", label: "Jumlah Total Pelanggan" },
      ];
    case "PenggantianMeterAir":
      return [
        { name: "meterDiganti", label: "Jumlah Meter Air yang Diganti" },
        { name: "jumlahPelanggan", label: "Jumlah Total Pelanggan" },
      ];
    case "RasioJumlahPegawai":
      return [
        { name: "jumlahPegawai", label: "Jumlah Pegawai" },
        { name: "pelanggan", label: "Jumlah Pelanggan" },
      ];
    case "RatioDiklatPegawai":
      return [
        { name: "pegawaiDiklat", label: "Jumlah Pegawai yang Mengikuti Diklat" },
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

// Helper function to calculate value based on inputs
export const calculateFormulaValue = (
  indicatorId: string,
  inputs: Record<string, number>
): number => {
  let calculatedValue = 0;
  
  switch (indicatorId) {
    case "ROE":
      if (inputs.labaBersih !== undefined && inputs.ekuitas !== undefined && inputs.ekuitas !== 0) {
        calculatedValue = (inputs.labaBersih / inputs.ekuitas) * 100;
      }
      break;
    
    case "RasioOperasi":
      if (inputs.biayaOperasi !== undefined && inputs.pendapatanOperasi !== undefined && inputs.pendapatanOperasi !== 0) {
        calculatedValue = inputs.biayaOperasi / inputs.pendapatanOperasi;
      }
      break;
    
    case "CashRatio":
      if (inputs.kas !== undefined && inputs.setaraKas !== undefined && inputs.utangLancar !== undefined && inputs.utangLancar !== 0) {
        calculatedValue = ((inputs.kas + inputs.setaraKas) / inputs.utangLancar) * 100;
      }
      break;
    
    case "EfektifitasPenagihan":
      if (inputs.penerimaanRekAir !== undefined && inputs.jumlahRekeningAir !== undefined && inputs.jumlahRekeningAir !== 0) {
        calculatedValue = (inputs.penerimaanRekAir / inputs.jumlahRekeningAir) * 100;
      }
      break;
    
    case "Solvabilitas":
      if (inputs.totalAktiva !== undefined && inputs.totalUtang !== undefined && inputs.totalUtang !== 0) {
        calculatedValue = (inputs.totalAktiva / inputs.totalUtang) * 100;
      }
      break;
    
    case "CakupanPelayananTeknis":
      if (inputs.pendudukTerlayani !== undefined && inputs.totalPenduduk !== undefined && inputs.totalPenduduk !== 0) {
        calculatedValue = (inputs.pendudukTerlayani / inputs.totalPenduduk) * 100;
      }
      break;
    
    case "PertumbuhanPelanggan":
      if (inputs.pelangganTahunIni !== undefined && inputs.pelangganTahunLalu !== undefined && inputs.pelangganTahunLalu !== 0) {
        calculatedValue = (inputs.pelangganTahunIni / inputs.pelangganTahunLalu) * 100;
      }
      break;
    
    case "TingkatPenyelesaianAduan":
      if (inputs.aduanSelesai !== undefined && inputs.totalAduan !== undefined && inputs.totalAduan !== 0) {
        calculatedValue = (inputs.aduanSelesai / inputs.totalAduan) * 100;
      }
      break;
    
    case "KualitasAirPelanggan":
      if (inputs.ujiMemenuhi !== undefined && inputs.totalUji !== undefined && inputs.totalUji !== 0) {
        calculatedValue = (inputs.ujiMemenuhi / inputs.totalUji);
      }
      break;
    
    case "KonsumsiAirDomestik":
      if (inputs.airTerjualDomestik !== undefined && inputs.pelangganDomestik !== undefined && inputs.pelangganDomestik !== 0) {
        calculatedValue = (inputs.airTerjualDomestik / 12) / inputs.pelangganDomestik;
      }
      break;
    
    case "EfisiensiProduksi":
      if (inputs.produksiRiil !== undefined && inputs.kapasitasTerpasang !== undefined && inputs.kapasitasTerpasang !== 0) {
        calculatedValue = (inputs.produksiRiil / inputs.kapasitasTerpasang) * 100;
      }
      break;
    
    case "TingkatKehilanganAir":
      if (inputs.distribusiAir !== undefined && inputs.airTerjual !== undefined && inputs.airTerjual !== 0) {
        calculatedValue = (inputs.distribusiAir / inputs.airTerjual) * 100;
      }
      break;
    
    case "JamOperasiLayanan":
      if (inputs.totalJamOperasi !== undefined) {
        calculatedValue = inputs.totalJamOperasi / 365;
      }
      break;
    
    case "TekananAirSambPelanggan":
      if (inputs.pelangganTekananBaik !== undefined && inputs.totalPelanggan !== undefined && inputs.totalPelanggan !== 0) {
        calculatedValue = (inputs.pelangganTekananBaik / inputs.totalPelanggan) * 100;
      }
      break;
    
    case "PenggantianMeterAir":
      if (inputs.meterDiganti !== undefined && inputs.jumlahPelanggan !== undefined && inputs.jumlahPelanggan !== 0) {
        calculatedValue = (inputs.meterDiganti / inputs.jumlahPelanggan) * 100;
      }
      break;
    
    case "RasioJumlahPegawai":
      if (inputs.jumlahPegawai !== undefined && inputs.pelanggan !== undefined && inputs.pelanggan !== 0) {
        calculatedValue = (inputs.jumlahPegawai / inputs.pelanggan) / 1000;
      }
      break;
    
    case "RatioDiklatPegawai":
      if (inputs.pegawaiDiklat !== undefined && inputs.totalPegawai !== undefined && inputs.totalPegawai !== 0) {
        calculatedValue = (inputs.pegawaiDiklat / inputs.totalPegawai) * 100;
      }
      break;
    
    case "BiayaDiklatTerhadapBiaya":
      if (inputs.biayaDiklat !== undefined && inputs.biayaPegawai !== undefined && inputs.biayaPegawai !== 0) {
        calculatedValue = (inputs.biayaDiklat / inputs.biayaPegawai) * 100;
      }
      break;
    
    default:
      calculatedValue = 0;
  }
  
  return calculatedValue;
};
