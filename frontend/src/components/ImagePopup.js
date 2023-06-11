import Popup from "./Popup";

function ImagePopup({card, isOpen, onClose}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <img className="popup__pic-large" src={card.link} alt={card.name}/>
      <h2 className="popup__pic-title">{card.name}</h2>
    </Popup>
  );
}

export default ImagePopup;
