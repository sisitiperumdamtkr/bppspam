
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
