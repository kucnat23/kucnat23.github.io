let jmeno = "";
let scena = "start";

function aktualizuj(text, imgHTML, b1, b2, b3 = "") {
    document.getElementById("story-text").innerHTML = text;
    document.getElementById("image-box").innerHTML = imgHTML;
    document.getElementById("btn1").innerText = b1;
    document.getElementById("btn2").innerText = b2;
    
    if (b3 !== "") {
        document.getElementById("btn3").style.display = "inline-block";
        document.getElementById("btn3").innerText = b3;
    } else {
        document.getElementById("btn3").style.display = "none";
    }
}

function startHry() {
    let vstup = prompt("Jak se jmenuje tvoje postava?");
    if (vstup == "" || vstup == null) {
        jmeno = "Hráčka.";
    } else {
        jmeno = vstup + ".";
    }

    document.getElementById("start-btn").style.display = "none";
    document.getElementById("choices").style.display = "block";
    
    scena = "letiste";
    aktualizuj(jmeno + " Právě jsi v Paříži. Kam se vydáš?", "<img src='img/letiste.jpg'>", "Na hotel", "Do kavárny", "Na casting");
}

function volba(cislo) {
    switch (scena) {
        case "letiste":
            if (cislo == 1) {
                scena = "hotel";
                aktualizuj("V hotelu potkáš návrháře! Co uděláš?", "<img src='img/hotel.jpg'>", "Oslovit ho", "Ignorovat ho");
            } else if (cislo == 2) {
                scena = "kavarna";
                aktualizuj("V kavárně ses polila kávou! Co teď?", "<img src='img/kavarna.jpg'>", "Koupit si šátek", "Utéct pryč");
            } else if (cislo == 3) {
                scena = "casting";
                aktualizuj("Na castingu je obří fronta. Jak na sebe upozorníš?", "<img src='img/casting.jpg'>", "Předběhnout", "Poctivě čekat");
            }
            break;

        case "hotel":
            if (cislo == 1) {
                scena = "navrhar_party";
                aktualizuj("Návrhář tě pozval na párty! Půjdeš?", "<img src='img/party.jpg'>", "Ano, jdu!", "Ne, radši spát");
            } else {
                konec("Zůstala jsi v ústraní a nikdo si tě nevšiml.");
            }
            break;

        case "navrhar_party":
            if (cislo == 1) konec("Stala ses hvězdou párty a novou tváří značky!");
            else konec("Propásla jsi šanci století.");
            break;

        case "kavarna":
            if (cislo == 1) {
                scena = "foceni";
                aktualizuj("Šátek vypadá skvěle a fotograf tě chce fotit!", "<img src='img/foceni.jpg'>", "Souhlasit", "Odmítnout");
            } else {
                konec("Tvůj trapas s kávou skončil jako ostuda.");
            }
            break;

        case "foceni":
            if (cislo == 1) konec("Tvoje fotka je na obálce časopisu!");
            else konec("Zůstala jsi jen holkou od vedle.");
            break;

        case "casting":
            if (cislo == 1) {
                scena = "porota";
                aktualizuj("Předběhla jsi! Co předvedeš?", "<img src='img/porota.jpg'>", "Catwalk", "Úsměv");
            } else {
                scena = "unava";
                aktualizuj("Po 4 hodinách jsi na řadě. Co teď?", "<img src='img/unava.jpeg'>", "Zkusit to", "Vzdat to");
            }
            break;

        case "porota":
        case "unava":
            if (cislo == 1) konec("Vybrali tě! Jsi nová topmodelka.");
            else konec("Bohužel, castingem jsi neprošla.");
            break;
    }
}

function konec(vysledek) {
    document.getElementById("choices").style.display = "none";
    document.getElementById("image-box").innerHTML = "<img src='img/konec.jpeg'>";
    document.getElementById("story-text").innerHTML = jmeno + " " + vysledek;
}