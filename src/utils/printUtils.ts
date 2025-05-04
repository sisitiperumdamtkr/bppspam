
import { Assessment } from "@/models/types";
import { indicators } from "@/models/indicators";
import { getHealthCategory } from "@/models/health-categories";

// Fungsi untuk mencetak halaman dengan gaya khusus
export const printReport = () => {
  // Simpan konten asli body
  const originalContent = document.body.innerHTML;
  
  // Tambahkan style khusus untuk cetak
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body * {
        visibility: hidden;
      }
      
      .print-container, .print-container * {
        visibility: visible;
      }
      
      .print-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      
      .no-print {
        display: none !important;
      }
      
      .page-break {
        page-break-before: always;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10pt;
      }
      
      table th, table td {
        border: 1px solid #ddd;
        padding: 6px;
        word-wrap: break-word;
      }
      
      table th {
        background-color: #006400;
        color: white;
      }
      
      table tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      
      @page {
        size: portrait;
        margin: 1cm;
      }

      svg, .recharts-responsive-container {
        max-width: 100% !important;
        height: auto !important;
      }

      .recharts-wrapper {
        max-width: 100% !important;
        width: 100% !important;
        height: auto !important;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // Tambahkan kelas print-container ke semua elemen yang perlu dicetak
  const printables = document.querySelectorAll('.printable');
  printables.forEach(el => {
    el.classList.add('print-container');
  });
  
  // Tambahkan kelas no-print ke semua elemen yang TIDAK perlu dicetak
  const nonPrintables = document.querySelectorAll('.non-printable, button, .button');
  nonPrintables.forEach(el => {
    el.classList.add('no-print');
  });
  
  // Cetak halaman
  window.print();
  
  // Hapus kelas yang ditambahkan
  printables.forEach(el => {
    el.classList.remove('print-container');
  });
  
  nonPrintables.forEach(el => {
    el.classList.remove('no-print');
  });
  
  // Hapus style khusus
  document.head.removeChild(style);
};

// Fungsi untuk mencetak laporan dalam format PUPR
export const printPURPReport = (assessment: Assessment) => {
  // Buat elemen kontainer untuk laporan
  const reportContainer = document.createElement('div');
  reportContainer.className = 'pupr-report-container';
  reportContainer.style.fontFamily = 'Arial, sans-serif';
  reportContainer.style.padding = '20px';
  reportContainer.style.maxWidth = '100%';
  reportContainer.style.margin = '0 auto';
  reportContainer.style.boxSizing = 'border-box';
  
  // Tambahkan header laporan
  const header = document.createElement('div');
  header.innerHTML = `
    <h1 style="text-align: center; margin-bottom: 20px;">Penilaian Tingkat Kesehatan PDAM</h1>
    <p><strong>Nama PDAM:</strong> ${assessment.name}</p>
    <p><strong>Tahun:</strong> ${assessment.year}</p>
    <p><strong>Tanggal:</strong> ${new Date(assessment.date).toLocaleDateString('id-ID')}</p>
  `;
  reportContainer.appendChild(header);
  
  // Buat tabel
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '20px';
  table.style.fontSize = '10pt';
  
  // Tambahkan header tabel
  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
    <tr style="background-color: #006400; color: white;">
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left; word-wrap: break-word;">Indikator</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">Nilai</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">Skor</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">Bobot</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">Nilai Tertimbang</th>
    </tr>
  `;
  table.appendChild(tableHeader);
  
  // Tambahkan isi tabel
  const tableBody = document.createElement('tbody');
  let rowCount = 0;
  
  // Impor indicators dari luar fungsi ini
  const indicatorsData = indicators || [];
  indicatorsData.forEach((indicator: any) => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      const rowStyle = rowCount % 2 === 0 ? '' : 'background-color: #f2f2f2;';
      rowCount++;
      
      tableBody.innerHTML += `
        <tr style="${rowStyle}">
          <td style="padding: 6px; border: 1px solid #ddd; word-wrap: break-word;">${indicator.name}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">${valueObj.value.toFixed(2)}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">${valueObj.score}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">${indicator.weight.toFixed(3)}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: right; word-wrap: break-word;">${weightedScore.toFixed(3)}</td>
        </tr>
      `;
    }
  });
  table.appendChild(tableBody);
  reportContainer.appendChild(table);
  
  // Tambahkan total skor dan kategori
  const footer = document.createElement('div');
  footer.style.marginTop = '20px';
  
  const healthCategory = getHealthCategory(assessment.totalScore);
  
  footer.innerHTML = `
    <p style="font-weight: bold;">Total Skor: ${assessment.totalScore.toFixed(2)}</p>
    <p style="font-weight: bold;">Kategori: ${healthCategory.category}</p>
    <p style="font-size: 8pt; margin-top: 30px; text-align: center;">Dicetak pada: ${new Date().toLocaleDateString('id-ID')}</p>
  `;
  reportContainer.appendChild(footer);
  
  // Simpan konten asli
  const originalContent = document.body.innerHTML;
  
  // Ganti konten body dengan laporan
  document.body.innerHTML = '';
  document.body.appendChild(reportContainer);
  
  // Tambahkan style cetak
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body { margin: 0; padding: 10mm; font-size: 10pt; }
      @page { size: portrait; margin: 10mm; }
      table { page-break-inside: auto; }
      tr { page-break-inside: avoid; page-break-after: auto; }
      h1 { font-size: 16pt; }
    }
  `;
  document.head.appendChild(style);
  
  // Cetak
  window.print();
  
  // Kembalikan konten asli
  document.body.innerHTML = originalContent;
  
  // Hapus style
  document.head.removeChild(style);
};

