import {useEffect, useRef} from "react";

function Popup({isOpen, onClose, children}) {
  const esc = 'Escape';
  const popup = useRef();

  function handleButtonClose() {
    onClose()
  };

  function handleCloseByOverlay(evt) {
    if (evt.target === popup.current) {
      onClose();
    }
  };

  //Close popup by Esc
  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === esc) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', closePopupByEsc);
    }

    return () => {
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }, [isOpen]);

  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleCloseByOverlay}
      ref={popup}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={handleButtonClose}
        />
        {children}
      </div>
    </div>
  )
}

export default Popup;
