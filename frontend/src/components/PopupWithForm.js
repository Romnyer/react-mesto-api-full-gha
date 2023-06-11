import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  submitClass,
  valueText,
  children
  }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className={`popup__form popup__form_type_${name}`}
        name={`popup__form_type_${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <input
          className={`popup__submit-button${submitClass ? submitClass : ''}`}
          name="popup__submit-button"
          type="submit"
          value={valueText}
        />
      </form>
    </Popup>
  )
}

export default PopupWithForm;
