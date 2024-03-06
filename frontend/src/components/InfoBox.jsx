import './InfoBox.css'
export function InfoBox({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }    
    return (
        <div className="info-window">
            <p>This is the info window.</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
};
