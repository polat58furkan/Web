// Parlak renk oluşturma fonksiyonu
function getBrightColor() {
    const r = Math.floor(155 + Math.random() * 100); // Kırmızı (155-255 arası)
    const g = Math.floor(155 + Math.random() * 100); // Yeşil (155-255 arası)
    const b = Math.floor(155 + Math.random() * 100); // Mavi (155-255 arası)
    return `rgb(${r}, ${g}, ${b})`; // RGB formatında parlak renk döndür
}

function changeTextColor() {
    const text = document.getElementById('legendText');
    const newColor = getBrightColor();
    text.style.color = newColor;
    text.style.textShadow = `0 0 10px ${newColor}, 0 0 20px ${newColor}, 0 0 30px ${newColor}`;
}

// Renk değişimini her 500ms'de bir tetikle
setInterval(changeTextColor, 1000);