// localStorage'dan veriyi alıyoruz
let idofitem = parseInt(localStorage.getItem('idofitem'));
window.history.pushState({},'','ürün');
// JSON dosyasını oku
fetch('data.json')
    .then(response => response.json())
    .then(items => {
        const product = document.getElementById('product');
        for (let item of items) {
            if(idofitem == parseInt(item.id) )
            {
                product.innerHTML += `
    
                    <div class="container">
                        <h3>${item.name}</h3>
                        <div class="city">
                            <!-- Modal açıldığında büyük görseli göstermek için -->
                            <a href="#modal1"><img src='${item.image}' alt="${item.name}"></a>
                        </div>
                            <p>Fiyat: <strong>${item.price} ₺ </strong></p>
                            <p>${item.description}</p>
                            <a href="/" class="Anasayfa-btn">Geri Dön</a>
                            <!-- Modal -->
                        <div id="modal1" class="modal">
                            <div class="modal-content">
                                <span class="close-btn">&times;</span>
                                <img src='${item.image}' alt="Büyük Görsel">
                            </div>
                        </div>
                    </div>

                `;
            }    
        }
        /* Modal dışına tıklanınca kapatma işlevi
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    window.location.href = "#"; // Modalı kapatır
                }
            });
            });
        */
        // Modal'ı açma ve kapama işlemleri
        var modal = document.getElementById("modal1");
        var closeBtn = document.getElementsByClassName("close-btn")[0];

        // Modal'ı açan öğe
        var modalLink = document.querySelector("a[href='#modal1']");
        modalLink.onclick = function() {
            modal.style.display = "block";
        }

        // Modal'ı kapama butonu
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Modal dışında bir yere tıklanırsa da modal kapanacak
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });



