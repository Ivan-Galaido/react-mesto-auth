import { useEffect, useRef, useState } from "react";
import { handleValidity, resetValidation } from "../utils/form-validation";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onOverlayClose }) {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(inputsValue);
  };

  useEffect(() => {
    setInputsValue({});
    resetValidation(formRef.current, setValid);
  }, [isOpen]);

  return (
    <PopupWithForm
      reference={formRef}
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Сохранение..."
      buttonText="Создать"
      isValid={isValid}
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
          value={inputsValue["name"] || ""}
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
          value={inputsValue["link"] || ""}
          required
        />
        <span className="form__error image-link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
