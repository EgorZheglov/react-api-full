import React from 'react';
import { Link } from 'react-router-dom';


function Register (props){

    const [email, setEmail] =React.useState('')
    const [password, setPassword] =React.useState('')

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
  
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }

    function signUpSubmit(e){
        e.preventDefault()
        props.onSignUp(email, password);
    }

    return(
        <form className='sign' onSubmit={signUpSubmit}>
            <h1 className = "sign__title">Регистрация</h1>
            <input className = "sign__input" type = "email" value={email} onChange={handleChangeEmail} name="emailInput" id="email_input" placeholder='email' required />
            
            <input className = "sign__input" type = "password" value={password} onChange={handleChangePassword} name="passwordInput"  placeholder='Пароль' id="password_input" minLength="2" maxLength="20" required />
          
            <button className = "sign__button link" type = "submit">Зарегистрироваться</button> 
            <p>Уже зарегестрированы? <Link to="/sign-in" className = "sign__link link">Войти</Link></p>
        </form>
    )
}

export default Register