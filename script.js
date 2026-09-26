console.log("Welcome to Our Little World 💛");

/* =========================
   PAGE TRANSITION
========================= */
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");

    const links = document.querySelectorAll("a[href]");

    links.forEach(link => {
        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = this.href;

            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = target;
            }, 350);
        });
    });
});

/* =========================
   PHOTO MODAL
========================= */
function openPhoto(image, title) {
    const modal = document.getElementById("photoModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");

    if (!modal) return;

    if (modalImage) modalImage.src = image;
    if (modalTitle) modalTitle.textContent = title;

    modal.classList.add("show");
}

function closePhoto() {
    const modal = document.getElementById("photoModal");
    if (modal) modal.classList.remove("show");
}

/* =========================
   MUSIC PLAYER
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playButton = document.getElementById("playButton");
    const progress = document.getElementById("progress");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");
    const vinyl = document.getElementById("vinyl");
    const musicPlayer = document.querySelector(".music-player");

    if (!audio || !playButton) return;

    playButton.addEventListener("click", async () => {
        try {
            if (audio.paused) {
                await audio.play();
                playButton.textContent = "❚❚";
                if (vinyl) vinyl.classList.add("playing");
                if (musicPlayer) musicPlayer.classList.add("playing");
            } else {
                audio.pause();
                playButton.textContent = "▶";
                if (vinyl) vinyl.classList.remove("playing");
                if (musicPlayer) musicPlayer.classList.remove("playing");
            }
        } catch (error) {
            console.error("Musik gagal diputar:", error);
            alert("Musiknya belum bisa diputar 😭\n\nCoba cek apakah file MP3 sudah ada di folder:\nmusic/our-song.mp3");
        }
    });

    audio.addEventListener("loadedmetadata", () => {
        if (duration) duration.textContent = formatTime(audio.duration);
        if (progress) progress.value = 0;
    });

    audio.addEventListener("timeupdate", () => {
        if (audio.duration && progress) {
            progress.value = (audio.currentTime / audio.duration) * 100;
        }
        if (currentTime) {
            currentTime.textContent = formatTime(audio.currentTime);
        }
    });

    if (progress) {
        progress.addEventListener("input", () => {
            if (!audio.duration) return;
            audio.currentTime = (progress.value / 100) * audio.duration;
        });
    }

    audio.addEventListener("ended", () => {
        playButton.textContent = "▶";
        if (vinyl) vinyl.classList.remove("playing");
        if (musicPlayer) musicPlayer.classList.remove("playing");
        if (progress) progress.value = 0;
        if (currentTime) currentTime.textContent = "0:00";
    });
});

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

/* =========================
   LETTER
========================= */
function openLetter() {
    const envelope = document.getElementById("envelope");
    const button = document.getElementById("openLetterButton");
    const content = document.getElementById("letterContent");

    if (!envelope || !content) return;

    // Sembunyikan tombol dengan efek fade-out
    if (button) {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
        setTimeout(() => {
            button.style.display = "none";
        }, 300);
    }

    // Buka amplop
    envelope.classList.add("open");

    // Tampilkan isi teks surat secara bertahap setelah animasi amplop selesai
    setTimeout(() => {
        content.classList.add("show");
        
        const paragraphs = content.querySelectorAll("p");
        paragraphs.forEach((paragraph, index) => {
            paragraph.style.opacity = "0";
            paragraph.style.transform = "translateY(15px)";
            
            setTimeout(() => {
                paragraph.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                paragraph.style.opacity = "1";
                paragraph.style.transform = "translateY(0)";
            }, index * 250);
        });
    }, 1200);
}
/* =========================
   FLOATING HEARTS
========================= */
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "♡";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";
    heart.style.fontSize = Math.random() * 10 + 12 + "px";
    heart.style.color = "#e0bd35";
    heart.style.opacity = "0.5";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1";
    heart.style.transition = "transform 5s linear, opacity 5s linear";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 100 - 50}px)`;
        heart.style.opacity = "0";
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, 5200);
}

setInterval(createHeart, 2500);

/* =========================
   LOCK SCREEN / SANDI (SAFE)
========================= */
const TANGGAL_JADIAN = "04082026"; 

function checkPassword() {
    const passInput = document.getElementById("passInput");
    const errorMsg = document.getElementById("error-msg");
    const overlay = document.getElementById("password-overlay");

    if (!passInput) return;

    const input = passInput.value.trim();

    if (input === TANGGAL_JADIAN) {
        if (overlay) {
            overlay.style.transition = "opacity 0.5s ease, visibility 0.5s";
            overlay.style.opacity = "0";
            setTimeout(() => overlay.style.display = "none", 500);
        }
    } else {
        if (errorMsg) errorMsg.innerText = "Uppss, tanggalnya salah ih beee! Masa lupa? 😜";
        const card = document.querySelector('.password-card');
        if (card) {
            card.style.transform = "translateX(8px)";
            setTimeout(() => card.style.transform = "translateX(-8px)", 80);
            setTimeout(() => card.style.transform = "translateX(8px)", 160);
            setTimeout(() => card.style.transform = "translateX(0px)", 240);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const passInput = document.getElementById("passInput");
    if (passInput) {
        passInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                checkPassword();
            }
        });
    }
});

/* =========================
   SURPRISE / GIFT & FLOWER BOOM
========================= */
function openGift() {
    const gift = document.getElementById("gift");
    const button = document.getElementById("openGiftButton");
    const finalMsg = document.getElementById("finalMessage");

    if (!gift) return;

    if (button) {
        button.style.display = "none";
    }

    // Sembunyikan kartu pesan dulu saat tombol kado dipencet
    if (finalMsg) {
        finalMsg.classList.add("card-hidden");
        finalMsg.classList.remove("card-show");
    }

    // Getar kado
    gift.classList.add("shaking");

    setTimeout(() => {
        gift.classList.remove("shaking");
        gift.classList.add("open"); 
        
        startFlowerBoom();
    }, 2000); 
}

function startFlowerBoom() {
    const container = document.getElementById("flowerExplosion");
    const gift = document.getElementById("gift");
    const finalMsg = document.getElementById("finalMessage");

    if (!container) return;

    container.innerHTML = "";
    container.classList.remove("fade-out");

    const flowers = [
        "images/flower1.png",
        "images/flower2.png",
        "images/flower3.png",
        "images/flower4.png",
        "images/flower5.png",
        "images/flower6.png"
    ];

    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;

    if (gift) {
        const rect = gift.getBoundingClientRect();
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height / 2;
    }

    const totalFlowers = window.innerWidth <= 600 ? 150 : 250;

    for (let i = 0; i < totalFlowers; i++) {
        const flower = document.createElement("img");
        flower.src = flowers[Math.floor(Math.random() * flowers.length)];
        flower.className = "explosion-flower";

        flower.style.left = originX + "px";
        flower.style.top = originY + "px";

        const targetScreenX = Math.random() * window.innerWidth;
        const targetScreenY = Math.random() * window.innerHeight;

        const x = targetScreenX - originX;
        const y = targetScreenY - originY;

        const scale = 1.2 + Math.random() * 2.3; 
        const rotation = Math.random() * 720 - 360;

        flower.style.setProperty("--x", `${x}px`);
        flower.style.setProperty("--y", `${y}px`);
        flower.style.setProperty("--scale", scale);
        flower.style.setProperty("--rotation", `${rotation}deg`);

        flower.style.animationDelay = `${Math.random() * 0.3}s`;

        container.appendChild(flower);
    }

    // Biarkan bunga selama 4 detik, lalu fade-out
    setTimeout(() => {
        container.classList.add("fade-out");
    }, 4000);

    // Setelah bunga hilang sepenuhnya, tampilkan kartu pesan "For You"
    setTimeout(() => {
        container.innerHTML = "";
        container.classList.remove("fade-out");

        if (finalMsg) {
            finalMsg.classList.remove("card-hidden");
            finalMsg.classList.add("card-show");
        }
    }, 6500);
}

/* =========================
   RELATIONSHIP COUNTER
========================= */
// Silakan atur tanggal jadian kalian di sini (Format: YYYY-MM-DDTHH:mm:ss)
const START_DATE = new Date("2026-08-04T17:00:00"); 

function updateRelationshipCounter() {
    const daysEl = document.getElementById("counter-days");
    const hoursEl = document.getElementById("counter-hours");
    const minutesEl = document.getElementById("counter-minutes");
    const secondsEl = document.getElementById("counter-seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date();
    const diffInMs = now - START_DATE;

    if (diffInMs < 0) {
        // Jika tanggal belum terlewati
        daysEl.textContent = "0";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    const seconds = Math.floor((diffInMs / 1000) % 60);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", () => {
    updateRelationshipCounter();
    setInterval(updateRelationshipCounter, 1000);
});