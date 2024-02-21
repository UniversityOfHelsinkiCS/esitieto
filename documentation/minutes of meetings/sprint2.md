# Sprint 2

## Agenda

### Sovellus demo
- Kurssin haku ja Pyramidisointi
- Korihaku (sekä mitä tietoja se sylkee ulos, näytän frontendin konsolissa)
- Studieshaku (Ei vielä integroitunu sovellukseen millään tasolla, mutta asiakasta saattaa kiinnostaa koska sen verran relevanttia tietoa, pookin linkki [https://od.helsinki.fi/eduviewer/tree_by_code/KH50_005?lv=hy-lv-74](https://od.helsinki.fi/eduviewer/tree_by_code/KH50_005?lv=hy-lv-74))
- (local) Tietokantatoiminnot, jossa näytän perus CRUD toiminnot bäkkärin ja db välissä käyttäen RESTiä
- Tutkintovalikko (joka tällä hetkellä ei muuta mitään kun valittu tutkinto)
- Kurssin klikkaus hakee joitain tietoja korista ja näyttää ne sivupaneelissa
- Openshiftin tila
- tietokannan tila
- Tutkinnot: [https://od.helsinki.fi/eduviewer/coded_educations](https://od.helsinki.fi/eduviewer/coded_educations)
- Tutkintorakenne: [https://od.helsinki.fi/eduviewer/tree_by_code/KH50_005?lv=hy-lv-74](https://od.helsinki.fi/eduviewer/tree_by_code/KH50_005?lv=hy-lv-74)

### Asiakastapaaminen
- Puheenjohtaja/Demo vetäjä: Jani, Kirjanpito: Andrei
- Demo
  - Näytetty ohjelman nykyinen tilanne.
  - Uusi haku toiminto näyttää yhden tietyn kurssin esitiedot
  - Uusi koriapi toiminto antaa käyttäjän etsiä sisun tietoja kurssin nimellä
  - Tällä hetkellä tiedot tulevat konsoliin
  - Näytetty myös sisun hakujen tiedon rakenne ja mitä tietoa API:N hausta saa.
  - Käyty läpi myös miten KORI apista saadaan tietoa tutkinnoista
  - Käyty läpi millaisia perus toimintoja ohjelman tietokannassa on.
  - Toimii REST:illä, tieto tulee JSON muodossa
  - Lisätty nappi joka antaa käyttäjän valita minkä tutkinnon ohjelma näyttää käyttäjälle.
  - Ei vielä tee mitään, mutta tarkoitus..
  - Frontend toimii openshiftissä, mutta backend ei vielä toiminnassa.
- Antin kysymyksiä.
  - Toivottavasti ohjelmasta saataisiin toimiva linkki, että ohjelmaa voisi kokeilla kunnolla itse.
  - Kysytty myös miten sisusta haetaan tutkinnon dataa.
  - Sisusta saadaan kurssien perustiedot ja helsinki.fi antaa tiedot paremmalla tavalla.
  - Esitiedot pitää laittaa kursseille käsin. Esitietoja ei saa automaattisesti
- Miten järjestetään tietokanta.
  - Postgres tietokanta ollaan tilattu HY:ltä ja se on saatu, mutta sitä ei olla vielä integroitu ohjelmaan.
- Openshift tilanne:
  - Openshiftin toiminnallisuuden kanssa on ollu haasteita, useista syistä kuten CI putken oikeellinen toiminta ja tiedostojen rakenteen haasteita.
  - Toivottavasti seuraavassa sprintissä saadaan myös backend toimimaan.
- Tietokannan autentikaatio:
  - Tällä hetkellä ohjelmassa on perus user, password autentikaatio, mutta syvällisempää tarkistusta ei olla tehty.
  - Luultavasti tullaan tekemään GitHub secrets

- Antin maininta
  - Koodi näyttää todella toisteiselta
  - Koodia ei ole vielä kiveen hakattu
  - Koodin rakennetta voitaisiin
  refaktoroida myöhemmin jos sille on aikaa.

#### User storyt
- Useat sprintin storyt ovat hyvin lähellä
- Projektsin rakenne on vähän sekava
- Kannattaisi lisätä jokin kuva mistä nähdä kaikki storyt

#### Ei suurempia mainintoja Demoon/Sprinttiin 1
#### Seuraavaan sprinttiin
- Käyttäjän kirjautuminen
- Perus toiminnallisuutta ei pitäisi piilottaa kirjautumisen taakse
- Kirjautuminen ainoastaan jos sitä tarvitaan.
- Käyttäjän tietoja voidaan hakea HY:n kirjautumisen avulla. HY:n tunnukset antavat autentikaation ORI apin toimintaa varten,
- Käyttäjä voi kommentoida verkon viivoja,
- Kurssin aiemmat toteutus ajat voidaan näyttää käyttäjälle ja niistä voitaisiin tehdä ennuste seuraavaan toteutukseen
- Kurssien tehty status voidaan merkitä ilman kirjautumista (Joss saadaan muut asiat tehtyä)
- User story:n prioriteetti näyttävät ihan hyvältä tässä vaiheessa.
- Jos tulee lisää ehdotuksia voidaan lisätä niitä listaan ja keskustella niistä Antin kanssa myöhemmin.
- Tuleeko meille tauko?
- Seuraava tapaaminen 28.02.2024 Ke, Klo. 14:00 - 16:00

## Retro
### Mad/Sad/Glad

#### Mad
- teknologioiden tuntemuksen puute itseltä kuluttaa paljon aikaa ja on välillä tosi turhauttavaa
- Dokumentaatio
- viest madge

#### Sad
- Oma työajan kohdennus projektiin ei ollut riittävä
- GitHubin storeja ja taskejä voitaisiin käyttää enemmän jotta eri työt ja niiden jako olisi selkeää
- Github actions on edelleen vähän sekava eikä ole vielä kunnollista coveragea
- Testejä tarvisi enemmän
- Taskien ja storyjen ylläpito
- Tapaamisajat voi olla vaikea sopia lennosta
- Hyvin vähän code review:ta

#### Glad
- Discordikommunikaatiot toiminu hyvin
- Olen saanut vertaistukea vaikka on ollut vaikea pyytää apua.
- Hybrid dailyt ollu ihan hyviä
- Daily scrumit on toiminut hyvin hybridinä. Ehkä voisi vielä hieman tiivistää sitä ytimekkäämämksi
- Kaikki olleet avoimia
- Projekti edistyy ihan hyvin
- Tää retrosysteemi anonymisoituna oli siisti
- Se, että asiakaspalaverissa moni on äänessä (eikä jää yhden tai kahden harteille)
- kaikki tulee kirjatuksi

### Kehityskohteet
- Projectsin ylläpito on vielä haussa.
- Taskien järkevä jako
- Taskien kommentointi toimivana tapana päivittää taskin tilannetta.
- Voitaisiin kaikki tehdä itse taskitusta
- Päätetään miten tehdään testit, Vitest/jest
- Tarvitaan enemmän testejä
- Miten tehdään enemmän codre review:ta
- Miten voitaisiin hyödyntää pullareita
- Tehdäänkö uusia brancheja ja niihin pullareita
- Readme ajantasalle
- Pieni pläräys ohjelman tarkoituksesta
- Definition of Done
- Käyttö ohjeet
- GitHub actions vielä työn alla.
- Perus pohja on vielä hyvin sekava
- Testauksen action pitää tehdä myös coverage
- Daily voitaisiin tehdä ytimekkäämin siten että kaikki ollaan paikalla tasalta.
