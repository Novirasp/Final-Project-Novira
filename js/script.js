// Palet warna untuk chart PDRB
const brilliantBluesPalette = [
  '#003f5c','#665191','#d45087',
  '#f95d6a','#ff7c43','#ffa600',
  '#2f4b7c','#a05195'
];

// Membungkus label panjang agar muat di legend/chart
function wrapLabel(str, maxWidth) {
  if (str.length <= maxWidth) return [str];
  const words = str.split(' ');
  let lines = [], current = words[0];
  for (let w of words.slice(1)) {
    if (current.length + w.length + 1 < maxWidth) {
      current += ' ' + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  lines.push(current);
  return lines;
}

// Callback tooltip untuk title
const tooltipTitleCallback = (tooltipItems) => {
  const item = tooltipItems[0];
  const label = item.chart.data.labels[item.dataIndex];
  // jika array → langsung kembalikan array (Chart.js akan baris per elemen)
  return Array.isArray(label) ? label : [label];
};

// Opsi chart umum
const commonChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { family: 'Inter' },
        boxWidth: 20,
        padding: 20
      }
    },
    tooltip: {
      callbacks: { title: tooltipTitleCallback },
      bodyFont: { family: 'Inter' },
      titleFont: { family: 'Inter' }
    }
  }
};

// 1) Tren Penurunan Kemiskinan (line)
new Chart(
  document.getElementById('povertyTrendChart').getContext('2d'),
  {
    type: 'line',
    data: {
      labels: ['2018','2019','2020','2021','2022','2023','2024'],
      datasets: [{
        label: 'Persentase Penduduk Miskin (%)',
        data: [30.13,30.02,29.65,29.68,28.22,28.08,27.04],
        borderColor: '#d45087',
        backgroundColor: 'rgba(212,80,135,0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      ...commonChartOptions,
      scales: {
        y: {
          beginAtZero: false,
          ticks: { callback: v => v + '%' }
        }
      }
    }
  }
);

// 2) Perbandingan Kemiskinan di NTT (bar)
new Chart(
  document.getElementById('povertyComparisonChart').getContext('2d'),
  {
    type: 'bar',
    data: {
      labels: ['Sumba Timur','Kupang','Belu','Sumba Barat'],
      datasets: [{
        label: 'Tingkat Kemiskinan (%) per 2024',
        data: [27.04,21.37,13.86,26.52],
        backgroundColor: ['#f95d6a','#ff7c43','#ffa600','#a05195'],
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1
      }]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        legend: { display: false }
      }
    }
  }
);

// 3) Kontribusi PDRB (doughnut)
const pdrbLabelsRaw = [
  'Pertanian, Kehutanan, & Perikanan',
  'Perdagangan & Reparasi',
  'Jasa Pendidikan',
  'Konstruksi',
  'Administrasi & Jaminan Sosial'
];
// wrapLabel mengembalikan array baris, sekarang kita join pakai newline
const pdrbLabelsWrapped = pdrbLabelsRaw.map(l =>
  wrapLabel(l, 16).join('\n')
);

new Chart(
  document.getElementById('pdrbChart').getContext('2d'),
  {
    type: 'doughnut',
    data: {
      labels: pdrbLabelsWrapped,
      datasets: [{
        label: 'Kontribusi PDRB (%)',
        data: [27.11,15.60,15.82,10.37,8.81],
        backgroundColor: brilliantBluesPalette,
        hoverOffset: 4
      }]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        legend: { position: 'right' }
      }
    }
  }
);
