

function ImagePopup (props){
  
  let card;
  if(props.selectedCard){
    card = props.selectedCard;
  } else {
    card = {};
  }
  
    return(
      <div className= {`popup popup_type_photo ${props.isOpen ? 'popup_is-opened' : ' '}`} onClick={props.onClose}>
          <div className="popup__photo-container">
          <button className="popup__close popup__close_photo" onClick={props.onClose} type="button"></button>
          <img className="popup__photo" src={`${card.link}`} alt={card.name} />
          <h3 className="popup__photo-title">{card.name}</h3>
        </div>
      </div>
    )
}

export default ImagePopup