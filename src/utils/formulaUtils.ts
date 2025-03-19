
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
      const labaBersih = parseFloat(String(inputs.labaBersih || 0));
      const ekuitas = parseFloat(String(inputs.ekuitas || 1));
      
      if (ekuitas === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (labaBersih / ekuitas) * 100;
      }
      break;
    
    case "rasio_operasi":
      const biayaOperasi = parseFloat(String(inputs.biayaOperasi || 0));
      const pendapatanOperasi = parseFloat(String(inputs.pendapatanOperasi || 1));
      
      if (pendapatanOperasi === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = biayaOperasi / pendapatanOperasi;
      }
      break;
    
    case "cash_ratio":
      const kas = parseFloat(String(inputs.kas || 0));
      const setaraKas = parseFloat(String(inputs.setaraKas || 0));
      const utangLancar = parseFloat(String(inputs.utangLancar || 1));
      
      if (utangLancar === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = ((kas + setaraKas) / utangLancar) * 100;
      }
      break;
    
    case "efektivitas_penagihan":
      const penerimaanRekAir = parseFloat(String(inputs.penerimaanRekAir || 0));
      const jumlahRekeningAir = parseFloat(String(inputs.jumlahRekeningAir || 1));
      
      if (jumlahRekeningAir === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (penerimaanRekAir / jumlahRekeningAir) * 100;
      }
      break;
    
    case "solvabilitas":
      const totalAktiva = parseFloat(String(inputs.totalAktiva || 0));
      const totalUtang = parseFloat(String(inputs.totalUtang || 1));
      
      if (totalUtang === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (totalAktiva / totalUtang) * 100;
      }
      break;
    
    case "cakupan_pelayanan":
      const pendudukTerlayani = parseFloat(String(inputs.pendudukTerlayani || 0));
      const totalPenduduk = parseFloat(String(inputs.totalPenduduk || 1));
      
      if (totalPenduduk === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (pendudukTerlayani / totalPenduduk) * 100;
      }
      break;
    
    case "pertumbuhan_pelanggan":
      const pelangganTahunIni = parseFloat(String(inputs.pelangganTahunIni || 0));
      const pelangganTahunLalu = parseFloat(String(inputs.pelangganTahunLalu || 1));
      
      if (pelangganTahunLalu === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (pelangganTahunIni / pelangganTahunLalu) * 100;
      }
      break;
    
    case "penyelesaian_aduan":
      const aduanSelesai = parseFloat(String(inputs.aduanSelesai || 0));
      const totalAduan = parseFloat(String(inputs.totalAduan || 1));
      
      if (totalAduan === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (aduanSelesai / totalAduan) * 100;
      }
      break;
    
    case "kualitas_air":
      const ujiMemenuhi = parseFloat(String(inputs.ujiMemenuhi || 0));
      const totalUji = parseFloat(String(inputs.totalUji || 1));
      
      if (totalUji === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (ujiMemenuhi / totalUji) * 100;
      }
      break;
    
    case "konsumsi_air":
      const airTerjualDomestik = parseFloat(String(inputs.airTerjualDomestik || 0));
      const pelangganDomestik = parseFloat(String(inputs.pelangganDomestik || 1));
      
      if (pelangganDomestik === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = airTerjualDomestik / pelangganDomestik / 12; // Dibagi 12 untuk mendapatkan per bulan
      }
      break;
    
    case "efisiensi_produksi":
      const produksiRiil = parseFloat(String(inputs.produksiRiil || 0));
      const kapasitasTerpasang = parseFloat(String(inputs.kapasitasTerpasang || 1));
      
      if (kapasitasTerpasang === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (produksiRiil / kapasitasTerpasang) * 100;
      }
      break;
    
    case "tingkat_kehilangan_air":
      const distribusiAir = parseFloat(String(inputs.distribusiAir || 1));
      const airTerjual = parseFloat(String(inputs.airTerjual || 0));
      
      if (distribusiAir === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = ((distribusiAir - airTerjual) / distribusiAir) * 100;
      }
      break;
    
    case "jam_operasi":
      const totalJamOperasi = parseFloat(String(inputs.totalJamOperasi || 0));
      
      calculatedValue = totalJamOperasi / 365;
      break;
    
    case "tekanan_air":
      const pelangganTekananBaik = parseFloat(String(inputs.pelangganTekananBaik || 0));
      const totalPelanggan = parseFloat(String(inputs.totalPelanggan || 1));
      
      if (totalPelanggan === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (pelangganTekananBaik / totalPelanggan) * 100;
      }
      break;
    
    case "penggantian_meter":
      const meterDiganti = parseFloat(String(inputs.meterDiganti || 0));
      const jumlahPelanggan = parseFloat(String(inputs.jumlahPelanggan || 1));
      
      if (jumlahPelanggan === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (meterDiganti / jumlahPelanggan) * 100;
      }
      break;
    
    case "rasio_pegawai":
      const jumlahPegawai = parseFloat(String(inputs.jumlahPegawai || 0));
      const pelanggan = parseFloat(String(inputs.pelanggan || 1));
      
      if (pelanggan === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (jumlahPegawai / pelanggan) * 1000;
      }
      break;
    
    case "rasio_diklat":
      const pegawaiDiklat = parseFloat(String(inputs.pegawaiDiklat || 0));
      const totalPegawai = parseFloat(String(inputs.totalPegawai || 1));
      
      if (totalPegawai === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (pegawaiDiklat / totalPegawai) * 100;
      }
      break;
    
    case "biaya_diklat":
      const biayaDiklat = parseFloat(String(inputs.biayaDiklat || 0));
      const biayaPegawai = parseFloat(String(inputs.biayaPegawai || 1));
      
      if (biayaPegawai === 0) {
        calculatedValue = 0;
      } else {
        calculatedValue = (biayaDiklat / biayaPegawai) * 100;
      }
      break;
    
    default:
      calculatedValue = 0;
  }
  
  return calculatedValue;
};
