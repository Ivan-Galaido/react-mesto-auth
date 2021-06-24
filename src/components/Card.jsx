import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, deletingCardId, onCardClick, onCardLike, onCardDelete }) {
  const { _id: currentUserId } = useContext(CurrentUserContext);
  const { name, link, owner, likes } = card;

  const isOwner = owner._id === currentUserId;

  const isLiked = likes.some((user) => user._id === currentUserId);

  const isCardDeleting = card._id === deletingCardId;

  const classNamesCard = [
    'card',
    isCardDeleting ? 'card_deleting' : ''
  ].join(' ').trim();

  return (
    <li className={classNamesCard}>
      <div className="card__image">
        <div
          className="card__preview"
          aria-label="Увеличить изображение"
          style={{ backgroundImage: `url(${link})` }}
          onClick={() => onCardClick(card)}
        ></div>
      </div>
      {isOwner && (
        <button
          className="button button_delete"
          aria-label="Удалить изображение"
          type="button"
          onClick={() => onCardDelete(card)}
        ></button>
      )}
      <div className="card__caption">
        <h2 className="card__heading">{name}</h2>
        <div className="card__likes-container">
          <button
            className={`button ${isLiked ? 'button_like_liked' : 'button_like_default'}`}
            aria-label="Нравится"
            type="button"
            onClick={() => onCardLike(card)}
          ></button>
          <span className="card__likes-quantity">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
