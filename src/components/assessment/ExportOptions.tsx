
import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, FilePieChart } from "lucide-react";
import { Assessment } from "@/models/types";
import { downloadCSV, downloadPDF } from "@/utils/exportUtils";

interface ExportOptionsProps {
  assessment: Assessment;
  onClose: () => void;
}

const ExportOptions = ({ assessment, onClose }: ExportOptionsProps) => {
  const handleExport = (type: "csv" | "pdf" | "chart") => {
    if (type === "csv") {
      downloadCSV(assessment);
    } else if (type === "pdf") {
      downloadPDF(assessment);
    } else {
      // Redirect ke halaman chart/report
      window.location.href = `/reportskemendagri/${assessment.id}`;
    }
    onClose();
  };

  return (
    <div className="grid gap-4 py-4">
      <h3 className="font-medium mb-2">Pilih Format Ekspor:</h3>
      <div className="grid grid-cols-3 gap-4">
        <Button 
          onClick={() => handleExport("csv")} 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
        >
          <FileSpreadsheet className="h-8 w-8" />
          <span>CSV / Excel</span>
        </Button>
        <Button 
          onClick={() => handleExport("pdf")} 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
        >
          <FileText className="h-8 w-8" />
          <span>PDF</span>
        </Button>
        <Button 
          onClick={() => handleExport("chart")} 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2"
        >
          <FilePieChart className="h-8 w-8" />
          <span>Grafik / Report</span>
        </Button>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Format ekspor berdasarkan standar KEMENDAGRI tahun 1999</p>
      </div>
    </div>
  );
};

export default ExportOptions;
