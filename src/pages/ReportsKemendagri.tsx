
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const ReportsKemendagri = () => {
  return (
    <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Laporan Penilaian KEMENDAGRI</h1>
        </div>
        
        <div className="border rounded-lg p-6 bg-background">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-2">Laporan penilaian KEMENDAGRI sedang dalam pengembangan</p>
            <p className="text-sm text-muted-foreground">Fitur ini akan tersedia segera</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsKemendagri;
