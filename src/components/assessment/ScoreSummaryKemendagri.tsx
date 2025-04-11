
import React from "react";
import { getHealthCategory } from "@/models/health-categories";

interface ScoreSummaryKemendagriProps {
  totalScore: number;
}

const ScoreSummaryKemendagri = ({ totalScore }: ScoreSummaryKemendagriProps) => {
  // Fungsi untuk mendapatkan kategori berdasarkan total skor KEMENDAGRI
  const getKemendagriCategory = (score: number) => {
    if (score >= 75) return { category: "Sehat", color: "bg-green-500" };
    if (score >= 60) return { category: "Cukup Sehat", color: "bg-blue-500" };
    if (score >= 45) return { category: "Kurang Sehat", color: "bg-yellow-500" };
    if (score >= 30) return { category: "Tidak Sehat", color: "bg-red-500" };
    return { category: "Sangat Tidak Sehat", color: "bg-red-700" };
  };
  
  const category = getKemendagriCategory(totalScore);
  
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Skor KEMENDAGRI:</h2>
        <div className="text-2xl font-bold">{totalScore.toFixed(3)}</div>
      </div>
      {totalScore > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Kategori KEMENDAGRI:</h3>
            <div className={`${category.color} text-white px-3 py-1 rounded-md`}>
              {category.category}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Berdasarkan Permendagri Nomor 47 Tahun 1999 tentang Pedoman Penilaian Kinerja PDAM</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreSummaryKemendagri;
