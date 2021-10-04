import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props){

    const avatarRef = React.useRef();  

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return(
      <PopupWithForm name="add" title="Добавить Фото" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
        <input className = "popup__input" ref={avatarRef} type = "url" name="avatarLinkInput" id="avatar_input" placeholder="Ссылка на картинку" minLength="2" maxLength="200" required />
        <span className = "popup__input-error" id="avatar_input-error"></span>
      </PopupWithForm>)
}

export default EditAvatarPopup;