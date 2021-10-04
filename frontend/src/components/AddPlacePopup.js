import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){
    const [place, setName] =React.useState('')
    const [link, setLink] =React.useState('')

    function handleChangePlace(e) {
      setName(e.target.value);
    }

    function handleChangeLink(e) {
      setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        props.onAddCard(place, link);
        setName('');
        setLink('');
    }

    return(
      <PopupWithForm name="add" title="Добавить Фото" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
        <input className = "popup__input" value={place} onChange={handleChangePlace} type = "text" name="photoNameInput" id="photo-name_input" placeholder="Название" minLength="2" maxLength="30"  required />
        <span className = "popup__input-error" id="photo-name_input-error"></span>
        <input className = "popup__input" value={link} onChange={handleChangeLink} type = "url" name="photoLinkInput" placeholder="Ссылка на картинку" id="photo-link_input"  required />
        <span className = "popup__input-error" id="photo-link_input-error"></span>
      </PopupWithForm>)
}

export default AddPlacePopup;