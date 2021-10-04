import React from 'react';

function Login (props){

    const [email, setEmail] =React.useState('')
    const [password, setPassword] =React.useState('')

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
  
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }

    function signInSubmit(e){
        e.preventDefault()
        props.onSignIn(email, password)
    }

    return(
        <form className='sign' onSubmit={signInSubmit}>
            <h1 className = "sign__title">Вход</h1>
            <input className = "sign__input" type = "email" value={email} onChange={handleChangeEmail} name="emailInput" id="email_input" placeholder='email' required />
            
            <input className = "sign__input" type = "password" value={password} onChange={handleChangePassword} name="passwordInput"  placeholder='Пароль' id="password_input" minLength="2" maxLength="20" required />
          
            <button className = "sign__button link"  type = "submit">Войти</button> 
        </form>
    )
}

export default Login