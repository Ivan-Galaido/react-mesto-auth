function PopupWithForm({
  reference,
  title,
  name,
  children,
  isOpen,
  onClose,
  onOverlayClose,
  onSubmit,
  isLoading,
  loadingText,
  buttonText,
  isValid,
}) {
  
  return (
    <article
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClose}
    >
      <div className="popup__container">
        <button
          className="button button_close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <form className="form" name={`${name}Form`} onSubmit={onSubmit} ref={reference} noValidate>
          <h2 className="form__heading">{title}</h2>

          {children}

          <button
            className={`form__submit-btn ${!isValid ? "form__submit-btn_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            {isLoading ? loadingText : buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
