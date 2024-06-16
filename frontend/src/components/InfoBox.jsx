import React from 'react';
import '../styles/InfoBox.css';
import { useNavigate } from 'react-router-dom';

const InfoBox = ({ isOpen, onClose, baseURL }) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    let password = prompt("Anna salasana:");
    if (password === "guaqamole on parempi") {
      if (baseURL === '/') {
        navigate('/secret');
      } else {
        navigate(baseURL + '/secret');
      }
    } else {
      alert("Väärä salasana");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="info-window">
      <h2>Kurssin esitietojen visualisointityökalu</h2>
      <p>Käyttäjäopas löytyy <a href="https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/documentation/user-guide.md">täältä</a></p>
      <p>Käyttäjäoppaasta <a href="https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/documentation/user-guide.md">löytyy</a> ohjeet uuden tutkinnon lisäämiseen</p>
      <p>Tämä sovellus näyttää tarvittavat kurssiesitiedot tietyille tutkinto-ohjelmille Helsingin yliopistossa.</p>
      <p></p>
      <p>Tämä sovellus on luotu Ohjelmistotuotanto-kurssin projektityönä Helsingin yliopistolle.</p>
      <p>Lähdekoodi löytyy <a href="https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti">täältä</a></p>
      <button onClick={onNavigate} className= 'dev-portal-button'>Dev portaali</button>
      <button onClick={onClose} className='closing-button'>Sulje</button>
    </div>
  );
};

export default InfoBox;