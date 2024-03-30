# Sprint 4
## Agenda:
## User Storyt
### Done:
**Ulkoasu**
- Voisi olla tältä sprintiltä done, ulkoasuun voi palailla taas myöhemmin jos tarvetta.

### In progress:
**Hy kirjautuminen** (Pooki ja Andrei)
- Ei testattu
- Matin ehdotus: Kirjautuminen vaaditaan aina

**Tutkinnon Rakenne, tietokanta ja esitietojen näyttäminen** (Timo, Jani ja Pooki)
- Hylättiin tutkintorakenne rajapinnan kautta ja rakennettiin tietokantaan ominaisuudet tälle sen sijaan
Lisättiin githubin kautta tapahtuva tutkinnon lisäämistoiminnallisuus tukemaan tätä


**Refaktorointi** (Andrei, Jani ja Pooki)
- Ohjelma yhdistetty yhdeksi node moduuliksi
- Frontend tukee useamman sivun käyttöä

**Ulkoasu** (Alisa, Lassi)
- Hakukenttä kursseille
- Edit nappulla josta saa editointi palkkinäkymän
- Editointi ikkuna promptin sijasta

### Sprint backlog:
**Esitietojen kommentointi**

## Demo
- Uusi tutkinnon graafinen näkymä
- Uusi käyttöliittymä
- Nappuloiden lokerointi
- Info nappula
- Kirjautuminen
- Tutkintorakenteen lisääminen jsonin kautta
- Backend logiparannukset (voi klikata vaikka kurssia esim ohjelmistotuotanto ja/tai yrittää accessaa väärää urlia niin näkyy backendin logit paremmin kun ennen)
  - Avaa sivu
  - Klikkaa jotain niistä meidän kovakoodatuista kursseista joku toimii (esim. ohjelmistotuotanto)
  - Näytä backend konsoli -> pitäis näkyä sinisellä debugviestit
  - Mene urliin /api/asdasdasdsadsad
  - Näytä backend konsoli -> pitäs näkyä keltasella että väärä route
  - Nämä on säädettävissä .envin kautta, että mitä näytetään, jotta voi esim estää ettei openshiftiin valu kuin tärkeimmät tms.
- (OPTIONAL) github readme ohjeet projektin setuppaamiselle tai mitä muuta voi haluta

## Seuraavalle sprintille:
### Ehdotamme:
- Siirrämme keskeneräiset User Storyt seuraavalle sprintille
- kurssien haun parannus [#102](https://github.com/orgs/Kurssiesitieto/projects/2/views/3?pane=issue&itemId=56575912)
- ohjelmalta popuppina tärkeät viestit käyttäjälle [#104](https://github.com/orgs/Kurssiesitieto/projects/2/views/3?pane=issue&itemId=56786492)
- Käyttäjäkokemus kysely [#109](https://github.com/orgs/Kurssiesitieto/projects/2/views/3?pane=issue&itemId=57048552)


## Seuraava tapaaminen:
Ehdotetaan seuraavaksi tapaamiseksi 3.4. 14.15

## Asiakastapaaminen:
- Asiakas haluaa, että keskitymmä ominaisuuksien toteuttamiseen ja jätämme ulkoasun myöhemmälle.
- Shibboleth vaatii kaksi eri sivua (kirjautunut/ei kirjautunut), toistaiseksi vain kirjautumisen kautta sovellus toimii. Asiakas haluaa että päästään sovellukseen kirjautumatta.
- Kori:n käytön sijasta kurssit haetaan manuaalisesti ja lisätään tietokantaan.
- Bugeja on jonkin verran, kurssit joilla ei esitietoa ei näy, jotkut riippuvuudet eivät ilmesty
- Asiakas haluaa että lisätään virheilmoitukset jos jokin toiminto ei toimi
- Asiakas haluaisi että kurssin lisäys/poisto haussa käytettäisiin yhtä hakukenttää joka antaisi ehdotuksia
- Päätettiin ottaa aiemmat keskeneräiset storyt seuraavaan sprinttiin

## Retro:
### Mad
- Pullaria ei käyty läpi ajoissa
- Sisu
- Priorisoinnin puute taskeilla 


### Sad
- Ulkoasu apu jää myöhemmälle
- Putki on rikki
- Shibboleth säätö
- Yhteinen visio on joissain kohtaa puuttunut
- Teemat epäkonsistentteja
- CourseGraph:issä muita komponentteja joita pitäisi erotella
- Suuret muutokset lisättiin lopussa
- Testit puuttuu

### Glad
- Aktiiviset dailyt ja hyvä kommunikaatio
- Graafisen puolen oppiminen
- Tietokantaa käytetään
- Säännölliset lounaat
- Etä parikoodaus on hyvä
- Discord commits on hyvä
- Projektia on edistetty
- JavaScript alkaa olla tutumpi
- Mid sprint meet toimi

## Sprint Planning
- Taskien priorisointi käyttöön
### User Storyt
- Sovellukseen pääsee käsiksi ilman kirjautumista
- Käyttäjäpalaute
- Koodin laatu (refaktorointi)
- Riippuvuuksien kommentointi
- Tärkeät viestit poppuppina
- Kursseja haetaan nimellä tai kurssikoodeilla
- Debuggaus
