
import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";
import { Assessment } from "@/models/types";
import { downloadCSV, downloadPDF } from "@/utils/exportUtils";

interface ExportOptionsKemendagriProps {
  assessment: Assessment;
  onClose: () => void;
}

const ExportOptionsKemendagri = ({ assessment, onClose }: ExportOptionsKemendagriProps) => {
  const handleExport = (type: "csv" | "pdf") => {
    if (type === "csv") {
      downloadCSV(assessment);
    } else {
      downloadPDF(assessment);
    }
    onClose();
  };

  return (
    <div className="grid gap-4 py-4">
      <h3 className="font-medium mb-2">Pilih Format Export:</h3>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};

export default ExportOptionsKemendagri;
