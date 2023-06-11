import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import PageNotFound from './PageNotFound.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import auth from '../utils/auth.js';

import success from '../images/Success.svg';
import failed from '../images/Failed.svg';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false),
        [isImagePopupOpen, setIsImagePopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState({}),
        [currentUser, setCurrentUser] = useState({}),
        [email, setEmail] = useState(''),
        [cards, setCards] = useState([]),
        [isTooltipOpen, setTooltipOpen] = useState(false),
        [loggedIn, setLoggedIn] = useState(false),
        [isSuccessTooltipStatus, setSuccessTooltipStatus] = useState(false);

  const allPopupSeters = [
          setIsEditProfilePopupOpen,
          setIsAddPlacePopupOpen,
          setIsEditAvatarPopupOpen,
          setIsDeletePopupOpen,
          setIsImagePopupOpen,
          setTooltipOpen
        ];

  const [isEditProfilePopupLoading, setEditProfilePopupLoading] = useState(false),
        [isEditAvatarPopupLoading, setEditAvatarPopupLoading] = useState(false),
        [isAddPlacePopupLoading, setAddPlacePopupLoading] = useState(false),
        [isDeletePopupLoading, setDeletePopupLoading] = useState(false),
        [isSignInLoading, setSignInLoading] = useState(false),
        [isSignUpLoading, setSignUpLoading] = useState(false);

  const navigate = useNavigate();


  /* Set user info and cards array from fetch */


  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getCards()])
        .then(([userData, cardList]) => {
          setCurrentUser(userData);
          setCards(cardList);
        })
        .catch(err => console.log(err))
      }
    }, [loggedIn]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      auth.getUserInfo(jwtToken)
        .then((authData) => {
          setEmail(authData.data.email);

          setLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch(err => console.log(err));
    }
  }, []);


  /* Handlers */


  //Hadlers for popup open buttons
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  };


  //Handle click on card pic
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  //Handle card like
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  };


  /* Submits */


  //Timeout for visual effect
  //Without timeout user will see effect of setIsLoading() before popup closed
  function endLoadingTimeout(setPopupIsLoading) {
    setTimeout(() => {
      setPopupIsLoading(false);
    }, 500)
  };

  //Submit profile
  function handleUpdateUser(name, description) {
    setEditProfilePopupLoading(true);
    api.changeUserInfo(name, description)
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => endLoadingTimeout(setEditProfilePopupLoading))
  };

  //Submit avatar
  function handleUpdateAvatar(avatar) {
    setEditAvatarPopupLoading(true);
    api.changeAvatar(avatar)
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          avatar: userData.avatar
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => endLoadingTimeout(setEditAvatarPopupLoading))
  };

  //Sumbit place
  function handleAddPlace(place, link) {
    setAddPlacePopupLoading(true);
    api.addCard(place, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => endLoadingTimeout(setAddPlacePopupLoading))
  };

  //Submit delete card
  function handleCardDelete(card) {
    setDeletePopupLoading(true);
    api.deleteCard(card._id)
      .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
      .catch(err => console.log(err))
      .finally(() => endLoadingTimeout(setDeletePopupLoading))

  };

  //Sign in and set jwt
  function handleLoginSubmit(email, password) {
    setSignInLoading(true);
    auth.signIn(email, password)
      .then(data => {
        localStorage.setItem('jwtToken', data.token);
        setEmail(email);

        setLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch(err => {
        console.log(err);
        setTooltipOpen(true);
        setSuccessTooltipStatus(false);
      })
      .finally(() => endLoadingTimeout(setSignInLoading))
  };

  //Sign up
  function handleRegisterSubmit(email, password) {
    setSignUpLoading(true);
    auth.signUp(email, password)
      .then(data => {
        setTooltipOpen(true);
        setSuccessTooltipStatus(true);
        navigate('/', {replace: true});
      })
      .catch(err => {
        console.log(err);
        setTooltipOpen(true);
        setSuccessTooltipStatus(false);
      })
      .finally(() => endLoadingTimeout(setSignUpLoading))
  };


  /* Popups close */


  function closeAllPopups() {
    allPopupSeters.forEach(seter => {
      seter(false);
    })
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          email={email}
        />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute loggedIn={loggedIn} element={
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleDeleteClick={handleDeleteClick}
              />
              }
            />
            }
          />

          {/*Sign in*/}

          <Route path="sign-in" element={<Login
            onSubmit={handleLoginSubmit}
            isLoading={isSignInLoading}
          />}
          />

          {/*Sign up*/}

          <Route path="sign-up" element={<Register
            onSubmit={handleRegisterSubmit}
            isLoading={isSignUpLoading}
          />}
          />

          {/*Page 404*/}

          <Route path="*" element={<PageNotFound/>}/>

        </Routes>

        <Footer/>

        {/*Profile popup*/}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isEditProfilePopupLoading}
        />

        {/*Avatar popup*/}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isEditAvatarPopupLoading}
        />

        {/*Add place popup*/}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isAddPlacePopupLoading}
        />

        {/*Delete place popup*/}

        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isDeletePopupLoading}
        />

        {/*Place popup*/}

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        {/*Success tooltip*/}

        <InfoTooltip
          isOpen={isTooltipOpen}
          pic={isSuccessTooltipStatus ? success : failed}
          text={isSuccessTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
