import React from "react";
import {Link} from 'react-router-dom';

function PageNotFound () {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h3 className="not-found__title">404 – Страница не найдена</h3>
        <p className="not-found__text">Неправильный адрес страницы</p>
        <button className="not-found__button">
          <Link to="/" className="not-found__link">На главную</Link>
        </button>
      </div>
    </div>
  )
}

export default PageNotFound;
