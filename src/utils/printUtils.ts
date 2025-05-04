
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
      }
      
      table th, table td {
        border: 1px solid #ddd;
        padding: 8px;
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
export const printPURPReport = (assessment: any) => {
  // Buat elemen kontainer untuk laporan
  const reportContainer = document.createElement('div');
  reportContainer.className = 'pupr-report-container';
  reportContainer.style.fontFamily = 'Arial, sans-serif';
  reportContainer.style.padding = '20px';
  reportContainer.style.maxWidth = '800px';
  reportContainer.style.margin = '0 auto';
  
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
  
  // Tambahkan header tabel
  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
    <tr style="background-color: #006400; color: white;">
      <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Indikator</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Nilai</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Skor</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Bobot</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Nilai Tertimbang</th>
    </tr>
  `;
  table.appendChild(tableHeader);
  
  // Tambahkan isi tabel
  const tableBody = document.createElement('tbody');
  let rowCount = 0;
  
  // Impor indicators dari luar fungsi ini
  const indicators = (window as any).indicators || [];
  indicators.forEach((indicator: any) => {
    const valueObj = assessment.values[indicator.id];
    if (valueObj) {
      const weightedScore = valueObj.score * indicator.weight;
      const rowStyle = rowCount % 2 === 0 ? '' : 'background-color: #f2f2f2;';
      rowCount++;
      
      tableBody.innerHTML += `
        <tr style="${rowStyle}">
          <td style="padding: 8px; border: 1px solid #ddd;">${indicator.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${valueObj.value.toFixed(2)}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${valueObj.score}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${indicator.weight.toFixed(3)}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${weightedScore.toFixed(3)}</td>
        </tr>
      `;
    }
  });
  table.appendChild(tableBody);
  reportContainer.appendChild(table);
  
  // Tambahkan total skor dan kategori
  const footer = document.createElement('div');
  footer.style.marginTop = '20px';
  
  const healthCategory = (window as any).getHealthCategory ? 
    (window as any).getHealthCategory(assessment.totalScore) : 
    { category: 'Tidak diketahui' };
  
  footer.innerHTML = `
    <p style="font-weight: bold;">Total Skor: ${assessment.totalScore.toFixed(2)}</p>
    <p style="font-weight: bold;">Kategori: ${healthCategory.category}</p>
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
      body { margin: 0; padding: 15mm; }
      @page { size: portrait; margin: 10mm; }
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
