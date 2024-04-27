import React from 'react';
import '../styles/InfoBox.css'
import { useNavigate } from 'react-router-dom';

export function InfoBox({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }    
    // eslint-disable-next-line
    const navigate = useNavigate(); 

    const onNavigate = () => {
        let password = prompt("Anna salsasana:");
        if (password === "guaqamole on parempi") {
            if (import.meta.env.BASE_URL === '/') {
                navigate('/secret');
            } else {
                navigate(import.meta.env.BASE_URL+'/secret')
            }
        } else {
            alert("Väärä salasalsa");
        }
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
            <button onClick={onNavigate}>Dev portaali</button>
            <p><button onClick={onClose}>Sulje</button></p>

        </div>
    )
}
