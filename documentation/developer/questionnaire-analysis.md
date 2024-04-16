# Käyttäjäkyselyn analyysi

### Johdanto

Sovelluksesta toteutettiin käyttäjäkysely 7.-14. 4. 2024. Kyselyyn vastasi 76 käyttäjää, jotka kokeilivat sovellusta ja sen jälkeen vastasivat kaksiosaiseen kyselyyn. Kysely jaettiin Helsingin Yliopiston matemaattis-luonnontieteellisen tiedekunnan ja Satakuntalaisen Osakunnan sähköpostilistoille, sekä erinäisiin opiskelijayhteisöjen Telegram-ryhmiin.

Kyselyn ensimäisessä osassa käyttäjät vastasivat [System Usability Scale](https://en.wikipedia.org/wiki/System_usability_scale) -kyselyyn \(SUS-kysely\). Kymmenenosaisessa monivalintakyselyssä mitataan järjestelmän käytettävyyttä. Tulokset monivalintakyselystä olivat suurelta osin positiivisia, suurin osa käyttäjistä koki sovelluksen käytön vaivattomaksi, ja noin kolmasosa vastasi, että käyttäisivät sovellusta mielellään arjessaan. Kyselyn toisessa osassa käyttäjät saivat omin sanoin kertoa sovelluksen puutteista. Vapaan kentän osio tuotti paljon parannusehdotuksia, sekä käyttäjien huomaamia virheitä.

### SUS-kyselyn tulokset

|                                                                                                         |  0 |  1 |  2 |  3 |  4 |
|--------------------------------------------------------------------------------------------------------:|----|----|----|----|----|
|                                               Luulen, että käyttäisin tätä sovellusta mielelläni usein. |  5 | 20 | 22 | 20 |  9 |
|                                                     Koin sovelluksen olevan tarpeettoman monimutkainen. | 24 | 30 | 10 |  8 |  4 |
|                                                                 Pidin sovelluksen käyttämistä helppona. |  0 | 10 | 10 | 30 | 26 |
|                                       Luulen, että tarvitsisin teknistä tukea sovelluksen käyttämiseen. | 56 | 14 |  1 |  3 |  2 |
|                                        Mielestäni sovelluksen eri osat istuivat keskenään hyvin yhteen. |  3 | 10 | 23 | 32 |  8 |
|                                  Mielestäni sovelluksessa oli liian paljon eri tavoin toimivia asioita. | 34 | 26 |  6 |  8 |  2 |
|                                   Luulen, että useimmat oppisivat sovelluksen käytön erittäin nopeasti. |  1 |  1 |  7 | 20 | 47 |
| Mielestäni sovelluksen käyttö oli erittäin mutkikasta (= ei ollut helppo arvata, miten sovellus toimi). | 41 | 21 |  5 |  6 |  3 |
|                                                    Tunsin itseni hyvin varmaksi, kun käytin sovellusta. |  5 |  9 | 11 | 30 | 21 |
|                          Minun piti opetella paljon asioita, ennen kuin sovelluksen käyttö alkoi sujua. | 48 | 15 |  9 |  4 |  0 |

### Tulosten laskettu arvo
Kaikki käyttäjät: $\Large\frac{28.1}{40} \\approx  70	\\%$

Puhelin käyttäjät: $\Large\frac{27.6}{40} \\approx 69 \\%$ 

Tietokone käyttäjät: $\Large\frac{28.2}{40} \\approx 71	\\%$ 

Puhelin ja tietokone käyttäjien kokemusten ero: $1.5 \\%$


Suuntaa antava arvostelu tapa:
|huono|ok|hyvä|erinomainen|paras|
|-------|-----|---|----|-----|
|0-60|60-70|70-80|80-90|90-100|


### SUS-kyselyn päätelmät

 - Kolmasosa vastaajista käyttäisi sovellusta mielellään, kolmasosa ei.
 - Sovellus on helppokäyttöinen.
 - Sovelluksen osat ovat yhteneväisiä ja toimivat samalla tavalla.
 - Sovelluksen käytön oppiminen on helppoa ja nopeaa.
 - Käyttäjät tuntevat itsensä varmaksi sovellusta käyttäessään.

### Vapaan kentän kysymykset

Kyselyn 76 vastaajasta 48 vastasi kysymykseen "Näkyikö sovelluksessa mielestäsi relevantit kurssit? Puuttuiko jotain?" 54 vastaajaa vastasi kysymykseen "Mitä kaipaisit, jotta sovellus olisi sinulle parempi?"

### Kärkipoiminnat vapaan kentän vastauksista

 - Matematiikan kandiohjelman kaaviota ei koeta erityisen hyödylliseksi ilman valinnaisia kursseja ja niiden esitietoja.
 - Usea vastaaja on sitä mieltä, että kurssilaatikoiden tulisi olla lähempänä toisiaan, ja tekstin suuremman kokoista.
 - Joidenkin vastaajien mielestä kurssilaatikoiden siirtelymahdollisuus ei tuo sovellukselle lisäarvoa.
 - Ohjelmasta puuttuva mahdollisuus palata alkunäkymään muuten kuin sivun päivittämällä koettiin harmilliseksi.
 - Monen vastaajan mielestä maisterikurssien puute heikentää sovelluksen käytettävyyttä huomattavasti.
 - Muutaman vastaajan mielestä kurssien suoritusjärjestys tulisi näyttää eri tavalla, eikä alhaalta ylöspäin kuten nykyisessä versiossa.
 - Huolimatta SUS-kyselyn positiivisesta palautteesta helppokäyttöisyyden suhteen, näkyy vapaan kentän vastauksissa tarve käyttöohjeelle, sekä selitteelle käytetyistä väreistä.
 - Graafiseen ilmeeseen toivotaan parannusta. Yksi vastaaja toivoi ilmeen yhtenäistämistä Helsingin Yliopiston graafisen ilmeen kanssa.
 - Testikäyttäjät löysivät useita virheitä ohjelmasta. Osan näistä kehittäjätiimi oli jo aiemmin huomannut, osa oli uutta tietoa.

 ### Tilastoja vastaajista

  - Hieman alle puolet käyttivät sovellusta läppärillä, hieman yli neljäsosa pöytäkoneella, hieman alle neljäsosa puhelimella.
  - Puolet vastaajista opisklevat tietojenkäsittelytieteen kandiohjelmassa, 15% matemaattisten tieteiden kandiohjelmassa.
  - Vastauksia tuli lähes jokaisesta Kumpulan kandiohjelmasta, monesta Kumpulan maisteriohjelmasta, parista muiden tiedekuntien ohjelmasta, sekä muutamalta valmistuneelta.

### Erinäisiä muutosehdotuksia vapaan kentän vastauksista

 - Tutkinto-ohjelman tai kurssin valinnan latauspalkin poistaminen.
 - Kurssin paikan mallilukujärjestyksessä lisääminen.
 - Vaihtuva tausta valitun kurssin tai tutkinnon mukaan.
 - Valitun kurssin esitietopolun korostaminen.
 - Inertial scrolling:n lisääminen.
 - Tiedon esittäminen muodossa, joka vaatii vähemmän siirtymistä vaakatasossa.
 - Kurssitietoihin studies-linkin lisääminen.
 - Yksinkertainen listaus kursseista jonnekin (ei välttämättä tähän sovellukseen).
