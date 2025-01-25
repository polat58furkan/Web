// JSON verisini yüklemek
fetch('ziraat.json')
    .then(response => response.json())
    .then(data => {
        // Altın verisi
        const goldData = data.filter(item => item.name.includes("ALTIN"));
        const goldLabels = goldData.map(item => item.Time); // Saat bilgisi
        const goldPrices = goldData.map(item => parseFloat(item.bankSell.replace(',', '.'))); // Satış fiyatları
        const goldTookPrices = goldData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları

        // Euro verisi
        const euroData = data.filter(item => item.name.includes("EURO"));
        const euroLabels = euroData.map(item => item.Time);
        const euroPrices = euroData.map(item => parseFloat(item.bankSell.replace(',', '.')));
        const euroTookPrices = euroData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları

        // Dolar verisi
        const dollarData = data.filter(item => item.name.includes("DOLARI"));
        const dollarLabels = dollarData.map(item => item.Time);
        const dollarPrices = dollarData.map(item => parseFloat(item.bankSell.replace(',', '.')));
        const dollarTookPrices = dollarData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları

        // Altın grafiği

        // Satış
        const goldCtx = document.getElementById('goldChart').getContext('2d');
        const goldChart = new Chart(goldCtx, {
            type: 'line', // Çizgi grafiği
            data: {
                labels: goldLabels, // Saat bilgileri
                datasets: [{
                    label: 'Altın Satış Fiyatı (₺)',
                    data: goldPrices, // Fiyat bilgileri
                    backgroundColor: 'rgba(232, 243, 85, 0.4)',
                    borderColor: 'rgb(241, 243, 122)',
                    borderWidth: 1,
                    fill: true // Alan doldurma
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10 // X ekseninde en fazla 10 etiket göster
                        },
                        maintainAspectRatio: false, // Oran korumayı devre dışı bırak
                        title: { display: true, text: 'Saat' } // X ekseni başlığı
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Fiyat (₺)' } // Y ekseni başlığı
                    }
                }
            }
        });

        // Alış
        const goldCtx2 = document.getElementById('goldChart2').getContext('2d');
        const goldChart2 = new Chart(goldCtx2, {
            type: 'line', // Çizgi grafiği
            data: {
                labels: goldLabels, // Saat bilgileri
                datasets: [{
                    label: 'Altın Alış Fiyatı (₺)',
                    data: goldTookPrices, // Fiyat bilgileri
                    backgroundColor: 'rgba(232, 243, 85, 0.4)',
                    borderColor: 'rgb(241, 243, 122)',
                    borderWidth: 1,
                    fill: true // Alan doldurma
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10 // X ekseninde en fazla 10 etiket göster
                        },
                        maintainAspectRatio: false, // Oran korumayı devre dışı bırak
                        title: { display: true, text: 'Saat' } // X ekseni başlığı
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Fiyat (₺)' } // Y ekseni başlığı
                    }
                }
            }
        });

        // Mouse hareketlerini senkronize etme
        const synchronizeCharts = (event, chart, otherChart) => {
            const points = chart.getElementsAtEventForMode(event, 'index', { intersect: false }, false);
            if (points.length) {
                const pointIndex = points[0].index;
                const meta = otherChart.getDatasetMeta(0);
                const activePoint = meta.data[pointIndex];
                otherChart.tooltip.setActiveElements([{ datasetIndex: 0, index: pointIndex }], {
                    x: activePoint.x,
                    y: activePoint.y
                });
                otherChart.update();
            }
        };

        document.getElementById('goldChart').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, goldChart, goldChart2);
        });

        document.getElementById('goldChart2').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, goldChart2, goldChart);
        });

        // Euro grafiği
        // Euro Satış
        const euroCtx = document.getElementById('euroChart').getContext('2d');
        const euroChart = new Chart(euroCtx, {
            type: 'line',
            data: {
                labels: euroLabels,
                datasets: [{
                    label: 'Euro Satış Fiyatı (₺)',
                    data: euroPrices,
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10 // X ekseninde en fazla 10 etiket göster
                        },
                        maintainAspectRatio: false, // Oran korumayı devre dışı bırak
                        title: { display: true, text: 'Saat' }
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Fiyat (₺)' }
                    }
                }
            }
        });
        // Euro Alış
        const euroCtx2 = document.getElementById('euroChart2').getContext('2d');
        const euroChart2 = new Chart(euroCtx2, {
            type: 'line',
            data: {
                labels: euroLabels,
                datasets: [{
                    label: 'Euro Satış Fiyatı (₺)',
                    data: euroTookPrices,
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10 // X ekseninde en fazla 10 etiket göster
                        },
                        maintainAspectRatio: false, // Oran korumayı devre dışı bırak
                        title: { display: true, text: 'Saat' }
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Fiyat (₺)' }
                    }
                }
            }
        });

        document.getElementById('euroChart').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, euroChart, euroChart2);
        });

        document.getElementById('euroChart2').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, euroChart2, euroChart);
        });

        // Dolar grafiği
        // Dolar Satış
        const dollarCtx = document.getElementById('dollarChart').getContext('2d');
        const dollarChart = new Chart(dollarCtx, {
            type: 'line',
            data: {
                labels: dollarLabels,
                datasets: [{
                    label: 'Dolar Satış Fiyatı (₺)',
                    data: dollarPrices,
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgb(59, 175, 59)',
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10 // X ekseninde en fazla 10 etiket göster
                        },
                        maintainAspectRatio: false, // Oran korumayı devre dışı bırak
                        title: { display: true, text: 'Saat' }
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Fiyat (₺)' }
                    }
                }
            }
        });
        //Dolar Alış 
        const dollarCtx2 = document.getElementById('dollarChart2').getContext('2d');
        const dollarChart2 = new Chart(dollarCtx2, {
            type: 'line',
            data: {
                labels: dollarLabels,
                datasets: [{
                    label: 'Dolar Satış Fiyatı (₺)',
                    data: dollarTookPrices,
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgb(59, 175, 59)',
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10 // X ekseninde en fazla 10 etiket göster
                        },
                        maintainAspectRatio: false, // Oran korumayı devre dışı bırak
                        title: { display: true, text: 'Saat' }
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Fiyat (₺)' }
                    }
                }
            }
        });

        document.getElementById('dollarChart').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, dollarChart, dollarChart2);
        });

        document.getElementById('dollarChart2').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, dollarChart2, dollarChart);
        });

        // Tooltip ve activeElements sıfırlama fonksiyonu
        const resetChartTooltip = (chart) => {
            chart.tooltip.setActiveElements([], {}); // Tooltip sıfırlama
            chart.update(); // Grafiği güncelle
        };

        // Fare çıkışı olayları için event listener ekleme
        document.getElementById('goldChart').addEventListener('mouseleave', () => {
            resetChartTooltip(goldChart2); // Diğer grafikteki tooltip'i temizle
        });
        document.getElementById('goldChart2').addEventListener('mouseleave', () => {
            resetChartTooltip(goldChart); // Diğer grafikteki tooltip'i temizle
        });

        document.getElementById('euroChart').addEventListener('mouseleave', () => {
            resetChartTooltip(euroChart2);
        });
        document.getElementById('euroChart2').addEventListener('mouseleave', () => {
            resetChartTooltip(euroChart);
        });

        document.getElementById('dollarChart').addEventListener('mouseleave', () => {
            resetChartTooltip(dollarChart2);
        });
        document.getElementById('dollarChart2').addEventListener('mouseleave', () => {
            resetChartTooltip(dollarChart);
        });


        // Çizgi çizen fonksiyon
        function drawLineBetweenCanvases(index, chart1, chart2, overlayCanvas) {
            const ctx = overlayCanvas.getContext('2d');
            const rect1 = chart1.canvas.getBoundingClientRect();
            const rect2 = chart2.canvas.getBoundingClientRect();
            const meta1 = chart1.getDatasetMeta(0);
            const meta2 = chart2.getDatasetMeta(0);

            // İlgili indexteki noktaların koordinatları
            const point1 = meta1.data[index];
            const point2 = meta2.data[index];

            const x1 = rect1.left + point1.x;
            const y1 = rect1.top + point1.y;
            const x2 = rect2.left + point2.x;
            const y2 = rect2.top + point2.y;

            // Çizim
            ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height); // Önce temizle
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Canvas'lar arası çizgi için overlay canvas ayarı
        const overlayCanvas = document.getElementById('overlayCanvas');
        overlayCanvas.width = window.innerWidth;
        overlayCanvas.height = window.innerHeight;
        const overlayCtx = overlayCanvas.getContext('2d');

        // Senkronizasyon fonksiyonunu genişletme
        const synchronizeChartsWithLine = (event, chart, otherChart) => {
            const points = chart.getElementsAtEventForMode(event, 'index', { intersect: false }, false);
            if (points.length) {
                const pointIndex = points[0].index;
                const meta = otherChart.getDatasetMeta(0);
                const activePoint = meta.data[pointIndex];

                // Tooltip senkronizasyonu
                otherChart.tooltip.setActiveElements([{ datasetIndex: 0, index: pointIndex }], {
                    x: activePoint.x,
                    y: activePoint.y
                });
                otherChart.update();

                // Çizgi ekleme
                drawLineBetweenCanvases(pointIndex, chart, otherChart, overlayCanvas);
            }
        };

        // Gold chart'larda fare olayını güncelleme
        document.getElementById('goldChart').addEventListener('mousemove', (e) => {
            synchronizeChartsWithLine(e, goldChart, goldChart2);
        });

        document.getElementById('goldChart2').addEventListener('mousemove', (e) => {
            synchronizeChartsWithLine(e, goldChart2, goldChart);
        });

        document.getElementById('goldChart').addEventListener('mouseleave', () => {
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        });
        document.getElementById('goldChart2').addEventListener('mouseleave', () => {
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        });

    })
    .catch(error => console.error('JSON verisi yüklenirken bir hata oluştu:', error));
