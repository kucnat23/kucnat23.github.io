// --- 1. ODPOČET DO NOVÉ VÝSTAVY ---
// Nastav si cílové datum (např. 24. prosince 2026) [cite: 11]
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

        // Zápis do HTML (přidáváme nulu před jednociferná čísla pro lepší vzhled)
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

// --- 3. NAČÍTÁNÍ VÝSTAV Z CSV ---
async function nactiVystavy() {
    try {
        const odpoved = await fetch('data/expozice.csv');
        const text = await odpoved.text();
        const radky = text.split('\n').slice(1); // Přeskočíme první řádek (hlavičku) [cite: 17]

        const kontejner = document.getElementById('expozice-grid');
        
        radky.forEach(radek => {
            const sloupce = radek.split(',');
            if (sloupce.length >= 4) {
                const [nazev, popis, kategorie, obrazek] = sloupce;
                kontejner.innerHTML += `
                    <div class="card">
                        <img src="${obrazek.trim()}" alt="${nazev}">
                        <div style="padding: 15px;">
                            <h3 style="color: var(--accent-gold);">${nazev}</h3>
                            <p><strong>${kategorie}</strong></p>
                            <p>${popis}</p>
                        </div>
                    </div>`;
            }
        });
    } catch (chyba) {
        console.error("Nepodařilo se načíst data z CSV.");
    }
}

nactiVystavy();