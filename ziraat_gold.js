let goldChart = null;     // Satış grafiği için global değişken
let goldChart2 = null;    // Alış grafiği için global değişken

document.getElementById('filterBtn').addEventListener('click', () => {
    const days = parseInt(document.getElementById('dayCount').value);

    fetch('ziraat.json')
        .then(response => response.json())
        .then(data => {
            const today = new Date();
            const pastDate = new Date();
            pastDate.setDate(today.getDate() - days);

            const goldData = data.filter(item => {
                if (!item.name.includes("ALTIN")) return false;

                const [datePart, timePart] = item.BankDate.split(" - ");
                const [day, month, year] = datePart.split(".");
                const [hour, minute, second] = timePart.split(":");

                const bankDate = new Date(year, month - 1, day, hour, minute, second);
                return bankDate >= pastDate;
            });

            const goldLabels = goldData.map(item => item.BankDate);
            const goldPrices = goldData.map(item => parseFloat(item.bankSell.replace(',', '.')));
            const goldTookPrices = goldData.map(item => parseFloat(item.bankTake.replace(',', '.')));

            // Eğer önceki grafikler varsa yok et
            if (goldChart) goldChart.destroy();
            if (goldChart2) goldChart2.destroy();

            // Yeni grafik: Satış
            const goldCtx = document.getElementById('goldChart').getContext('2d');
            goldChart = new Chart(goldCtx, {
                type: 'line',
                data: {
                    labels: goldLabels,
                    datasets: [{
                        label: 'Altın Satış Fiyatı (₺)',
                        data: goldPrices,
                        backgroundColor: 'rgba(232, 243, 85, 0.4)',
                        borderColor: 'rgb(241, 243, 122)',
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
                            ticks: { maxTicksLimit: 10 },
                            title: { display: true, text: 'Saat' }
                        },
                        y: {
                            beginAtZero: false,
                            title: { display: true, text: 'Fiyat (₺)' }
                        }
                    }
                }
            });

            // Yeni grafik: Alış
            const goldCtx2 = document.getElementById('goldChart2').getContext('2d');
            goldChart2 = new Chart(goldCtx2, {
                type: 'line',
                data: {
                    labels: goldLabels,
                    datasets: [{
                        label: 'Altın Alış Fiyatı (₺)',
                        data: goldTookPrices,
                        backgroundColor: 'rgba(232, 243, 85, 0.4)',
                        borderColor: 'rgb(241, 243, 122)',
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
                            ticks: { maxTicksLimit: 10 },
                            title: { display: true, text: 'Saat' }
                        },
                        y: {
                            beginAtZero: false,
                            title: { display: true, text: 'Fiyat (₺)' }
                        }
                    }
                }
            });

            // Tooltip senkronizasyon
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

            const resetChartTooltip = (chart) => {
                chart.tooltip.setActiveElements([], {});
                chart.update();
            };

            document.getElementById('goldChart').addEventListener('mouseleave', () => {
                resetChartTooltip(goldChart2);
            });
            document.getElementById('goldChart2').addEventListener('mouseleave', () => {
                resetChartTooltip(goldChart);
            });

        })
        .catch(error => console.error('JSON verisi yüklenirken bir hata oluştu:', error));
});