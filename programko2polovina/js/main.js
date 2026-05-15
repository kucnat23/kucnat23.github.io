// --- 1. ODPOČET DO NOVÉ VÝSTAVY ---
const ciloveDatum = new Date("December 24, 2026 23:59:59").getTime();

function spustOdpocet() {
    const ted = new Date().getTime();
    const rozdil = ciloveDatum - ted;

    if (rozdil > 0) {
        // Výpočet času 
        const dny = Math.floor(rozdil / (1000 * 60 * 60 * 24));
        const hodiny = Math.floor((rozdil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minuty = Math.floor((rozdil % (1000 * 60 * 60)) / (1000 * 60));
        const sekundy = Math.floor((rozdil % (1000 * 60)) / 1000);

        // Zápis do HTML (přidávám nulu před jednociferná čísla pro lepší vzhled)
        document.getElementById("days").innerText = dny.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hodiny.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minuty.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = sekundy.toString().padStart(2, '0');
    } else {
        document.getElementById("countdown").innerHTML = "VÝSTAVA JE JIŽ OTEVŘENA!";
    }
}

// Aktualizace každou sekundu
setInterval(spustOdpocet, 1000);
spustOdpocet(); // Spustit hned po načtení stránky

// --- 2. MENU PRO MOBILY (HAMBURGER) ---
const tlacitkoMenu = document.getElementById('hamburger');
const navigace = document.getElementById('nav-links');

tlacitkoMenu.onclick = () => {
    navigace.classList.toggle('active');
};



// 1. LOGIKA POSUNU (Skupiny po 3)
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentGroup = 0; 

function moveCarousel() {
    // Spočítáme šířku jednoho posunu (celý kontejner)
    const containerWidth = track.parentElement.offsetWidth + 20;
    track.style.transform = `translateX(-${currentGroup * containerWidth}px)`;
}

nextBtn.onclick = () => {
    currentGroup = (currentGroup < 2) ? currentGroup + 1 : 0; // Posunout nebo na začátek
    moveCarousel();
};

prevBtn.onclick = () => {
    currentGroup = (currentGroup > 0) ? currentGroup - 1 : 2; // Zpět nebo na konec
    moveCarousel();
};


// --- LOGIKA FAQ (AKORDEON) ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
        // Zavře ostatní (pokud chceš, aby bylo otevřené jen jedno najednou)
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        // Přepne aktuální
        item.classList.toggle('active');
    });
});