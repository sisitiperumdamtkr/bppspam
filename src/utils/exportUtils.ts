
import { Assessment } from "@/models/types";
import { indicators } from "@/models/indicators";
import { getHealthCategory, getHealthCategorykemendagri } from "@/models/health-categories";
import { kemendagriIndicators } from "@/models/kemendagri-indicators";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

// Function untuk ekspor data ke format PDF
export const downloadPDF = (assessment: Assessment): void => {
  // Buat objek dokumen PDF baru
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Tambahkan header dokumen
  doc.setFontSize(16);
  doc.text("Penilaian Tingkat Kesehatan PDAM", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(`Nama PDAM: ${assessment.name}`, 20, 30);
  doc.text(`Tahun: ${assessment.year}`, 20, 37);
  doc.text(`Tanggal: ${new Date(assessment.date).toLocaleDateString('id-ID')}`, 20, 44);
  
  // Tambahkan tabel indikator
  const tableColumn = ["Indikator", "Nilai", "Skor", "Bobot", "Nilai Tertimbang"];
  const tableRows: any[] = [];
  
  indicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      tableRows.push([
        indicator.name, 
        valueObj.value.toFixed(2), 
        valueObj.score.toFixed(2), 
        indicator.weight.toFixed(3), 
        weightedScore.toFixed(3)
      ]);
    }
  });
  
  // Tampilkan tabel
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [0, 128, 0],
    },
  });
  
  // Tambahkan total skor
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.text(`Total Skor: ${assessment.totalScore.toFixed(2)}`, 20, finalY + 10);
  
  const healthCategory = getHealthCategory(assessment.totalScore);
  doc.text(`Kategori: ${healthCategory.category}`, 20, finalY + 17);
  
  // Simpan dokumen PDF
  doc.save(`penilaian-${assessment.name}-${assessment.year}.pdf`);
};

// Ekspor data kemendagri ke CSV
export const exportKemendagriToCSV = (assessment: Assessment): string => {
  // Create CSV header
  let csv = "Aspek,Indikator,Nilai,Skor\n";
  
  // Add rows for each indicator
  kemendagriIndicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      csv += `"${indicator.category}","${indicator.name}",${valueObj.value.toFixed(2)},${valueObj.score}\n`;
    }
  });
  
  // Add total dan per kategori
  const keuanganScore = kemendagriIndicators
    .filter(ind => ind.category === "Keuangan")
    .reduce((sum, ind) => {
      const val = assessment.values[ind.id];
      return sum + (val ? val.score : 0);
    }, 0);
  
  const operasionalScore = kemendagriIndicators
    .filter(ind => ind.category === "Operasional")
    .reduce((sum, ind) => {
      const val = assessment.values[ind.id];
      return sum + (val ? val.score : 0);
    }, 0);
    
  const administrasiScore = kemendagriIndicators
    .filter(ind => ind.category === "Administrasi")
    .reduce((sum, ind) => {
      const val = assessment.values[ind.id];
      return sum + (val ? val.score : 0);
    }, 0);
  
  const weightedKeuangan = (keuanganScore / 60) * 45;
  const weightedOperasional = (operasionalScore / 47) * 40;
  const weightedAdministrasi = (administrasiScore / 36) * 15;
  
  csv += `\nAspek Keuangan,${keuanganScore.toFixed(2)},(${weightedKeuangan.toFixed(2)})\n`;
  csv += `Aspek Operasional,${operasionalScore.toFixed(2)},(${weightedOperasional.toFixed(2)})\n`;
  csv += `Aspek Administrasi,${administrasiScore.toFixed(2)},(${weightedAdministrasi.toFixed(2)})\n`;
  csv += `\nTotal Skor,,${assessment.totalScore.toFixed(3)}\n`;
  
  const healthCategory = getHealthCategorykemendagri(assessment.totalScore);
  csv += `Kategori,${healthCategory.category}\n`;
  
  return csv;
};

// Fungsi download CSV Kemendagri
export const downloadKemendagriCSV = (assessment: Assessment): void => {
  const csvData = exportKemendagriToCSV(assessment);
  downloadFile(csvData, `penilaian-kemendagri-${assessment.name}-${assessment.year}.csv`, "text/csv");
};

// Fungsi untuk membuat PDF Kemendagri
export const downloadKemendagriPDF = (assessment: Assessment): void => {
  // Buat objek dokumen PDF baru
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Tambahkan header dokumen
  doc.setFontSize(16);
  doc.text("Penilaian PDAM (KEMENDAGRI)", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(`Nama PDAM: ${assessment.name}`, 20, 30);
  doc.text(`Tahun: ${assessment.year}`, 20, 37);
  doc.text(`Tanggal: ${new Date(assessment.date).toLocaleDateString('id-ID')}`, 20, 44);
  
  // Data per kategori
  const categories = [...new Set(kemendagriIndicators.map(ind => ind.category))];
  let yPos = 55;
  
  categories.forEach(category => {
    doc.setFontSize(12);
    doc.text(`Aspek ${category}`, 20, yPos);
    yPos += 7;
    
    const categoryIndicators = kemendagriIndicators.filter(ind => ind.category === category);
    
    const tableColumn = ["Indikator", "Nilai", "Skor"];
    const tableRows: any[] = [];
    
    categoryIndicators.forEach(indicator => {
      const valueObj = assessment.values[indicator.id];
      if (valueObj) {
        tableRows.push([
          indicator.name, 
          valueObj.value.toFixed(2), 
          valueObj.score
        ]);
      }
    });
    
    // Tampilkan tabel
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: yPos,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [13, 71, 161], // Warna biru tua
      },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
  });
  
  // Hitung skor per aspek
  const keuanganScore = kemendagriIndicators
    .filter(ind => ind.category === "Keuangan")
    .reduce((sum, ind) => {
      const val = assessment.values[ind.id];
      return sum + (val ? val.score : 0);
    }, 0);
  
  const operasionalScore = kemendagriIndicators
    .filter(ind => ind.category === "Operasional")
    .reduce((sum, ind) => {
      const val = assessment.values[ind.id];
      return sum + (val ? val.score : 0);
    }, 0);
    
  const administrasiScore = kemendagriIndicators
    .filter(ind => ind.category === "Administrasi")
    .reduce((sum, ind) => {
      const val = assessment.values[ind.id];
      return sum + (val ? val.score : 0);
    }, 0);
  
  const weightedKeuangan = (keuanganScore / 60) * 45;
  const weightedOperasional = (operasionalScore / 47) * 40;
  const weightedAdministrasi = (administrasiScore / 36) * 15;
  
  // Tambahkan ringkasan skor
  doc.text(`Nilai Kinerja Aspek Keuangan: ${keuanganScore.toFixed(2)} (${weightedKeuangan.toFixed(2)})`, 20, yPos);
  doc.text(`Nilai Kinerja Aspek Operasional: ${operasionalScore.toFixed(2)} (${weightedOperasional.toFixed(2)})`, 20, yPos + 7);
  doc.text(`Nilai Kinerja Aspek Administrasi: ${administrasiScore.toFixed(2)} (${weightedAdministrasi.toFixed(2)})`, 20, yPos + 14);
  
  doc.text(`Total Skor: ${assessment.totalScore.toFixed(3)}`, 20, yPos + 24);
  
  const healthCategory = getHealthCategorykemendagri(assessment.totalScore);
  doc.text(`Kategori: ${healthCategory.category}`, 20, yPos + 31);
  
  // Tambahkan footer
  const today = new Date().toLocaleDateString('id-ID');
  doc.setFontSize(8);
  doc.text(`Laporan dibuat pada: ${today}`, 20, doc.internal.pageSize.getHeight() - 10);
  
  // Simpan dokumen PDF
  doc.save(`penilaian-kemendagri-${assessment.name}-${assessment.year}.pdf`);
};
