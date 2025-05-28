// Ziraat Bankası Altın Fiyatları Grafiği
document.getElementById('filterBtn').addEventListener('click', () => {

    const days = parseInt(document.getElementById('dayCount').value);
    // JSON verisini yüklemek
    fetch('ziraat.json')
        .then(response => response.json())
        .then(data => {

            // Bugünün tarihi
            const today = new Date();

            // 5 gün önceki tarih
            
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(today.getDate() - days);

            // Altın verilerini filtrele
            const goldData = data.filter(item => {
                if (!item.name.includes("ALTIN")) return false;

                // BankDate formatı: "22.04.2025 - 16:29:49"
                const [datePart, timePart] = item.BankDate.split(" - ");
                const [day, month, year] = datePart.split(".");
                const [hour, minute, second] = timePart.split(":");

                const bankDate = new Date(year, month - 1, day, hour, minute, second);

                // Son 5 gün içinde mi?
                return bankDate >= fiveDaysAgo;
            });


        // Altın verisi
        
        // const goldData = data.filter(item => item.name.includes("ALTIN"));
            const goldLabels = goldData.map(item => item.BankDate ); // Saat bilgisi
            const goldPrices = goldData.map(item => parseFloat(item.bankSell.replace(',', '.'))); // Satış fiyatları
            const goldTookPrices = goldData.map(item => parseFloat(item.bankTake.replace(',', '.'))); // Alış fiyatları


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

            // Altın
            document.getElementById('goldChart').addEventListener('mousemove', (e) => {
                synchronizeCharts(e, goldChart, goldChart2);
            });

            document.getElementById('goldChart2').addEventListener('mousemove', (e) => {
                synchronizeCharts(e, goldChart2, goldChart);
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
            
        })
        .catch(error => console.error('JSON verisi yüklenirken bir hata oluştu:', error));


});


