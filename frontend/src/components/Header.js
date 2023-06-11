import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import logo from '../images/Logo.svg';
import burgerPic from '../images/Burger.svg';
import outPic from '../images/Close-Icon-small.svg';

function Header({loggedIn, setLoggedIn, email}) {
  let linkUrl = '',
      linkText = '';

  const location = useLocation(),
        pathname = location.pathname,
        [isBurger, setBurger] = useState(false);

  if (pathname !== '/') {
    if (pathname === '/sign-in') {
      linkUrl = '/sign-up';
      linkText = 'Регистрация';
    }

    if (pathname === '/sign-up') {
      linkUrl = '/sign-in';
      linkText = 'Войти';
    }
  }

  else {
    linkUrl = '/sign-in';
    linkText = 'Выйти';
  };

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwtToken');
    setBurger(false);
  }

  const logoElement = (
    <img className="header__logo" src={logo} alt="Логотип"/>
  );
  const linkElement = (
    <Link
      to={linkUrl}
      className={`header__link ${loggedIn ? 'header__link_logged' : ''}`}
      onClick={onSignOut}
      style={{
        marginRight: loggedIn ? 0 : 30
      }}
    >
      {linkText}
    </Link>
  );

  return (
    <header className={`header ${loggedIn ? 'header_mobile' : ''}`} style={{maxHeight: isBurger ? 500 : 133}}>
      {loggedIn ?
        (<>

          <div className="header__menu">
            {logoElement}
            <button className="header__menu-button" onClick={() => setBurger(!isBurger)}>
              <img className={`header__menu-pic ${isBurger ? '' : 'header__menu-pic_type_out'}`} src={outPic} alt="Закрыть меню"/>
              <img className={`header__menu-pic ${isBurger ? 'header__menu-pic_type_out' : ''}`} src={burgerPic} alt="Открыть меню"/>
            </button>
          </div>

          <div className={`header__container ${isBurger ? 'header__container_opened' : ''}`}>
            {loggedIn && <p className="header__email">{email}</p>}
            {linkElement}
          </div>

        </>)
      :
      (<>
        {logoElement}
        {linkElement}
      </>)
      }
    </header>
  );
}

export default Header;
