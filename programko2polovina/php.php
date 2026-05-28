<?php
// Cesta k souboru – vylezeme ze složky php (../) a jdeme do data
$csvFile = '../data/expozice.csv';

if (file_exists($csvFile)) {
    if (($handle = fopen($csvFile, "r")) !== FALSE) {
        // Přeskočíme první řádek (hlavičku)
        fgetcsv($handle, 1000, ",");

        // Čteme řádek po řádku
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $nazev = htmlspecialchars($data[0]);
            $popis = htmlspecialchars($data[1]);
            $kategorie = htmlspecialchars($data[2]);
            $obrazek = htmlspecialchars($data[3]);

            // Vypíšeme kartu
            echo "
            <div class='card'>
                <div class='card-img-box'>
                    <img src='$obrazek' alt='$nazev'>
                </div>
                <div class='card-title-box'>
                    <h3>$nazev</h3>
                </div>
                <p class='category-text'>Kategorie: $kategorie</p>
                <div class='card-desc-box'>
                    <p>$popis</p>
                </div>
            </div>";
        }
        fclose($handle);
    }
} else {
    echo "<p style='color: white;'>Data nebyla nalezena (data/expozice.csv chybí).</p>";
}
?>