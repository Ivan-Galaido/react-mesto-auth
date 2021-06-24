import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onOverlayClose }) {
  const [avatar, setAvatar] = useState('');

  const handleChangeAvatar = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatar
    });
  };

  useEffect(() => {
    setAvatar('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Обновление..."
      buttonText="Обновить"
    >
      <div className="form__input-container">
        <input
          className="form__input form__input_el_avatar-link"
          id="avatar-link-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          onChange={handleChangeAvatar}
          value={avatar || ''}
          required
        />
        <span className="form__error avatar-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
