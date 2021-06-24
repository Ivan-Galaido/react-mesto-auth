import { useEffect, useState, useRef } from "react";
import { handleValidity, resetValidation } from "../utils/form-validation";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onOverlayClose }) {
  const [isValid, setValid] = useState(false);
  const formRef = useRef();
  const inputRef = useRef();

  const handleChangeAvatar = (evt) => { 
      handleValidity(formRef.current, setValid); 
  }; 
  
  const handleSubmit = (evt) => { 
      evt.preventDefault(); 
      onUpdateAvatar({ 
        avatar: inputRef.current.value,
      }); 
  }; 
  
  useEffect(() => { 
      inputRef.current.value = ''; 
      resetValidation(formRef.current, setValid); 
  }, [isOpen]);

  return (
    <PopupWithForm
      reference={formRef}
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Обновление..."
      buttonText="Обновить"
      isValid={isValid}
    >
      <div className="form__input-container">
      <input 
          className="form__input form__input_el_avatar-link" 
          id="avatar-link-input" 
          type="url" 
          name="avatar" 
          placeholder="Ссылка на картинку" 
          onChange={handleChangeAvatar}  
          
          ref={inputRef}
          required
        />
        <span className="form__error avatar-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
