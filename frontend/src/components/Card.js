function Card({card, userId, onCardClick, onCardLike, onCardDelete}) {
  const isOwn = card.owner._id === userId,
        isLiked = card.likes.some(like => like._id === userId);

  function handleClick() {
    onCardClick(card);
    console.log(card.owner._id, userId)
  };

  function handleLike() {
    onCardLike(card);
  };

  function handleDelete() {
    onCardDelete(card);
  };

  return (
    <>
      <img
        className="elements__pic"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="elements__trash-button"
          type="button"
          aria-label="Кнопка &#8243;удалить&#8243;"
          onClick={handleDelete}
        />
      )}
      <div className="elements__info">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__likes">
          <button className={`elements__like-button ${isLiked && 'elements__like-button_active'}`}
            type="button"
            aria-label="Кнопка &#8243;мне нравится&#8243;"
            onClick={handleLike}
          ></button>
          <p className="elements__like-number">{card.likes.length}</p>
        </div>
      </div>
    </>
  )
}

export default Card;
