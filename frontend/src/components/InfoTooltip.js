import Popup from "./Popup";

function InfoTooltip ({isOpen, pic, text, onClose}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="tooltip popup__form">
        <img className="tooltip__pic" src={pic} alt={text}/>
        <p className="tooltip__text">
          {text}
        </p>
      </div>
    </Popup>
  )
}

export default InfoTooltip;
