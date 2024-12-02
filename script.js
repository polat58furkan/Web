// JSON dosyasını oku
fetch('./data.json')
    .then(response => response.json())
    .then(items => {
        const product = document.getElementById('product');
        for (let item of items) {
            product.innerHTML += `
                <div class="product" >
                    <div>
                        <a href="product.html" onclick="setProductId('${item.id}');"><h3><strong>${item.name}</strong></h3></a>
                        <img src='${item.image}' alt="${item.name}" >
                    </div>    
                    <p><strong>${item.price} ₺ </strong></p>
                    <p>${item.description}</p>
                </div>
            `;
        }
        function setProductId(idofitem) {
            // Veriyi localStorage'a kaydediyoruz
            localStorage.setItem('idofitem', idofitem);
            
            }
    });

//<a href="product.html" onclick="window.history.pushState({}, '', '${item.name}');onclick="setProductId('${item.id}');"><h3><strong>${item.name}</strong></h3></a>