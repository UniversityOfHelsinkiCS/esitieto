import React from 'react';
import '../styles/InfoBox.css'

export function InfoBox({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }    
    return (
        <div className="info-window">
            <h2>Kurssin esitietojen visualisointityökalu</h2>
            <p>Käyttäjäopas löytyy <a href="https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/documentation/user-guide.md">täältä</a></p>
            <p>Tämä sovellus näyttää tarvittavat kurssiesitiedot tietyille tutkinto-ohjelmille Helsingin yliopistossa.</p>
            <p>Tällä hetkellä saatavilla on esimerkkiversio tietojenkäsittelytieteen kandidaattiohjelmasta.</p>
            <p> </p>
            <p>Tämä sovellus on luotu Ohjelmistotuotanto-kurssin projektitöönä Helsingin yliopistolle.</p>
            <p>Lähdekoodi löytyy <a href="https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti">täältä</a></p>
            <button onClick={onClose}>Sulje</button>
        </div>
    )
}
