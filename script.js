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
                    <div>  
                        <p><strong>${item.price} ₺ </strong></p>
                    </div>
                    <div>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        }
        
        function setProductId(idofitem) 
        {
            // Veriyi localStorage'a kaydediyoruz
            localStorage.setItem('idofitem', idofitem);
            // Verinin doğru kaydedilip kaydedilmediğini kontrol ediyoruz
            if (localStorage.getItem('idofitem') === idofitem) 
            {
                console.log('Veri başarıyla kaydedildi:', idofitem);
            } 
            else 
            {
                console.error('Veri kaydedilemedi!');
            }
        }
    });

//<a href="product.html" onclick="window.history.pushState({}, '', '${item.name}');onclick="setProductId('${item.id}');"><h3><strong>${item.name}</strong></h3></a>