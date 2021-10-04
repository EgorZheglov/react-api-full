import trash2 from '../images/delete2.svg'
import React from 'react';
import { UserContext } from '../contexts/CurrentUserContext';

function Card (props){

    const currentUser = React.useContext(UserContext);

    const card = props.data;

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = `${isOwn ? 'elements__delete-button link' : 'elements__delete-button_disabled'}`;

    const isLiked = card.likes.some(likeOwner => likeOwner._id === currentUser._id)//так она же может тут меняться...

    const likeButtonClassName = `link ${isLiked ? 'elements__like-button_active ' : 'elements__like-button'}`;

    function handleClick() {
      props.handleCardClick(card);
    }  

    
    return(
        <div className="elements__item">
          <button className="elements__popup-button" type="button" onClick={handleClick}>
            <img className="elements__photo link" src={card.link} alt={card.name}/>
          </button>
          <div className="elements__description-content">
          <h2 className="elements__title">{card.name}</h2>
          <div className='elements__like'>
            <button className={likeButtonClassName} type="button" onClick={()=>{props.onLikeClick(card)}}></button>
            <div className='elements__like-quantity'>{card.likes.length}</div>
            </div>
          </div>
          <button className={cardDeleteButtonClassName} onClick={()=>{props.onDeleteClick(card)}} type="button">
            <img className="elements__trash-img" src={trash2} alt="удалить"/>
          </button>
        </div>
    )
}

export default Card;