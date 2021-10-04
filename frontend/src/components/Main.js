import vector from '../images/Vector1.svg';
import cross from '../images/cross.svg';
import React from 'react';
import Card from './Card';
import { UserContext } from '../contexts/CurrentUserContext';
import Header from './Header';

function Main (props){

  const currentUser = React.useContext(UserContext);
  
  return(
    <div className="main">
      <Header isLoggedIn={props.loggedIn} email={props.email} onLogOut={props.onLogOut}/>
      <section className="profile">
        <div className="profile__info">
          <button className='profile__avatar-button' onClick={props.onEditAvatar} type='button'>
              <img className="profile__img" src={currentUser.avatar} alt="Фото профиля" />
              <div className='profile__avatar-icon'>
              </div>
          </button>
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"><img className="profile__edit-img" src={vector} alt="Редактировать профиль" /></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button">
          <img className="profile__cross" src={cross} alt="Добавить изображение" />
        </button>
        </section>
        <section className="elements">
          {props.cards? props.cards.map((card) => (
            <Card key={card._id} data={card} handleCardClick={props.handleCardClick} onDeleteClick={props.onCardDelete} onLikeClick={props.onCardLike}/>
          ))
          :'Загрузка карточек'}
        </section>
    </div>
    )
}

export default Main