import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ card, onCardDelete, isOpen, onClose, onOverlayClose, isLoading }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCardDelete(card);
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Удаление..."
      buttonText="Да"
      title="Вы уверены?"
      name="confirm"
      isValid={true}
    />
  );
}

export default ConfirmPopup;
