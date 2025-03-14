
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
