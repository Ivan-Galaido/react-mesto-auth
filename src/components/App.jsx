import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from './InfoTooltip';
import Loader from './Loader';
import api from '../utils/api';
import auth from '../utils/auth';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setIsInfoTooltipOpen(true);
  };

  const handleRegister = (userData) => {
    auth
      .register(userData)
      .then(() => setError(false))
      .then(() => setIsInfoTooltipOpen(true))
      .then(() => history.push('/sign-in'))
      .catch(handleError);
  };

  const handleLogin = (userData) => {
    auth
      .authorize(userData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => setUserEmail(userData.email))
      .then(() => setLoggedIn(true))
      .catch(handleError);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
  };

  const checkToken = () => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      auth
        .checkToken(token)
        .then(({ data: { email } }) => setUserEmail(email))
        .then(() => setLoggedIn(true))
        .catch(handleError);
    }
    else setLoggedIn(false);
  };

  useEffect(() => {
    if (loggedIn) history.push('/');
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [deletingCardId, setDeletingCardId] = useState('');
  const [isMainDataLoading, setIsMainDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setIsMainDataLoading(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch(handleError)
        .finally(() => setIsMainDataLoading(false));
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleTrashClick = (card) => {
    setIsConfirmPopupOpen(true);
    setCardToDelete(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
  };

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const closeAllPopupsOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  const closeAllPopupsOnEscape = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeAllPopupsOnEscape);
    return () => document.removeEventListener('keydown', closeAllPopupsOnEscape);
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo(name, about)
      .then(({ name, about }) =>
        setCurrentUser({
          ...currentUser,
          name: name,
          about: about
        })
      )
      .then(() => closeAllPopups())
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then(({ avatar }) =>
        setCurrentUser({
          ...currentUser,
          avatar: avatar
        })
      )
      .then(() => closeAllPopups())
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  const handleAddCard = ({ name, link }) => {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ likes, _id: cardId }) => {
    const isLiked = likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) =>
        setCards((cards) => cards.map((card) => (card._id === cardId ? newCard : card)))
      )
      .catch(handleError);
  };

  const handleCardDelete = ({ _id: cardId }) => {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => setDeletingCardId(cardId))
      .then(() =>
        setTimeout(() => {
          setCards((cards) => cards.filter((card) => (card._id === cardId ? null : card)));
        }, 500)
      )
      .then(() => closeAllPopups())
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  if (loggedIn === null) {
    return <Loader mix="page" />;
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={handleLogout} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            cards={cards}
            deletingCardId={deletingCardId}
            onCardLike={handleCardLike}
            onCardDelete={handleTrashClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            isLoading={isMainDataLoading}
            component={Main}
          />

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
        </Switch>

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

        <InfoTooltip
          name="tooltip"
          isOpen={isInfoTooltipOpen}
          onOverlayClose={closeAllPopupsOnOverlay}
          onClose={closeInfoTooltip}
          error={error}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
