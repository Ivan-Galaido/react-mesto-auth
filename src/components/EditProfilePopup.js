import { useContext, useState, useEffect, useRef } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { handleValidity, resetValidation } from "../utils/form-validation";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onOverlayClose}) {
  const { name, about } = useContext(CurrentUserContext);
  const [inputsValue, setInputsValue] = useState({});
  const [isValid, setValid] = useState(false);
  const formRef = useRef();

  const handleInputChange = (evt) => {
    const name = evt.target.name;
    setInputsValue({
      ...inputsValue,
      [name]: evt.target.value,
    });
    
    handleValidity(formRef.current, setValid);
  };

  useEffect(() => {
    setInputsValue({
      ...inputsValue,
      name: name,
      about: about
    });
    resetValidation(formRef.current, setValid);
  }, [name, about, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(inputsValue);
  };

  return (
    <PopupWithForm
      reference={formRef}
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Сохранение..."
      buttonText="Сохранить"
      isValid={isValid}
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
          value={inputsValue["name"] || ""}
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
          value={inputsValue["about"] || ""}
          required
        />
        <span className="form__error subheading-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
