import { Assessment } from "@/models/types";
import { indicators } from "@/models/indicators";
import { getHealthCategory } from "@/models/health-categories";

// Function to export assessment data to CSV
export const exportToCSV = (assessment: Assessment): string => {
  // Create CSV header
  let csv = "Indikator,Nilai,Skor,Bobot,Nilai Tertimbang\n";
  
  // Add rows for each indicator
  indicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      csv += `"${indicator.name}",${valueObj.value},${valueObj.score},${indicator.weight},${weightedScore.toFixed(2)}\n`;
    }
  });
  
  // Add total
  csv += `\nTotal Skor,,,,${assessment.totalScore.toFixed(2)}\n`;
  const healthCategory = getHealthCategory(assessment.totalScore);
  csv += `Kategori,${healthCategory.category},,,\n`;
  
  return csv;
};

// Function to download data as a file
export const downloadFile = (data: string, filename: string, type: string): void => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to export assessment to CSV and download
export const downloadCSV = (assessment: Assessment): void => {
  const csvData = exportToCSV(assessment);
  downloadFile(csvData, `penilaian-${assessment.name}-${assessment.year}.csv`, "text/csv");
};

// Simple PDF data preparation (in a real app, you'd use a library like jsPDF)
export const preparePDFData = (assessment: Assessment): string => {
  // This is a simplified version - in a real app you'd use a PDF library
  // Here we're just preparing the data that would go into the PDF
  let pdfData = `Penilaian Tingkat Kesehatan PDAM\n`;
  pdfData += `Nama PDAM: ${assessment.name}\n`;
  pdfData += `Tahun: ${assessment.year}\n`;
  pdfData += `Tanggal: ${new Date(assessment.date).toLocaleDateString('id-ID')}\n\n`;
  
  pdfData += `Indikator Penilaian:\n`;
  
  indicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      pdfData += `- ${indicator.name}: ${valueObj.value} (Skor: ${valueObj.score}, Bobot: ${indicator.weight}, Nilai: ${weightedScore.toFixed(2)})\n`;
    }
  });
  
  pdfData += `\nTotal Skor: ${assessment.totalScore.toFixed(2)}\n`;
  const healthCategory = getHealthCategory(assessment.totalScore);
  pdfData += `Kategori: ${healthCategory.category}\n`;
  
  return pdfData;
};

// In a real app, you would use a library like jsPDF to generate the actual PDF
export const downloadPDF = (assessment: Assessment): void => {
  // This is a placeholder for actual PDF generation
  // In a real app, you'd use jsPDF or another library
  alert("PDF export would be implemented with a library like jsPDF in a real application");
  
  // For demo purposes, we'll just download the text data
  const pdfData = preparePDFData(assessment);
  downloadFile(pdfData, `penilaian-${assessment.name}-${assessment.year}.txt`, "text/plain");
};
