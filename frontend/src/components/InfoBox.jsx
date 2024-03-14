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
            <button onClick={onClose}>Close</button>
        </div>
    )
};
