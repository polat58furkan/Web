let goldChart = null;     // Satış grafiği için global değişken
let goldChart2 = null;    // Alış grafiği için global değişken
let euroChart = null;     // Euro Satış grafiği için global değişken
let euroChart2 = null;    // Euro Alış grafiği için global değişken
let dollarChart = null;   // Dolar Satış grafiği için global değişken
let dollarChart2 = null;  // Dolar Alış grafiği için global değişken

// JSON verisini yüklemek
fetch('ziraat.json')
    .then(response => response.json())
    .then(data => {
        // Altın verisi
        const goldData = data.filter(item => item.name.includes("ALTIN"));
        const goldLabels = goldData.map(item => item.BankDate ); // Saat bilgisi
        const goldPrices = goldData.map(item => parseFloat(item.bankSell.replace(',', '.'))); // Satış fiyatları
        const goldTookPrices = goldData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları

        // Euro verisi
        const euroData = data.filter(item => item.name.includes("EURO"));
        const euroLabels = euroData.map(item => item.BankDate);
        const euroPrices = euroData.map(item => parseFloat(item.bankSell.replace(',', '.')));
        const euroTookPrices = euroData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları

        // Dolar verisi
        const dollarData = data.filter(item => item.name.includes("DOLARI"));
        const dollarLabels = dollarData.map(item => item.BankDate);
        const dollarPrices = dollarData.map(item => parseFloat(item.bankSell.replace(',', '.')));
        const dollarTookPrices = dollarData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları

        /*
        // Eğer önceki grafikler varsa yok et
        if (goldChart) goldChart.destroy();
        if (goldChart2) goldChart2.destroy();
        if (euroChart) euroChart.destroy();
        if (euroChart2) euroChart2.destroy();
        if (dollarChart) dollarChart.destroy();
        if (dollarChart2) dollarChart2.destroy();
        */
       
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
        // Altın
        document.getElementById('goldChart').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, goldChart, goldChart2);
            synchronizeCharts(e, goldChart, euroChart);
            synchronizeCharts(e, goldChart, euroChart2);
            synchronizeCharts(e, goldChart, dollarChart);
            synchronizeCharts(e, goldChart, dollarChart2);
        });

        document.getElementById('goldChart2').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, goldChart2, goldChart);
            synchronizeCharts(e, goldChart2, euroChart);
            synchronizeCharts(e, goldChart2, euroChart2);
            synchronizeCharts(e, goldChart2, dollarChart);
            synchronizeCharts(e, goldChart2, dollarChart2);
        });
        // EURO
        document.getElementById('euroChart').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, euroChart, euroChart2);
            synchronizeCharts(e, euroChart, goldChart);
            synchronizeCharts(e, euroChart, goldChart2);
            synchronizeCharts(e, euroChart, dollarChart);
            synchronizeCharts(e, euroChart, dollarChart2);
        });

        document.getElementById('euroChart2').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, euroChart2, euroChart);
            synchronizeCharts(e, euroChart2, goldChart);
            synchronizeCharts(e, euroChart2, goldChart2);
            synchronizeCharts(e, euroChart2, dollarChart);
            synchronizeCharts(e, euroChart2, dollarChart2);
        });

        // Dolar
        document.getElementById('dollarChart').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, dollarChart, dollarChart2);
            synchronizeCharts(e, dollarChart, goldChart);
            synchronizeCharts(e, dollarChart, goldChart2);
            synchronizeCharts(e, dollarChart, euroChart);
            synchronizeCharts(e, dollarChart, euroChart2);
        });

        document.getElementById('dollarChart2').addEventListener('mousemove', (e) => {
            synchronizeCharts(e, dollarChart2, dollarChart);
            synchronizeCharts(e, dollarChart2, goldChart);
            synchronizeCharts(e, dollarChart2, goldChart2);
            synchronizeCharts(e, dollarChart2, euroChart);
            synchronizeCharts(e, dollarChart2, euroChart2);
        });

        // Tooltip ve activeElements sıfırlama fonksiyonu
        const resetChartTooltip = (chart) => {
            chart.tooltip.setActiveElements([], {}); // Tooltip sıfırlama
            chart.update(); // Grafiği güncelle
        };

        // Fare çıkışı olayları için event listener ekleme
        document.getElementById('goldChart').addEventListener('mouseleave', () => {
            resetChartTooltip(goldChart2); // Diğer grafikteki tooltip'i temizle
            resetChartTooltip(euroChart);
            resetChartTooltip(euroChart2);
            resetChartTooltip(dollarChart);
            resetChartTooltip(dollarChart2);
        });
        document.getElementById('goldChart2').addEventListener('mouseleave', () => {
            resetChartTooltip(goldChart); // Diğer grafikteki tooltip'i temizle
            resetChartTooltip(euroChart);
            resetChartTooltip(euroChart2);
            resetChartTooltip(dollarChart);
            resetChartTooltip(dollarChart2);
        });

        document.getElementById('euroChart').addEventListener('mouseleave', () => {
            resetChartTooltip(euroChart2);
            resetChartTooltip(goldChart);
            resetChartTooltip(goldChart2);
            resetChartTooltip(dollarChart);
            resetChartTooltip(dollarChart2);
        });
        document.getElementById('euroChart2').addEventListener('mouseleave', () => {
            resetChartTooltip(euroChart);
            resetChartTooltip(goldChart);
            resetChartTooltip(goldChart2);
            resetChartTooltip(dollarChart);
            resetChartTooltip(dollarChart2);
        });

        document.getElementById('dollarChart').addEventListener('mouseleave', () => {
            resetChartTooltip(dollarChart2);
            resetChartTooltip(goldChart);
            resetChartTooltip(goldChart2);
            resetChartTooltip(euroChart);
            resetChartTooltip(euroChart2);
        });
        document.getElementById('dollarChart2').addEventListener('mouseleave', () => {
            resetChartTooltip(dollarChart);
            resetChartTooltip(goldChart);
            resetChartTooltip(goldChart2);
            resetChartTooltip(euroChart);
            resetChartTooltip(euroChart2);
        });

        
    })
    .catch(error => console.error('JSON verisi yüklenirken bir hata oluştu:', error));
