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
        new Chart(goldCtx, {
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
        new Chart(goldCtx2, {
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

        // Euro grafiği
        // Euro Satış
        const euroCtx = document.getElementById('euroChart').getContext('2d');
        new Chart(euroCtx, {
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
        new Chart(euroCtx2, {
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
        new Chart(dollarCtx, {
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
        new Chart(dollarCtx2, {
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
    })
    .catch(error => console.error('JSON verisi yüklenirken bir hata oluştu:', error));
