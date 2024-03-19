import '../styles/InfoButton.css'

function InfoButton({ onClick }) {
  return (
    <button onClick={onClick} className='info-button'>
      i
    </button>
  );
}

export default InfoButton;