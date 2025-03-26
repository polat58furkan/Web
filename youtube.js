async function loadYouTubePlaylist() {
    let playlistID = "PLlfO_ZQvgbM7iZHIGngLSlvLRA557lRMV"; // Oynatma listesi ID
    let apiKey = "AIzaSyCdZfFHldGiRD3UWgK1GWeretu5RLcfM5M"; // API Anahtarınız
    let apiURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${apiKey}`;

    let videoContainer = document.getElementById("video-list"); // Videoların ekleneceği div
    videoContainer.innerHTML = ""; // Önce içeriği temizle

    let nextPageToken = null;
    
    do {
        try {
            let response = await fetch(apiURL + (nextPageToken ? `&pageToken=${nextPageToken}` : ""));
            let data = await response.json();

            // API'den gelen her video için HTML oluştur
            data.items.forEach(item => {
                let videoID = item.snippet.resourceId.videoId;
                let videoTitle = item.snippet.title;

                let videoDiv = document.createElement("div");
                videoDiv.classList.add("video-item");
                videoDiv.innerHTML = `
                    <div class="video-title">${videoTitle}</div>
                    <iframe width="360" height="200" 
                        src="https://www.youtube.com/embed/${videoID}"
                        title="${videoTitle}" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>
                `;

                videoContainer.appendChild(videoDiv);
            });

            // Sonraki sayfa var mı kontrol et
            nextPageToken = data.nextPageToken;
            
        } catch (error) {
            console.error("Oynatma listesi yüklenirken hata oluştu:", error);
            break;
        }

    } while (nextPageToken); // Tüm sayfaları getirene kadar devam et
}

// Sayfa yüklendiğinde API'den videoları çek
document.addEventListener("DOMContentLoaded", loadYouTubePlaylist);
