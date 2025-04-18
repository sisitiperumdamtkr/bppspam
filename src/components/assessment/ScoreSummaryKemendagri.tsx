
import React from "react";
import { getHealthCategory } from "@/models/health-categories";
import { kemendagriIndicators } from "@/models/kemendagri-indicators";

interface ScoreSummaryKemendagriProps {
  totalScore: number;
  values: Record<string, { value: number; score: number }>;
}

const ScoreSummaryKemendagri = ({ totalScore, values }: ScoreSummaryKemendagriProps) => {
  // Hitung total skor untuk setiap aspek
  const calculateAspectScore = (category: string) => {
    return kemendagriIndicators
      .filter(indicator => indicator.category === category)
      .reduce((total, indicator) => {
        const value = values[indicator.id];
        if (value) {
          return total + value.score;
        }
        return total;
      }, 0);
  };

  const keuanganScore = calculateAspectScore("Keuangan");
  const operasionalScore = calculateAspectScore("Operasional");
  const administrasiScore = calculateAspectScore("Administrasi");

  // Hitung skor tertimbang untuk setiap aspek
  const weightedKeuangan = (keuanganScore / 60) * 45;
  const weightedOperasional = (operasionalScore / 47) * 40;
  const weightedAdministrasi = (administrasiScore / 36) * 15;

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Skor:</h2>
        <div className="text-2xl font-bold">{totalScore.toFixed(3)}</div>
      </div>
      
      {totalScore > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Kategori:</h3>
            <div className={`${getHealthCategory(totalScore).color} text-white px-3 py-1 rounded-md`}>
              {getHealthCategory(totalScore).category}
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Nilai Kinerja Aspek Keuangan:</span>
              <span className="font-medium">{keuanganScore.toFixed(2)} ({weightedKeuangan.toFixed(2)})</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Nilai Kinerja Aspek Operasional:</span>
              <span className="font-medium">{operasionalScore.toFixed(2)} ({weightedOperasional.toFixed(2)})</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Nilai Kinerja Aspek Administrasi:</span>
              <span className="font-medium">{administrasiScore.toFixed(2)} ({weightedAdministrasi.toFixed(2)})</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Total Skor dihitung dengan rumus:</p>
        <p>Total Skor = (Nilai Kinerja Aspek Keuangan / 60 * 45) + (Nilai Kinerja Aspek Operasional / 47 * 40) + (Nilai Kinerja Aspek Administrasi / 36 * 15)</p>
        <p>Dimana:</p>
        <p>Nilai Kinerja Aspek Keuangan = Jumlah dari semua nilai hasil indikator aspek keuangan</p>
        <p>Nilai Kinerja Aspek Operasional = Jumlah dari semua nilai hasil indikator aspek operasional</p>
        <p>Nilai Kinerja Aspek Administrasi = Jumlah dari semua nilai hasil indikator aspek administrasi</p>
      </div>
    </div>
  );
};

export default ScoreSummaryKemendagri;
