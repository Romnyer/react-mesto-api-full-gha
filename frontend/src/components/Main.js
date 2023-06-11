import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

import avatar from '../images/Avatar.jpg';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, handleCardLike, handleDeleteClick}) {
  const currentUser = useContext(CurrentUserContext);

  //Element template
  const cardElements = cards.map(item => (
    <li className="elements__item" key={item._id}>
      <Card
        card={item}
        userId={currentUser._id}
        onCardClick={onCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteClick}
      />
    </li>
  ));

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar">
          <div
            className="profile__container"
            onClick={onEditAvatar}>
            <img className="profile__pic" src={currentUser.avatar ? currentUser.avatar : avatar} alt="Аватар"/>
            <div className="profile__edit-pic"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name ? currentUser.name : 'Ваше имя'}</h1>
            <p className="profile__subtitle">{currentUser.about ? currentUser.about : 'О себе'}</p>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={onEditProfile}>
            </button>
          </div>
        </div>
        <button
          className="profile__add-button"
          id="profile__add-button"
          type="button"
          aria-label="Кнопка добавления изображений"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__items">
          {cardElements}
        </ul>
      </section>

    </main>
  );
}

export default Main;
