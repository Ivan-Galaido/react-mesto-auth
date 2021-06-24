import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => alert(`Что-то пошло не так... ${err}`));
  }, []);

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
      }
  if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isConfirmPopupOpen || isLoading) {
    document.addEventListener('keydown', handleEscClose);
  }
  return () => document.removeEventListener('keydown', handleEscClose);
});


  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const handleCardClick = (card) => {
    setImagePopup(true);
    setSelectedCard(card);
  };

  const handleTrashClick = (card) => {
    setConfirmPopup(true);
    setCardToDelete(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setConfirmPopup(false);
  };

  const closeAllPopupsOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  const handleUpdateUser = ({ name, about }) => {
    setLoading(true);
    api
      .setUserInfo(name, about)
      .then(({ name, about }) =>
        setCurrentUser({
          ...currentUser,
          name: name,
          about: about,
        }),
      )
      .then(() => closeAllPopups())
      .catch((err) => alert(`Что-то пошло не так... ${err}`))
      .finally(() => setLoading(false));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setLoading(true);
    api
      .setUserAvatar(avatar)
      .then(({ avatar }) =>
        setCurrentUser({
          ...currentUser,
          avatar: avatar,
        }),
      )
      .then(() => closeAllPopups())
      .catch((err) => alert(`Что-то пошло не так... ${err}`))
      .finally(() => setLoading(false));
  };

  const handleAddCard = ({ name, link }) => {
    setLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => alert(`Что-то пошло не так... ${err}`))
      .finally(() => setLoading(false));
  };

  const handleCardLike = ({ likes, _id: cardId }) => {
    const isLiked = likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) =>
        setCards((cards) => cards.map((card) => (card._id === cardId ? newCard : card))),
      )
      .catch((err) => alert(`Что-то пошло не так... ${err}`));
  };

  const handleCardDelete = ({ card, cardElement }) => {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => cardElement.classList.add("card_deleting"))
      .then(() =>
        setTimeout(() => {
          setCards((cards) => cards.filter((c) => (c._id === card._id ? null : c)));
        }, 500),
      )
      .then(() => closeAllPopups())
      .catch((err) => alert(`Что-то пошло не так... ${err}`))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleTrashClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={closeAllPopupsOnOverlay}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={closeAllPopupsOnOverlay}
          onAddPlace={handleAddCard}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={closeAllPopupsOnOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmPopup
          card={cardToDelete}
          onCardDelete={handleCardDelete}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={closeAllPopupsOnOverlay}
          isLoading={isLoading}
        />

        <ImagePopup
          name="image"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={closeAllPopupsOnOverlay}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
