// Indikator penilaian
export interface Indicator {
  id: string;
  name: string;
  category: "Keuangan" | "Pelayanan" | "Operasional" | "SDM";
  formula: string;
  weight: number;
  unit: string;
  minValue?: number;
  maxValue?: number;
}

// Nilai untuk setiap indikator
export interface Value {
  value: number;
  score: number;
}

// Hasil penilaian
export interface Assessment {
  id: string;
  name: string;
  year: number;
  date: string;
  userId: string;
  values: Record<string, Value>;
  totalScore: number;
  status: "draft" | "completed";
}

// Data indikator penilaian PDAM berdasarkan BPPSPAM
export const indicators: Indicator[] = [
  // Aspek Keuangan
  {
    id: "roe",
    name: "Return on Equity (ROE)",
    category: "Keuangan",
    formula: "Laba (Rugi) Bersih setelah Pajak / Jumlah Ekuitas × 100%",
    weight: 0.05,
    unit: "%"
  },
  {
    id: "rasio_operasi",
    name: "Rasio Operasi",
    category: "Keuangan",
    formula: "Biaya Operasi / Pendapatan Operasi",
    weight: 0.05,
    unit: "ratio"
  },
  {
    id: "cash_ratio",
    name: "Cash Ratio",
    category: "Keuangan",
    formula: "Kas + Setara Kas / Utang Lancar × 100%",
    weight: 0.05,
    unit: "%"
  },
  {
    id: "efektivitas_penagihan",
    name: "Efektivitas Penagihan",
    category: "Keuangan",
    formula: "Jumlah Penerimaan Rek Air / Jumah Rekening Air × 100%",
    weight: 0.05,
    unit: "%"
  },
  {
    id: "solvabilitas",
    name: "Solvabilitas",
    category: "Keuangan",
    formula: "Total Aktiva / Total Utang × 100%",
    weight: 0.05,
    unit: "%"
  },
  
  // Aspek Pelayanan
  {
    id: "cakupan_pelayanan",
    name: "Cakupan Pelayanan Teknis",
    category: "Pelayanan",
    formula: "Jumlah Penduduk Terlayani / Jumlah Penduduk wilayah pelayanan × 100%",
    weight: 0.05,
    unit: "%"
  },
  {
    id: "pertumbuhan_pelanggan",
    name: "Pertumbuhan Pelanggan",
    category: "Pelayanan",
    formula: "(Jml Pelanggan thn ini - pelanggan thn lalu) / pelanggan tahun lalu × 100%",
    weight: 0.05,
    unit: "%"
  },
  {
    id: "penyelesaian_aduan",
    name: "Tingkat Penyelesaian Aduan",
    category: "Pelayanan",
    formula: "Jumlah Pengaduan Selesai Ditangani / Jumlah Pengaduan × 100%",
    weight: 0.025,
    unit: "%"
  },
  {
    id: "kualitas_air",
    name: "Kualitas Air Pelanggan",
    category: "Pelayanan",
    formula: "JumlahUji Kualitas Yg Memenuhi syarat / Jumlah yang Diuji",
    weight: 0.075,
    unit: "ratio"
  },
  {
    id: "konsumsi_air",
    name: "Konsumsi Air Domestik",
    category: "Pelayanan",
    formula: "Jmh Air Yang Terjual Domestik Setahun/12 / Jumlah Pelanggan Domestik",
    weight: 0.05,
    unit: "m³/bln"
  },
  
  // Aspek Operasional
  {
    id: "efisiensi_produksi",
    name: "Efisiensi Produksi",
    category: "Operasional",
    formula: "Volume Produksi Riil (m³) / Kapasitas terpasang (m³) × 100%",
    weight: 0.07,
    unit: "%"
  },
  {
    id: "tingkat_kehilangan_air",
    name: "Tingkat Kehilangan Air",
    category: "Operasional",
    formula: "(Distribusi Air - Air Terjual) / Distribusi Air × 100%",
    weight: 0.07,
    unit: "%"
  },
  {
    id: "jam_operasi",
    name: "Jam Operasi Layanan",
    category: "Operasional",
    formula: "Waktu Distribusi Air Ke pelggan 1 thn / 365 hari",
    weight: 0.08,
    unit: "jam"
  },
  {
    id: "tekanan_air",
    name: "Tekanan Air Samb Pelanggan",
    category: "Operasional",
    formula: "Jmh Pelanggan dilayani dgn tekanan> 0,7Bar / Jumlah Pelanggan × 100%",
    weight: 0.05,
    unit: "%"
  },
  {
    id: "penggantian_meter",
    name: "Penggantian Meter Air",
    category: "Operasional",
    formula: "Jumlah Meter Yg diganti/dikalibrasi tahun ybs / Jumlah Pelanggan × 100%",
    weight: 0.03,
    unit: "%"
  },
  
  // Aspek SDM
  {
    id: "rasio_pegawai",
    name: "Rasio Jmh Pegawai / 1000 pelanggan",
    category: "SDM",
    formula: "Jumlah Pegawai / Jumlah Pelanggan × 1000",
    weight: 0.07,
    unit: "rasio"
  },
  {
    id: "rasio_diklat",
    name: "Ratio Diklat Pegawai / Peningkatan Kompetensi",
    category: "SDM",
    formula: "Jumlah Pegawai Yg Ikut Diklat / Jumlah Pegawai × 100%",
    weight: 0.04,
    unit: "%"
  },
  {
    id: "biaya_diklat",
    name: "Biaya Diklat Terhadap Biaya Pegawai",
    category: "SDM",
    formula: "Biaya Diklat / Biaya Pegawai × 100%",
    weight: 0.04,
    unit: "%"
  }
];

// Fungsi untuk menghitung skor berdasarkan nilai dan indikator
export const calculateScore = (value: number, indicatorId: string): number => {
  switch (indicatorId) {
    // Aspek Keuangan
    case "roe":
      if (value < 0) return 1;
      if (value < 3) return 2;
      if (value < 7) return 3;
      if (value < 10) return 4;
      return 5;
      
    case "rasio_operasi":
      if (value > 1.0) return 1;
      if (value > 0.85) return 2;
      if (value > 0.68) return 3;
      if (value > 0.5) return 4;
      return 5;
      
    case "cash_ratio":
      if (value < 0.3) return 1;
      if (value < 0.6) return 2;
      if (value < 0.9) return 3;
      if (value < 1.2) return 4;
      return 5;
      
    case "efektivitas_penagihan":
      if (value < 75) return 1;
      if (value < 80) return 2;
      if (value < 85) return 3;
      if (value < 90) return 4;
      return 5;
      
    case "solvabilitas":
      if (value < 1) return 1;
      if (value < 1.7) return 2;
      if (value < 2.3) return 3;
      if (value < 3) return 4;
      return 5;
      
    // Aspek Pelayanan
    case "cakupan_pelayanan":
      if (value < 20) return 1;
      if (value < 40) return 2;
      if (value < 60) return 3;
      if (value < 80) return 4;
      return 5;
      
    case "kualitas_air":
      if (value < 80) return 1;
      if (value < 90) return 2;
      if (value < 95) return 3;
      if (value < 99) return 4;
      return 5;
      
    case "kontinuitas_air":
      if (value < 12) return 1;
      if (value < 16) return 2;
      if (value < 20) return 3;
      if (value < 23) return 4;
      return 5;
      
    case "penanganan_pengaduan":
      if (value < 60) return 1;
      if (value < 75) return 2;
      if (value < 85) return 3;
      if (value < 95) return 4;
      return 5;
      
    // Aspek Operasional
    case "efisiensi_produksi":
      if (value < 60) return 1;
      if (value < 70) return 2;
      if (value < 80) return 3;
      if (value < 90) return 4;
      return 5;
      
    case "tingkat_kehilangan_air":
      // Lower is better
      if (value > 40) return 1;
      if (value > 30) return 2;
      if (value > 20) return 3;
      if (value > 10) return 4;
      return 5;
      
    case "jam_operasi":
      if (value < 12) return 1;
      if (value < 16) return 2;
      if (value < 20) return 3;
      if (value < 23) return 4;
      return 5;
      
    case "tekanan_air":
      if (value < 0.5) return 1;
      if (value < 0.7) return 2;
      if (value < 0.9) return 3;
      if (value < 1) return 4;
      return 5;
      
    case "penggantian_meter":
      if (value < 5) return 1;
      if (value < 10) return 2;
      if (value < 15) return 3;
      if (value < 20) return 4;
      return 5;
      
    // Aspek SDM
    case "rasio_pegawai":
      // Lower is better
      if (value > 10) return 1;
      if (value > 8) return 2;
      if (value > 6) return 3;
      if (value > 4) return 4;
      return 5;
      
    case "rasio_diklat":
      if (value < 10) return 1;
      if (value < 20) return 2;
      if (value < 30) return 3;
      if (value < 40) return 4;
      return 5;
      
    case "biaya_diklat":
      if (value < 2) return 1;
      if (value < 4) return 2;
      if (value < 6) return 3;
      if (value < 8) return 4;
      return 5;
      
    default:
      return 0;
  }
};

// Fungsi untuk menghitung total skor
export const calculateTotalScore = (values: Record<string, Value>): number => {
  let totalScore = 0;
  
  indicators.forEach((indicator) => {
    const valueObj = values[indicator.id];
    if (valueObj) {
      totalScore += valueObj.score * indicator.weight;
    }
  });
  
  return totalScore;
};

// Fungsi untuk mendapatkan kategori berdasarkan total skor
export const getHealthCategory = (score: number): {
  category: string;
  color: string;
} => {
  if (score >= 3.4) {
    return {
      category: "Sehat",
      color: "bg-green-500"
    };
  } else if (score >= 2.8) {
    return {
      category: "Cukup Sehat",
      color: "bg-blue-500"
    };
  } else if (score >= 2.2) {
    return {
      category: "Kurang Sehat",
      color: "bg-yellow-500"
    };
  } else {
    return {
      category: "Sakit",
      color: "bg-red-500"
    };
  }
};
