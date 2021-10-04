import spinner from '../images/spinner1.png'

function Spinner (){  
      return(
        <div className = 'popup popup_type_photo  popup_is-opened' >
            <div className="popup__container">
            <img className="popup__registration-image rotation" src={spinner} alt='Загрузка'/>
            <h3 className="popup__title popup__registration-title">Загрузка</h3>
          </div>
        </div>
      )
  }
  
  export default Spinner