import errorPath from '../images/icon-error.svg';
import successPath from '../images/icon-success.svg';

function InfoTooltip({ name, isOpen, onOverlayClose, onClose, error }) {
  const imageSrc = error ? errorPath : successPath;
  const title = error
    ? 'Что-то пошло не так! Попробуйте ещё раз.'
    : 'Вы успешно зарегистрировались!';

  const classNamesPopup = [
    'popup',
    `popup_type_${name}`,
    isOpen ? 'popup_opened' : ''
  ].join(' ').trim();

  return (
    <article
      className={classNamesPopup}
      onMouseDown={onOverlayClose}
      aria-label="Информация о результате операции"
    >
      <div className="popup__container popup__container_type_info-tooltip">
        <button
          className="button button_close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__result-icon" src={imageSrc} alt="Ошибка!" />
        <p className="popup__heading">{title}</p>
      </div>
    </article>
  );
}

export default InfoTooltip;
