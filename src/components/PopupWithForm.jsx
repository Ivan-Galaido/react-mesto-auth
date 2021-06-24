function PopupWithForm({
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
}) {
  const classNamesPopup = [
    'popup',
    `popup_type_${name}`,
    isOpen ? 'popup_opened' : ''
  ].join(' ').trim();
  
  return (
    <article
      className={classNamesPopup}
      onMouseDown={onOverlayClose}
    >
      <div className="popup__container">
        <button
          className="button button_close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <form className="form" name={`${name}Form`} onSubmit={onSubmit}>
          <h2 className="form__heading">{title}</h2>

          {children}

          <button
            className="form__submit-btn"
            type="submit"
          >
            {isLoading ? loadingText : buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
