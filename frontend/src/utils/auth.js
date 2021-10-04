class SignApi{
    constructor(baseUrl){
      this._url = baseUrl;
    }

    _checkResponse(res) {
      //проверка ответа на запрос
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res)
      }

    signUp(email, password){
       //Регистрируем пользователя пользователя

      return fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          password: `${password}`,
          email: `${email}`
        })
      })
      .then(this._checkResponse)
     }

    signIn(email, password){
      //Авторизируем пользователя

     return fetch(`${this._url}/signin`, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         password: `${password}`,
         email: `${email}`
       })
     })
     .then(this._checkResponse)
    }

    tokenCheck(token){
     return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    } 
  }


  const signApi = new SignApi('https://auth.nomoreparties.co');

  export default signApi