import { Indicator } from "@/models/types";

// Fungsi untuk menghitung nilai dari formula
export function calculateFormulaValue(indicatorId: string, inputs: Record<string, number>): number {
  console.log(`Calculating formula value for indicator: ${indicatorId} with inputs:`, inputs);
  
  switch (indicatorId) {
    // ASPEK KEUANGAN
    case 'roe':
      return (inputs['laba_bersih'] || 0) / (inputs['jumlah_ekuitas'] || 0);
    case 'rasio_operasi':
      return (inputs['biaya_operasi'] || 0) / (inputs['pendapatan_operasi'] || 0);
    case 'cash_ratio':
      return (inputs['kas'] || 0) / (inputs['utang_lancar'] || 0);
    case 'efektifitas_penagihan':
      return (inputs['jumlah_penerimaan'] || 0) / (inputs['jumlah_rekening'] || 0) * 100;
    case 'solvabilitas':
      return (inputs['total_aktiva'] || 0) / (inputs['total_utang'] || 0);
      
    // ASPEK PELAYANAN
    case 'cakupan_pelayanan':
      return (inputs['jumlah_penduduk_terlayani'] || 0) / (inputs['jumlah_penduduk_wilayah'] || 0) * 100;
    case 'pertumbuhan_pelanggan':
      return (inputs['pelanggan_tahun_ini'] || 0) - (inputs['pelanggan_tahun_lalu'] || 0);
    case 'tingkat_penyelesaian_aduan':
      return (inputs['jumlah_aduan_selesai'] || 0) / (inputs['jumlah_aduan'] || 0) * 100;
    case 'kualitas_air':
      return (inputs['uji_memenuhi_syarat'] || 0) / (inputs['jumlah_uji'] || 0) * 100;
    case 'konsumsi_air':
      return (inputs['air_terjual_domestik'] || 0) / (inputs['pelanggan_domestik'] || 0);
      
    // ASPEK OPERASI
    case 'efisiensi_produksi':
      return (inputs['volume_produksi'] || 0) / (inputs['kapasitas_terpasang'] || 0) * 100;
    case 'tingkat_kehilangan_air':
      return (inputs['distribusi_air'] || 0) - (inputs['air_terjual'] || 0);
    case 'jam_operasi':
      return (inputs['waktu_distribusi'] || 0);
    case 'tekanan_air':
      return (inputs['pelanggan_tekanan_baik'] || 0) / (inputs['jumlah_pelanggan'] || 0) * 100;
    case 'penggantian_meter':
      return (inputs['meter_diganti'] || 0) / (inputs['jumlah_pelanggan'] || 0) * 100;
      
    // ASPEK ADMINISTRASI (sebelumnya SDM)
    case 'rencana_jangka_panjang':
    case 'rencana_organisasi':
    case 'prosedur_operasi_standar':
    case 'gambar_nyata_laksana':
    case 'pedoman_penilaian_kinerja':
    case 'rencana_kerja_anggaran':
    case 'tertib_laporan_internal':
    case 'tertib_laporan_eksternal':
    case 'opini_auditor_independen':
    case 'tindak_lanjut_hasil_pemeriksaan':
      // Indikator administrasi tidak memerlukan perhitungan formula
      return 0;
      
    default:
      console.warn(`No formula calculation defined for indicator: ${indicatorId}`);
      return 0;
  }
}

// Tipe untuk input formula
export interface FormulaInput {
  name: string;
  label: string;
}

// Fungsi untuk mendapatkan komponen input formula
export function getFormulaInputs(indicatorId: string) {
  switch (indicatorId) {
    // ASPEK KEUANGAN
    case 'roe':
      return [
        { name: 'laba_bersih', label: 'Laba Bersih Setelah Pajak' },
        { name: 'jumlah_ekuitas', label: 'Jumlah Ekuitas' }
      ];
    case 'rasio_operasi':
      return [
        { name: 'biaya_operasi', label: 'Biaya Operasi' },
        { name: 'pendapatan_operasi', label: 'Pendapatan Operasi' }
      ];
    case 'cash_ratio':
      return [
        { name: 'kas', label: 'Kas + Setara Kas' },
        { name: 'utang_lancar', label: 'Utang Lancar' }
      ];
    case 'efektifitas_penagihan':
      return [
        { name: 'jumlah_penerimaan', label: 'Jumlah Penerimaan Rekening Air' },
        { name: 'jumlah_rekening', label: 'Jumlah Rekening Air' }
      ];
    case 'solvabilitas':
      return [
        { name: 'total_aktiva', label: 'Total Aktiva' },
        { name: 'total_utang', label: 'Total Utang' }
      ];
      
    // ASPEK PELAYANAN
    case 'cakupan_pelayanan':
      return [
        { name: 'jumlah_penduduk_terlayani', label: 'Jumlah Penduduk Terlayani' },
        { name: 'jumlah_penduduk_wilayah', label: 'Jumlah Penduduk Wilayah Pelayanan' }
      ];
    case 'pertumbuhan_pelanggan':
      return [
        { name: 'pelanggan_tahun_ini', label: 'Jumlah Pelanggan Tahun Ini' },
        { name: 'pelanggan_tahun_lalu', label: 'Jumlah Pelanggan Tahun Lalu' }
      ];
    case 'tingkat_penyelesaian_aduan':
      return [
        { name: 'jumlah_aduan_selesai', label: 'Jumlah Pengaduan Selesai Ditangani' },
        { name: 'jumlah_aduan', label: 'Jumlah Pengaduan' }
      ];
    case 'kualitas_air':
      return [
        { name: 'uji_memenuhi_syarat', label: 'Jumlah Uji Kualitas yang Memenuhi Syarat' },
        { name: 'jumlah_uji', label: 'Jumlah yang Diuji' }
      ];
    case 'konsumsi_air':
      return [
        { name: 'air_terjual_domestik', label: 'Jumlah Air yang Terjual Domestik Setahun' },
        { name: 'pelanggan_domestik', label: 'Jumlah Pelanggan Domestik' }
      ];
      
    // ASPEK OPERASI
    case 'efisiensi_produksi':
      return [
        { name: 'volume_produksi', label: 'Volume Produksi Riil (m³)' },
        { name: 'kapasitas_terpasang', label: 'Kapasitas Terpasang (m³)' }
      ];
    case 'tingkat_kehilangan_air':
      return [
        { name: 'distribusi_air', label: 'Distribusi Air' },
        { name: 'air_terjual', label: 'Air Terjual' }
      ];
    case 'jam_operasi':
      return [
        { name: 'waktu_distribusi', label: 'Waktu Distribusi Air ke Pelanggan 1 Tahun (jam)' }
      ];
    case 'tekanan_air':
      return [
        { name: 'pelanggan_tekanan_baik', label: 'Jumlah Pelanggan Dilayani dengan Tekanan > 0.7bar' },
        { name: 'jumlah_pelanggan', label: 'Jumlah Pelanggan' }
      ];
    case 'penggantian_meter':
      return [
        { name: 'meter_diganti', label: 'Jumlah Meter yang Diganti/Dikalibrasi' },
        { name: 'jumlah_pelanggan', label: 'Jumlah Pelanggan' }
      ];
      
    // ASPEK ADMINISTRASI (sebelumnya SDM)
    case 'rencana_jangka_panjang':
    case 'rencana_organisasi':
    case 'prosedur_operasi_standar':
    case 'gambar_nyata_laksana':
    case 'pedoman_penilaian_kinerja':
    case 'rencana_kerja_anggaran':
    case 'tertib_laporan_internal':
    case 'tertib_laporan_eksternal':
    case 'opini_auditor_independen':
    case 'tindak_lanjut_hasil_pemeriksaan':
      // Indikator administrasi tidak memerlukan input komponen formula
      return [];
      
    default:
      return [];
  }
}
