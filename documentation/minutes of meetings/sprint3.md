# Sprint 3
## Agenda:
#### Puheenjohtaja: Alisa
#### Demooja: Alisa
#### Kirjuri: Lassi

### Suoritetut User Storyt:
- **Sovellus toimii netissä, sovellus stagingiin**

- **Käyttäjänä haluan nähdä kurssin kuvauksen klikkaamalla kurssia**
Demo kurssien klikkaamisesta. Ominaisuuden toteuttaja voi kertoa enemmän siitä mitä/miten tietoa löytyy kuvaukseen.
	- Saadaan korista html muotoista dataa mikä parsitaan parsitaan normaali tekstiksi. 
 Yritettiin ensin käyttää html muotoisena, mutta siitä ei tullut hyvän näköistä. Alkuperäisestä ajatuksesta poiketen tehtiin popup ikkuna kuvaukselle, eikä jätetty sitä sivupalkkiin, koska siitä tuli liian ahdas.

	(kandi kurssi ja muutama muu mysteerinen kurssi ei toimi tällä hetkellä.)

- **Käyttäjänä haluan hakea kurssin ja nähdä sen esitiedot kaaviona**

	 Demo esitietojen muuttamisesta. 
	- Tämä toimii siis Kori avaimella, ja se ikkuna on prompt ikkuna joka katoaa jos klikkailet muita kursseja aukit tjms, joten kannattaa olla valmiina pari tunnaria siten, että saat ne käyttöön (poistetaan tämä teksti ennen asiakastapaamista)

### Keskeneräiset User Storyt:
- **Käyttäjänä haluan valita tutkinnon ja nähdä sen kurssit ja esitietovaatimukset**
Ominaisuus on muuten valmis, mutta helsinki.fi API:n JSON:nin prosessointi ei ole vielä täydellinen. On hieman epäselvää kuinka laajasta tutkinnon kurssit halutaan tallentaa ja esittää kaaviossa, vaikka sillä ei olisi yhtäkään esitietoa. Valinnaiset kurssit jne.

	Haasteita syntyy mikäli halutaan apista saatujen rakenteiden perusteella automaattisesti luoda lista kursseista joita tutkintoon kuuluu. Esim yksi ongelmista on se, että mikäli sisällämme “vaihtoehtoisia” kursseja tutkintorakenteeseen tulisi niitä iso liuta mukana. Mikäli taas emme, niin moni käytännössä pakolliset jäävät pimentoon (esim tietojenkäsittely ja yhteiskunta, jossa vaihtoehdot on koko 5 op tai 2 + 3 op moduulit)

	Ehdotankin, että ennemmin naputellaan manuaalisesti kurssit tutkintoon, sillä tämän automatisointi veisi turhan paljon aikaa joka on pois kaikesta muusta toiminnallisuudesta. Toiminnallisuudet muutenkin on käytännössä lähes valmiit, eikä tarvitsisi kuin käytännössä copy pastee CRUD-toiminnot tutkinnoille + muutamat napit fronttiin.

- **Käyttäjänä haluan arvion kurssin seuraavasta suoritusajasta kurssin edellisten suoritusaikojen perusteella, jos seuraavan toteutus kerran aikataulu ei ole tiedossa.**
Tällä hetkellä kurssin aikataulu tulee näkyviin, jos se löytyy suoraan. Muuten user storya ei ole vielä toteutettu

- **Käyttäjänä haluan kommentoida kurssien välisiä riippuvuuksia, jotta muut käyttäjät saavat paremman kuvan riippuvuuksista**
Tästä storystä on tehty vain tietokannan rakenne. Se tuli samalla kun päiviteltiin tietokantaa muutenkin.


- **Käyttäjänä haluan kirjautua HY:n tunnuksilla palveluun, siksi että ohjelma löytää minun suorittamani kurssit ja ottaa ne huomioon näkymässä**

	Tämä Story on laitettu odottamaan. Odottaa ORI API oikeuksia. HY Login implementoiminen pitäisi olla aika pieni muutos sovellukseemme, koska kotiympäristöön on implementoitu Shibboleth. Sitä ei ole kuitenkaan implementoitu, koska on priorisoitu muita storyja.


### Seuraavan sprintin User Storyt:
- Ehdotettaan storyjä:
	- Käyttäjänä haluan valita tutkinnon ja nähdä sen kurssit ja esitietovaatimukset siirtämistä seuraavalle sprintille. 
		- Melkein valmis.
	- Käyttäjänä haluan kommentoida kurssien välisiä riippuvuuksia story siirretään seuraavalle sprintille
		- Tätä ei oltu ehditty juurikaan aloittaa tällä sprintillä
		- Tähän liittyen huomautus, että meillä ei ole kirjautumista vielä, eikä kirjautumista ole liitetty tähän storyyn. Tarvitaan myöhemmin story, jossa rajoitetaan kommentointi kirjautuneisiin käyttäjiin, jotta voidaan rajoittaa kommentointia esim yhteen kommentiin / kurssi / käyttäjä.
	- Ehdotetaan, että pilkotaan oleamssa oleva story, “Käyttäjänä haluan kirjautua HY:n tunnuksilla palveluun, siksi että ohjelma löytää minun suorittamani kurssit ja ottaa ne huomioon näkymässä” kahteen erilliseen storyyn, koska ei ole varmaa saadaanko me oikeuksia opiskelijoiden tietojen saamiseen sisusta edes kirjautumisen kautta. 
		- Olemassa storyt valmiina, mikäli käy. Hy login story on ehdotuksena seuraavalle sprintille
	- Ehdotetaan storya, missä keskitytään koodin laadun parantamiseen ja testien lisäämiseen.
	- Ehdotetaan storya, missä parannetaan sovelluksen ulkoasua ja varmistetaan, että näyttää järkevältä eri selain teemoilla.

### Tulevista asiakastapaamisista sopiminen
- Ehdotetaan, että jatkossa pidetään asiakaspalaverit aina keskiviikkoisin klo 14.00 ellei muuta erkikseen sovita. Ehdotetaan tuleviksi asiakastapaamisiksi seuraavia päiviä.
	- 20.3. (ylimääräinen viikko tenttiviikon takia)
	- 3.4. (pääsiäinen välissä. Ehkä pienempi työmäärä tälle sprintille siitä johtuen)
	- 17.4. 
	- 1.5. (loppudemo tällä viikolla) Huom. Vappu

## Asiakastapaaminen:
1. Demo

	- Ohjelma toimii OpenShiftissä
	- Kurssit kovakoodattu
	- Sisusta kurssin ajankohta, noppamäärä, kuvaus
	- Tutkinto-ohjelmakuvauksessa kurssit sisusta, ei riippuvuuksia
	- Kurssihaku näyttää esitiedot haetulle kurssille
	- Kurssin kuvaus siirretty sivupalkista omaan teksti-ikkunaan
	- Kurssin kuvauksessa olisi mielekästä näyttää lyhytmuotoinen kuvaus (esimerkkinä TiKaPe), tällä hetkellä osaamistavoitteet

2. Suoritetut
	- US OpenShift: saatu tehtyä, staging juttelee HY-klus DB kanssa
		front back db stagingissä, db ei täysin populoitu
	- US Kuvauksen näyttö: saatu tehtyä, kuvaukset tulee sisusta
	- US Kurssihaku: saatu tehtyä
		Tulevaisuudessa hakuun tarkoitus saada mm. kurssin nimen kautta haku, atm
vain KORI-koodi
Hakua voi muutenkin miettiä, JS-prompt ei kovin ammattimainen
3. Keskeneräiset
	- US Tutkinnon valinta, kurssit ja esitiedot: osittain tehty
Näyttää listan kursseista ilman riippuvuuksia
Samankaltainen kurssihaun kanssa, joten luultavasti lähellä toteutumista
Näyttävä tekniikka jo olemassa, selvästi lähellä ollaan
Esitietojen löytämistä varten
	- US Suoritusaika: näyttää jotain mutta ei selvästi
Suoritusaika näkyy todella huonosti
Kurssipalautesovelluksesta saattaa saada mallia suoritusaikojen repimiseen
Näyttää opettajalle kurssi-instanssin ja päivät hyvin
Linkki discordissa
	- US Riippuvuuksien kommentointi: Ei aloitettu
	- US HY-tunnukset ja omien suoritusten haku: Ei aloitettu, Luukkainen hakenut ORI-API oikeuksia, ei voida edistää ennen oikeuksien saantia
Hirveät tietoturvapaineet
Ajatus pilkkomisesta HY-tunnus -storyyn ja opiskelijarekisteristoryyn
Sopii asiakkaalle
HY-kirjautuminen ilmeisesti kevyt, ei varmaa tietoa
Shibboleth hyvä koska konffattu studyssä
4. Tulevat
	- US: HY-login
Ehdotus ottaa sprintille, asiakkaalle käy
	- US: Arvio suoritusajasta
		Ehdotus palauttaa product backlogille, asiakkaalle käy
	- US: Ulkoasun parantaminen
Ehdotus ottaa sprintille, asiakkaalle käy
dark/light mode, yms selainteemat
	- US: Tekninen velka
Ehdotus ottaa sprintille, asiakkaalle käy
	- Asiakkaan kommentit
Hyvä ettei oteta liikaa
	- Tiimin kommentit
Atm liian vähän testejä, lähinnä yksikkötestausta
5. Seuraavat tapaamiset
	- Ehdotus sopia loput tapaamiset 20.3., 3.4., 17.4., 1.5.
		Asiakas ei voi sitoutua ehdotettuihin päiviin tässä kohtaa
		Vappu tapaamispäivänä tuskin käy kellekkään
		20.3. käy
6. Muuta asiaa?
	- Välidemo perjantaina
Asiakas tulee jos aikataulu sopii
Discordiin vielä tarkempaa infoa
Demo videoidaan myös
	- Hyvältä näyttää, hyvä että pystyy netissä leikkimään

## Retro:
### Mad
- Sisu ja kipeänä olo vituttaa

### Sad
- Vähäinen osallistuminen
- Työn priorisointi mm. tietokannat
- OpenShift<->DB -meiningeissä selviteltävää
- Projectsin käyttö hakusessa
	- Enempi parempi, mm. dailyn asioita olisi hyvä laittaa myös projectsiin
- Koodin ulkopuoliset asiat ei aktivoi ihmisiä
	- Loppusprintin tapaaminen sprintin loppua varten asiakastapaamisen suunnittelua
varten
- Jäädään jumiin taskeihin eikä mietitä kokonaiskuvaa
- Kannattaa aina kysyä eikä yksin kärsiä
- Ohjelman omalla koneella pyöritys
  - Mahd. hyvät ohjeet readme
- Testejä ja koodin laatua tarvitaan lisää
	- Testien kirjoitus muiden koodille?

### Glad
- Discord jee jee
	- Kanavajako hyvä
- JS:ään päästy kiinni
- Enemmän aikaa käytettävän kurssiin kuin aiemmin
- Apua saa hyvin ohjelman ei-tuttuihin osiin
- Dailyt toimii paremmin, enemmän porukkaa paikalla
- Timon ehdotus tapaamisaikataulutuksesta hyvä
- Pysyy kärryillä vaikka on poissa, koska discord jee jee
- Ohjeistukset ja dokumentointi parantunut (erit. readme)

### Hannah
- Hyvin huomioitu viime asiakastapaaminen ja retron palaute, asiakastapaamisen valmistautuminen parantunut
- Kaikki asiat käytiin
- Vertaispalaute on auki, info tulee discordiin, on pakollinen, monta kenttää, menee aikaa
- Myös itsearviointi
- Puurakenteen valmistumisen jälkeen käyttäjäkokemuskyselyn tekeminen

	-> Käyttökokemuskyselyn pohjalta projektin läpikäyntiä
- Asiakastapaamisessa voi miettiä kuinka paljon selittää tekniikkaa, ei tarvi avata täysillä. Jos selittää niin varmistaa että ymmärtää termistön.
