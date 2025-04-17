// Fungsi untuk menghitung nilai berdasarkan formula
export function calculateKemendagriFormulaValue(
  indicatorId: string,
  inputs: Record<string, number>
): number {
  switch (indicatorId) {
    // Aspek Keuangan
    case 'rasio_laba_aktiva_produktif':
      return (inputs.laba_sebelum_pajak / inputs.aktiva_produktif) * 100;
    case 'peningkatan_rasio_laba_aktiva':
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
    case 'ratio_laba_terhadap_penjualan':
      return (inputs.laba_sebelum_pajak / inputs.pendapatan_operasi) * 100;
    case 'peningkatan_ratio_laba_penjualan':
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
    case 'ratio_aktiva_lancar_utang_lancar':
      return inputs.aktiva_lancar / inputs.utang_lancar;
    case 'rasio_utang_jangka_panjang_ekuitas':
      return inputs.utang_jangka_panjang / inputs.ekuitas;
    case 'rasio_total_aktiva_total_utang':
      return inputs.total_aktiva / inputs.total_utang;
    case 'rasio_biaya_operasi_pendapatan_operasi':
      return inputs.biaya_operasi / inputs.pendapatan_operasi;
    case 'ratio_laba_operasi_angsuran':
      return inputs.laba_operasi / (inputs.angsuran_pokok + inputs.bunga_jatuh_tempo);
    case 'ratio_aktiva_produktif_penjualan_air':
      return inputs.aktiva_produktif / inputs.penjualan_air;
    case 'jangka_waktu_penagihan_piutang':
      return inputs.piutang_usaha / inputs.penjualan_per_hari;
    case 'efektifitas_penagihan':
      return (inputs.rekening_tertagih / inputs.penjualan_air) * 100;
    
    // Aspek Operasional
    case 'cakupan_pelayanan':
      return (inputs.jumlah_penduduk_terlayani / inputs.jumlah_penduduk) * 100;
    case 'peningkatan_cakupan_pelayanan':
      return inputs.cakupan_tahun_ini - inputs.cakupan_tahun_lalu;
    case 'kualitas_air_distribusi':
      return inputs.nilai_kualitas || 0;
    case 'kontinuitas_air':
      return inputs.nilai_kontinuitas || 0;
    case 'produktifitas_pemanfaatan_instalasi':
      return (inputs.kapasitas_produksi / inputs.kapasitas_terpasang) * 100;
    case 'tingkat_kehilangan_air':
      return ((inputs.air_didistribusikan - inputs.air_terjual) / inputs.air_didistribusikan) * 100;
    case 'penurunan_tingkat_kehilangan_air':
      return inputs.rasio_tahun_ini - inputs.rasio_tahun_lalu;
    case 'peneraan_meter':
      return (inputs.jumlah_pelanggan_tera / inputs.jumlah_total_pelanggan) * 100;
    case 'kecepatan_penyambungan_baru':
      return inputs.nilai_kecepatan || 0;
    case 'kemampuan_penanganan_pengaduan':
      return (inputs.pengaduan_selesai / inputs.seluruh_pengaduan) * 100;
    case 'kemudahan_pelayanan_service_point':
      return inputs.nilai_kemudahan || 0;
    case 'ratio_karyawan_per_1000_pelanggan':
      return (inputs.jumlah_karyawan / inputs.jumlah_pelanggan_aktif) * 1000;
    
    // Aspek Administrasi
    case 'rencana_jangka_panjang':
    case 'rencana_organisasi':
    case 'prosedur_operasi_standar':
    case 'gambar_nyata_laksana':
    case 'pedoman_penilaian_kinerja':
    case 'rencana_kerja_anggaran':
      return inputs.nilai || 0;
    case 'tertib_laporan_internal':
    case 'tertib_laporan_eksternal':
      return inputs.nilai || 0;
    case 'opini_auditor_independen':
      return inputs.nilai || 0;
    case 'tindak_lanjut_hasil_pemeriksaan':
      return inputs.nilai || 0;
    
    default:
      return 0;
  }
}

// Fungsi untuk mendapatkan komponen input formula
export function getKemendagriFormulaInputs(indicatorId: string) {
  switch (indicatorId) {
    // Aspek Keuangan
    case 'rasio_laba_aktiva_produktif':
      return [
        { name: 'laba_sebelum_pajak', label: 'Laba Sebelum Pajak' },
        { name: 'aktiva_produktif', label: 'Aktiva Produktif' }
      ];
    case 'peningkatan_rasio_laba_aktiva':
      return [
        { name: 'rasio_tahun_ini', label: 'Rasio Laba terhadap Aktiva Produktif Tahun Ini' },
        { name: 'rasio_tahun_lalu', label: 'Rasio Laba terhadap Aktiva Produktif Tahun Lalu' }
      ];
    case 'ratio_laba_terhadap_penjualan':
      return [
        { name: 'laba_sebelum_pajak', label: 'Laba Sebelum Pajak' },
        { name: 'pendapatan_operasi', label: 'Pendapatan Operasi' }
      ];
    case 'peningkatan_ratio_laba_penjualan':
      return [
        { name: 'rasio_tahun_ini', label: 'Rasio Laba Terhadap Penjualan Tahun Ini' },
        { name: 'rasio_tahun_lalu', label: 'Rasio Laba Terhadap Penjualan Tahun Lalu' }
      ];
    case 'ratio_aktiva_lancar_utang_lancar':
      return [
        { name: 'aktiva_lancar', label: 'Aktiva Lancar' },
        { name: 'utang_lancar', label: 'Utang Lancar' }
      ];
    case 'rasio_utang_jangka_panjang_ekuitas':
      return [
        { name: 'utang_jangka_panjang', label: 'Utang Jangka Panjang' },
        { name: 'ekuitas', label: 'Ekuitas' }
      ];
    case 'rasio_total_aktiva_total_utang':
      return [
        { name: 'total_aktiva', label: 'Total Aktiva' },
        { name: 'total_utang', label: 'Total Utang' }
      ];
    case 'rasio_biaya_operasi_pendapatan_operasi':
      return [
        { name: 'biaya_operasi', label: 'Total Biaya Operasi' },
        { name: 'pendapatan_operasi', label: 'Total Pendapatan Operasi' }
      ];
    case 'ratio_laba_operasi_angsuran':
      return [
        { name: 'laba_operasi', label: 'Laba Operasi' },
        { name: 'angsuran_pokok', label: 'Angsuran Pokok' },
        { name: 'bunga_jatuh_tempo', label: 'Bunga Jatuh Tempo' }
      ];
    case 'ratio_aktiva_produktif_penjualan_air':
      return [
        { name: 'aktiva_produktif', label: 'Aktiva Produktif' },
        { name: 'penjualan_air', label: 'Penjualan Air' }
      ];
    case 'jangka_waktu_penagihan_piutang':
      return [
        { name: 'piutang_usaha', label: 'Piutang Usaha' },
        { name: 'penjualan_per_hari', label: 'Jumlah Penjualan per Hari' }
      ];
    case 'efektifitas_penagihan':
      return [
        { name: 'rekening_tertagih', label: 'Rekening Tertagih' },
        { name: 'penjualan_air', label: 'Penjualan Air' }
      ];
    
    // Aspek Operasional
    case 'cakupan_pelayanan':
      return [
        { name: 'jumlah_penduduk_terlayani', label: 'Jumlah Penduduk Terlayani' },
        { name: 'jumlah_penduduk', label: 'Jumlah Penduduk' }
      ];
    case 'peningkatan_cakupan_pelayanan':
      return [
        { name: 'cakupan_tahun_ini', label: 'Cakupan Pelayanan Tahun Ini' },
        { name: 'cakupan_tahun_lalu', label: 'Cakupan Pelayanan Tahun Lalu' }
      ];
    case 'kualitas_air_distribusi':
      return [
        { name: 'nilai_kualitas', label: 'Nilai Kualitas Air (0-3)' }
      ];
    case 'kontinuitas_air':
      return [
        { name: 'nilai_kontinuitas', label: 'Nilai Kontinuitas Air (1-2)' }
      ];
    case 'produktifitas_pemanfaatan_instalasi':
      return [
        { name: 'kapasitas_produksi', label: 'Kapasitas Produksi' },
        { name: 'kapasitas_terpasang', label: 'Kapasitas Terpasang' }
      ];
    case 'tingkat_kehilangan_air':
      return [
        { name: 'air_didistribusikan', label: 'Jumlah Air yang Didistribusikan' },
        { name: 'air_terjual', label: 'Air Terjual' }
      ];
    case 'penurunan_tingkat_kehilangan_air':
      return [
        { name: 'rasio_tahun_ini', label: 'Rasio Tahun Ini' },
        { name: 'rasio_tahun_lalu', label: 'Rasio Tahun Lalu' }
      ];
    case 'peneraan_meter':
      return [
        { name: 'jumlah_pelanggan_tera', label: 'Jumlah Pelanggan yang Di Tera' },
        { name: 'jumlah_total_pelanggan', label: 'Jumlah Total Pelanggan' }
      ];
    case 'kecepatan_penyambungan_baru':
      return [
        { name: 'nilai_kecepatan', label: 'Nilai Kecepatan (1-2)' }
      ];
    case 'kemampuan_penanganan_pengaduan':
      return [
        { name: 'pengaduan_selesai', label: 'Jumlah Pengaduan yang Telah Selesai Ditangani' },
        { name: 'seluruh_pengaduan', label: 'Jumlah Seluruh Pengaduan' }
      ];
    case 'kemudahan_pelayanan_service_point':
      return [
        { name: 'nilai_kemudahan', label: 'Nilai Kemudahan (1-2)' }
      ];
    case 'ratio_karyawan_per_1000_pelanggan':
      return [
        { name: 'jumlah_karyawan', label: 'Jumlah Karyawan' },
        { name: 'jumlah_pelanggan_aktif', label: 'Jumlah Pelanggan Aktif' }
      ];
    
    // Aspek Administrasi
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
