// localStorage'dan veriyi alıyoruz
let idofitem = parseInt(localStorage.getItem('idofitem'));
//window.history.pushState({},'','ürün');
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
                            <!-- Modal açildiğinda büyük görseli göstermek için -->
                            <a href="#modal1"><img src='${item.image}' alt="${item.name}"></a>
                        </div>
                            <p>Fiyat: <strong>${item.price} ₺ </strong></p>
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
        // Modal Event Delegation ile açma ve kapama
        document.body.addEventListener('click', function (event) {
            const modalTrigger = event.target.closest('.modal-trigger');
            const modalClose = event.target.closest('.close-btn');
            const modal = document.getElementById('modal1');

            // Modal açma
            if (modalTrigger) {
                event.preventDefault(); // Varsayılan bağlantı davranışını engelle
                modal.style.display = "block";
            }

            // Modal kapama
            if (modalClose || event.target === modal) {
                modal.style.display = "none";
            }
        });
        /*
        // Modal'ı açma ve kapama işlemlerini burada tanımlıyoruz
        const modal = document.getElementById("modal1");
        const closeBtn = document.querySelector(".close-btn");
        const modalLink = document.querySelector("a[href='#modal1']");

        if (modalLink) {
            modalLink.onclick = function (event) {
                console.log("gör babaaaaa")
                event.preventDefault(); // Varsayılan davranışı engelle
                modal.style.display = "block";
            };
        }

        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
                console.log("ne görecem babaaaaa")
            };
        }

        // Modal dışında bir yere tıklanırsa modal kapanacak
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                console.log("babaaaaa")
            }
        };
        */
    });

