import React from 'react';
import '../styles/CourseDescription.css';

function CourseDescription({ isOpen, onClose, content }) {
    if (!isOpen) return null;

    const handleBackdropClick = () => {
        onClose();
    };

    const handleContentClick = (event) => {
        event.stopPropagation(); // Prevent click from propagating to the backdrop
    };

    return (
        <div className="infoscreen-backdrop" onClick={handleBackdropClick}>
            <div className="infoscreen-content" onClick={handleContentClick}>
                <div>{content}</div>
            </div>
        </div>
    );
}

export default CourseDescription;
