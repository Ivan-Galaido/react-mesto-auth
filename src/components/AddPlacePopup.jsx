import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onOverlayClose }) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(inputValues);
  };

  useEffect(() => {
    setInputValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Сохранение..."
      buttonText="Создать"
    >
      <fieldset className="form__input-container">
        <input
          className="form__input form__input_el_image-caption"
          id="image-caption-input"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleInputChange}
          value={inputValues['name'] || ''}
          required
        />
        <span className="form__error image-caption-input-error"></span>
        <input
          className="form__input form__input_el_image-link"
          id="image-link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          onChange={handleInputChange}
          value={inputValues['link'] || ''}
          required
        />
        <span className="form__error image-link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
