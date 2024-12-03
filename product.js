// localStorage'dan veriyi alıyoruz
let idofitem = parseInt(localStorage.getItem('idofitem'));

// JSON dosyasını oku
fetch('./data.json')
    .then(response => response.json())
    .then(items => {
        const product = document.getElementById('product');
        for (let item of items) {
            if (idofitem === parseInt(item.id)) {
                product.innerHTML += `
                    <div class="container">
                        <h3>${item.name}</h3>
                        <div class="city">
                            <!-- Modal açıldığında büyük görseli göstermek için -->
                            <a href="#modal1"><img src='${item.image}' alt="${item.name}"></a>
                        </div>
                        <p>Fiyat: <strong>${item.price} ₺</strong></p>
                        <p>${item.description}</p>
                        <a href="/" class="Anasayfa-btn">Geri Dön</a>
                        <!-- Modal -->
                        <div id="modal1" class="modal">
                            <div class="modal-content">
                                <span class="close-btn">&times;</span>
                                <div class="ortala">
                                    <img src='${item.image}' alt="Büyük Görsel">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Modal işlemlerini tanımlıyoruz
        const modal = document.getElementById("modal1");
        const closeBtn = document.querySelector(".close-btn");
        const modalLink = document.querySelector("a[href='#modal1']");

        // Modal açma işlemi
        if (modalLink) {
            modalLink.onclick = function (event) {
                console.log("Modal açılıyor...");
                event.preventDefault(); // Varsayılan bağlantı davranışını engeller
                if (modal) {
                    modal.style.display = "block";
                }
            };
        }

        // Modal kapatma işlemi (kapat butonu)
        if (closeBtn) {
            closeBtn.onclick = function () {
                console.log("Modal kapanıyor...");
                if (modal) {
                    modal.style.display = "none";
                }
            };
        }

        // Modal dışında bir yere tıklanınca modalı kapatma işlemi
        window.onclick = function (event) {
            if (event.target === modal) {
                console.log("Modal dışına tıklandı, kapanıyor...");
                modal.style.display = "none";
            }
        };
    })
    .catch(error => {
        console.error("JSON verisi yüklenirken bir hata oluştu:", error);
    });
