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
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' },
      2: { cellWidth: 'auto', halign: 'right' },
      3: { cellWidth: 'auto', halign: 'right' },
      4: { cellWidth: 'auto', halign: 'right' },
    },
    didDrawPage: (data) => {
      // Footer
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.getHeight();
      doc.setFontSize(8);
      doc.text(`Halaman ${data.pageNumber}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    }
  });
  
  // Tambahkan total skor
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.text(`Total Skor: ${assessment.totalScore.toFixed(2)}`, 20, finalY + 10);
  
  const healthCategory = getHealthCategory(assessment.totalScore);
  doc.text(`Kategori: ${healthCategory.category}`, 20, finalY + 17);
  
  // Tambahkan footer
  doc.setFontSize(8);
  doc.text(`Dokumen dibuat pada: ${new Date().toLocaleDateString('id-ID')}`, 20, doc.internal.pageSize.getHeight() - 10);
  
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
    // Cek jika halaman perlu ditambahkan
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
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
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto', halign: 'right' },
        2: { cellWidth: 'auto', halign: 'right' },
      },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
  });
  
  // Tambahkan halaman baru jika diperlukan untuk ringkasan
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
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

// Fungsi untuk membuat PDF dengan format PUPR
export const downloadPURPPDF = (assessment: Assessment): void => {
  // Buat objek dokumen PDF baru
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Tambahkan header dokumen
  doc.setFontSize(16);
  doc.text("Penilaian Tingkat Kesehatan PDAM", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.text("PERUMDAM TIRTA KERTA RAHARJA", pageWidth / 2, 28, { align: "center" });
  doc.text("Tahun 2020", pageWidth / 2, 36, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(`Nama PDAM: ${assessment.name}`, 14, 46);
  doc.text(`Tahun: ${assessment.year}`, 14, 53);
  doc.text(`Tanggal: ${new Date(assessment.date).toLocaleDateString('id-ID')}`, 14, 60);
  
  // I. Aspek Keuangan
  doc.setFontSize(13);
  doc.text("I. ASPEK KEUANGAN", 14, 70);
  
  // Buat tabel untuk indikator Aspek Keuangan
  const keuanganIndicators = indicators.filter(i => i.category === "Keuangan");
  const keuanganRows: any[] = [];
  
  keuanganIndicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      keuanganRows.push([
        indicator.name, 
        valueObj.value.toFixed(2), 
        valueObj.score, 
        indicator.weight.toFixed(3), 
        weightedScore.toFixed(3)
      ]);
    }
  });
  
  // Atur gaya tabel dengan warna hijau untuk header
  autoTable(doc, {
    head: [["Indikator", "Nilai", "Skor", "Bobot", "Nilai Tertimbang"]],
    body: keuanganRows,
    startY: 75,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 128, 0], // Warna hijau untuk header
      textColor: [255, 255, 255], // Teks putih
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Warna abu-abu muda untuk baris alternatif
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' },
      2: { cellWidth: 'auto', halign: 'right' },
      3: { cellWidth: 'auto', halign: 'right' },
      4: { cellWidth: 'auto', halign: 'right' },
    },
  });

  // Dapatkan posisi Y setelah tabel pertama
  let currentY = (doc as any).lastAutoTable.finalY + 10;

  // II. Aspek Pelayanan
  doc.setFontSize(13);
  doc.text("II. ASPEK PELAYANAN", 14, currentY);
  currentY += 5;

  // Buat tabel untuk indikator Aspek Pelayanan
  const pelayananIndicators = indicators.filter(i => i.category === "Pelayanan");
  const pelayananRows: any[] = [];
  
  pelayananIndicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      pelayananRows.push([
        indicator.name, 
        valueObj.value.toFixed(2), 
        valueObj.score, 
        indicator.weight.toFixed(3), 
        weightedScore.toFixed(3)
      ]);
    }
  });
  
  // Cek apakah perlu halaman baru
  if (currentY + 50 > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  
  // Tambahkan tabel aspek pelayanan
  autoTable(doc, {
    head: [["Indikator", "Nilai", "Skor", "Bobot", "Nilai Tertimbang"]],
    body: pelayananRows,
    startY: currentY,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' },
      2: { cellWidth: 'auto', halign: 'right' },
      3: { cellWidth: 'auto', halign: 'right' },
      4: { cellWidth: 'auto', halign: 'right' },
    },
  });
  
  // Dapatkan posisi Y setelah tabel kedua
  currentY = (doc as any).lastAutoTable.finalY + 10;
  
  // III. Aspek Operasi
  doc.setFontSize(13);
  doc.text("III. ASPEK OPERASI", 14, currentY);
  currentY += 5;
  
  // Buat tabel untuk indikator Aspek Operasi
  const operasiIndicators = indicators.filter(i => i.category === "Operasional");
  const operasiRows: any[] = [];
  
  operasiIndicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      operasiRows.push([
        indicator.name, 
        valueObj.value.toFixed(2), 
        valueObj.score, 
        indicator.weight.toFixed(3), 
        weightedScore.toFixed(3)
      ]);
    }
  });
  
  // Cek apakah perlu halaman baru
  if (currentY + 50 > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  
  // Tambahkan tabel aspek operasi
  autoTable(doc, {
    head: [["Indikator", "Nilai", "Skor", "Bobot", "Nilai Tertimbang"]],
    body: operasiRows,
    startY: currentY,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' },
      2: { cellWidth: 'auto', halign: 'right' },
      3: { cellWidth: 'auto', halign: 'right' },
      4: { cellWidth: 'auto', halign: 'right' },
    },
  });
  
  // Dapatkan posisi Y setelah tabel ketiga
  currentY = (doc as any).lastAutoTable.finalY + 10;
  
  // IV. Aspek SDM
  doc.setFontSize(13);
  doc.text("IV. ASPEK SDM", 14, currentY);
  currentY += 5;
  
  // Buat tabel untuk indikator Aspek SDM
  const sdmIndicators = indicators.filter(i => i.category === "SDM");
  const sdmRows: any[] = [];
  
  sdmIndicators.forEach(indicator => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      sdmRows.push([
        indicator.name, 
        valueObj.value.toFixed(2), 
        valueObj.score, 
        indicator.weight.toFixed(3), 
        weightedScore.toFixed(3)
      ]);
    }
  });
  
  // Cek apakah perlu halaman baru
  if (currentY + 50 > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  
  // Tambahkan tabel aspek SDM
  autoTable(doc, {
    head: [["Indikator", "Nilai", "Skor", "Bobot", "Nilai Tertimbang"]],
    body: sdmRows,
    startY: currentY,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' },
      2: { cellWidth: 'auto', halign: 'right' },
      3: { cellWidth: 'auto', halign: 'right' },
      4: { cellWidth: 'auto', halign: 'right' },
    },
  });
  
  // Dapatkan posisi Y setelah tabel keempat
  currentY = (doc as any).lastAutoTable.finalY + 10;
  
  // Cek apakah perlu halaman baru untuk kesimpulan
  if (currentY + 40 > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }
  
  // Tambahkan total skor dan kategori kesehatan
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Skor: ${assessment.totalScore.toFixed(2)}`, 14, currentY + 10);
  
  const healthCategory = getHealthCategory(assessment.totalScore);
  doc.text(`Kategori: ${healthCategory.category}`, 14, currentY + 20);
  
  // Tambahkan footer
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  const today = new Date().toLocaleDateString('id-ID');
  doc.text(`Dokumen ini dicetak pada: ${today}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Simpan dokumen PDF
  doc.save(`penilaian-pupr-${assessment.name}-${assessment.year}.pdf`);
};
