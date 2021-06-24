import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onOverlayClose }) {
  const { name, about } = useContext(CurrentUserContext);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  useEffect(() => {
    setInputValues({
      ...inputValues,
      name: name,
      about: about
    });
  }, [name, about, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(inputValues);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Сохранение..."
      buttonText="Сохранить"
    >
      <fieldset className="form__input-container">
        <input
          className="form__input form__input_el_heading"
          id="heading-input"
          type="text"
          name="name"
          placeholder="Имя или псевдоним"
          minLength="2"
          maxLength="40"
          onChange={handleInputChange}
          value={inputValues['name'] || ''}
          required
        />
        <span className="form__error heading-input-error"></span>
        <input
          className="form__input form__input_el_subheading"
          id="subheading-input"
          type="text"
          name="about"
          placeholder="Род занятий"
          minLength="2"
          maxLength="200"
          onChange={handleInputChange}
          value={inputValues['about'] || ''}
          required
        />
        <span className="form__error subheading-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
