import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api';
import signApi from '../utils/auth'
import Register from './Register';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import EditAvatarPopup from './EditAvatarPopup';
import { UserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup'
import InfoTooltip from './InfoTooltip'
import Login from './Login'
import Spinner from './Spinner';
import ProtectedRoute from './ProtectedRoute';


function App() {
  
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false); //Учел замечание про нейминг функций, в дальнешем исправлю, просто это очень долго ;)
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false); 
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState({name:'', about: ''})
  const [initialCards, setCards] = React.useState(null);
  const [loggedIn, setLogIn] = React.useState(false);
  const [isRegistrationPopupOpen, setRegistrationPopup] = React.useState(false);
  const [signSuccsess, setSignSucces] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const history = useHistory();

  React.useEffect(()=>{
    const jwt = localStorage.getItem('jwt')

    loadData();

    if(!jwt){
      setIsLoading(false)
      return;
    }

    signApi.tokenCheck(jwt)
    .then(res => {

      setEmail(res.data.email)

      setLogIn(true)

      setIsLoading(false)
    })
    .catch(err =>{
      console.log(`Ошибка проверки токена!:${err}`)
    })

  },[])
  
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    const method = isLiked ? 'DELETE' : 'PUT';

    api.toggleLike(card._id, method)
      .then((newCard) => {
         setCards((state) => {
           return state.map((c) => c._id === card._id ? newCard : c)
         });
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  } 


  function handleLogOut(){
    history.push('/sign-in');
    setLogIn(false)

    localStorage.removeItem('jwt')
  }

  function handleSignUpSubmit(email, password){
    signApi.signUp(email, password)
    .then(res => {

      setSignSucces(true);
      
      
      history.push('/sign-in')
    })
    .catch(err => {
      setSignSucces(false)
    })
    .finally(() => {
      setRegistrationPopup(true);
    })
  }


  function loadData(){
    api.getUserData()
      .then(res =>{
        setUser(res)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })

      api.getInitialCards()
      .then(res =>{
        setCards(res)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleSignInSubmit(email, password){
    
    signApi.signIn(email, password)
    .then(res => {
      setLogIn(true);

      setEmail(email);

      localStorage.setItem('jwt', res.token);

      history.push('/');
    })
    .catch(err => {
      setSignSucces(false);
      setRegistrationPopup(true);
    })
    
  }


  function handleCardClick(card){
    setSelectedCard(card);
    toggleImagePopup();
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
         setCards((state) => {
           return state.filter((c) => c._id !== card._id )//вставляем обновленную карточку
         });
    })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  } 


  function toggleAddPlace(){
    setAddPlacePopup(true);
  }

  function toggleEditAvatar(){
    setAvatarPopup(true);
  }

  function toggleEditProfile(){
    setEditProfile(true);
  }

  function toggleImagePopup(){
    setImagePopup(true);
  }

  function closeAllPopups(){
    setImagePopup(false);
    setAddPlacePopup(false);
    setAvatarPopup(false);
    setEditProfile(false);
    setSelectedCard(null);
    setRegistrationPopup(false)
  }
  
  function handleUpdateUser(name, about){
    api.sendUserData(name, about)
      .then((res) =>{
        setUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleUpdateAvatar(link){
    api.sendUserAvatar(link)
      .then((res) =>{
        setUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleAddCard(name, link){
    api.sendCardInfo(name, link)
      .then((newCard) =>{
        setCards([newCard, ...initialCards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  return (
    <div className="page">
    <UserContext.Provider value={currentUser}>
    {!isLoading ? <>
    <Switch>
      <ProtectedRoute 
          exact path='/'
          component={Main}  
          loggedIn = {loggedIn}  
          handleCardClick={handleCardClick} 
          onEditProfile={toggleEditProfile} 
          onAddPlace={toggleAddPlace} 
          onEditAvatar={toggleEditAvatar}
          cards={initialCards}
          email={email}
          onLogOut={handleLogOut}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}/>  
      <Route path='/sign-up'>
        <Header email={email} onLogOut={handleLogOut}/>
        <Register onSignUp = {handleSignUpSubmit}/>
      </Route>
      <Route path='/sign-in' >
         <Header email={email} onLogOut={handleLogOut}/>
         <Login onSignIn = {handleSignInSubmit}/>  
      </Route>
      <Route>
          {!loggedIn ? (<Redirect to="/" />) : (<Redirect to="/sign-in" />)}
      </Route>
    </Switch></>:<Spinner />}
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>  
    </UserContext.Provider>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
    <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups}>
          <button className = "popup__save-button" type = "submit">Да</button>
        </PopupWithForm>    
    <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} selectedCard={selectedCard}/>
    <InfoTooltip onClose={closeAllPopups} isSuccesed={signSuccsess} isOpen={isRegistrationPopupOpen}/>
    <Footer />
    </div>
  );
}

export default App;


