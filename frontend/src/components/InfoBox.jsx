import React from 'react';
import '../styles/InfoBox.css'

export function InfoBox({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }    
    return (
        <div className="info-window">
            <h2>Course prerequisite visualization tool</h2>
            <p>This application shows the necessary course prerequsities for certain degree programs in the University of Helsinki.</p>
            <p>Currently available is a sample version of the Computer Science bachelor's degree program.</p>
            <p> </p>
            <p>This application is being created as a project for the course Ohjelmistotuotanto for the University of Helsinki</p>
            <p>Source code can be found <a href="https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti">here</a> </p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
