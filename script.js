// JSON dosyasını oku
fetch('./data.json')
    .then(response => response.json())
    .then(items => {
        const product = document.getElementById('product');
        for (let item of items) {
            product.innerHTML += `
                <div class="product" >
                    <div id="products" href="product.html" onclick="setProductId('${item.id}', event);" >
                        <h3><strong>${item.name}</strong></h3>
                        <img src="${item.image}" alt="${item.name}" >
                        <p><strong>${item.price} ₺ </strong></p>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;

        }

    });
function setProductId(idofitem, event) 
{
    // Varsayılan davranışı engelle
    event.preventDefault();

    // Veriyi localStorage'a kaydet
    localStorage.setItem('idofitem', idofitem);

    // Kaydın başarılı olduğunu kontrol et
    if (localStorage.getItem('idofitem') === idofitem) {
        console.log('Veri başarıyla kaydedildi:', idofitem);
        // Daha sonra sayfayı değiştir
        window.location.href = "product.html";
    } else {
        console.error('Veri kaydedilemedi!');
    }
}
//<a href="product.html" onclick="window.history.pushState({}, '', '${item.name}');onclick="setProductId('${item.id}');"><h3><strong>${item.name}</strong></h3></a>
function toggleMenu() {
    const menu = document.getElementById('category'); // Menü elementini seç
    const menu_2=document.getElementById('radioselection')
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex'; // Görünür yap
        menu_2.style.display = 'flex'; // Görünür yap

    } else {
        menu.style.display = 'none'; // Gizle
        menu_2.style.display = 'none'; // Gizle
    }
  }