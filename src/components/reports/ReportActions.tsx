
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

interface ReportActionsProps {
  onPrint: () => void;
}

const ReportActions = ({ onPrint }: ReportActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onPrint} className="flex items-center gap-2">
        <Printer className="h-4 w-4" />
        <span className="hidden md:inline">Cetak</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        <span className="hidden md:inline">Unduh PDF</span>
      </Button>
    </div>
  );
};

export default ReportActions;
