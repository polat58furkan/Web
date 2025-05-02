function parseBankDate(dateStr) {
    // "22.04.2025 - 16:29:49" → "2025-04-22T16:29:49"
    const [datePart, timePart] = dateStr.split(' - ');
    const [day, month, year] = datePart.split('.');
    return new Date(`${year}-${month}-${day}T${timePart}`);
}

function filterAndSortByDays(data, daysBack) {
    const now = new Date();
    const past = new Date(now);
    past.setDate(now.getDate() - daysBack);

    const filtered = data.filter(item => {
        const bankDate = parseBankDate(item.BankDate);
        return bankDate >= past && bankDate <= now;
    });

    // Tarihe göre sıralama (en eski en başta)
    filtered.sort((a, b) => parseBankDate(a.BankDate) - parseBankDate(b.BankDate));

    return filtered;
}

document.getElementById('filterBtn').addEventListener('click', () => {
    const days = parseInt(document.getElementById('dayCount').value);
    const filtered = filterAndSortByDays(goldData, days);

    const labels = filtered.map(item => item.BankDate);
    const sellPrices = filtered.map(item => parseFloat(item.bankSell.replace(',', '.')));
    const takePrices = filtered.map(item => parseFloat(item.bankTake.replace(',', '.')));

    goldChart.data.labels = labels;
    goldChart.data.datasets[0].data = sellPrices;
    goldChart.update();

    goldChart2.data.labels = labels;
    goldChart2.data.datasets[0].data = takePrices;
    goldChart2.update();
});
