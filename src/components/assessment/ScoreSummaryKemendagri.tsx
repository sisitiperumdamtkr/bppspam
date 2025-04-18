
import React from "react";
import { getHealthCategory } from "@/models/health-categories";

interface ScoreSummaryKemendagriProps {
  totalScore: number;
}

const ScoreSummaryKemendagri = ({ totalScore }: ScoreSummaryKemendagriProps) => {
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
        </div>
      )}
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Total Skor dihitung dengan rumus:</p>
        <p>Total Skor = (Nilai Kinerja Aspek Keuangan / (60 * 45)) + (Nilai Kinerja Aspek Operasional / (47 * 40)) + (Nilai Kinerja Aspek Administrasi / (36 * 15))</p>
        <p>Dimana:</p>
        <p>Nilai Kinerja Aspek Keuangan = Jumlah dari semua nilai hasil indikator aspek keuangan</p>
        <p>Nilai Kinerja Aspek Operasional = Jumlah dari semua nilai hasil indikator aspek operasional</p>
        <p>Nilai Kinerja Aspek Administrasi = Jumlah dari semua nilai hasil indikator aspek administrasi</p>
      </div>
    </div>
  );
};

export default ScoreSummaryKemendagri;
