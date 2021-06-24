import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const { avatar, name, about } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div
            className="profile__avatar-overlay"
            aria-label="Обновить аватар"
            onClick={onEditAvatar}
          ></div>
          <img className="profile__avatar" src={avatar} alt="Ваш аватар" />
        </div>
        <div className="profile__user-info">
          <div className="profile__heading">
            <h1 className="profile__name">{name}</h1>
            <button
              className="button button_edit"
              aria-label="Редактировать профиль"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{about}</p>
        </div>
        <button
          className="button button_add"
          aria-label="Добавить фото"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards" aria-label="Галерея">
        <ul className="cards__list">
          {cards.map((cardData) => (
            <Card
              key={cardData._id}
              card={cardData}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
