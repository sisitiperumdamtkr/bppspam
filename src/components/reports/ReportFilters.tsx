
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ReportFiltersProps {
  selectedPdam: string;
  setSelectedPdam: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  pdamNames: string[];
  years: number[];
}

const ReportFilters = ({
  selectedPdam,
  setSelectedPdam,
  selectedYear,
  setSelectedYear,
  pdamNames,
  years
}: ReportFiltersProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pdam-select">PDAM</Label>
            <Select
              value={selectedPdam}
              onValueChange={(value) => setSelectedPdam(value)}
            >
              <SelectTrigger id="pdam-select">
                <SelectValue placeholder="Pilih PDAM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua PDAM</SelectItem>
                {pdamNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year-select">Tahun</Label>
            <Select 
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
            >
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tahun</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
