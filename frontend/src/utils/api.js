class Api {
    constructor({baseUrl, headers}) {
      this._url = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      //проверка ответа на запрос
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      }

    setToken(token){
      if(token){
        this._headers.authorization = `Bearer ${token}`;
      }else{
        this._headers.authorization = null;
      }
    }

    
    getUserData(){
      //Получаем информацию пользователе с сервера.
        return fetch(`${this._url}/users/me`,{
          headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards(){
      //получаем карточки, загруженные на сервер
      return fetch(`${this._url}/cards`,{
        headers: this._headers
      })
      .then(this._checkResponse)
    }


    toggleLike(id, method){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: `${method}`,
        headers: this._headers,
      })
      .then(this._checkResponse)
    }


    sendCardInfo(name, link){
      //ОТправляем данные карточки
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`
        })
      })
      .then(this._checkResponse) 
    }

    deleteCard(id){
      //Сообщаем серверу, что лайк поставлен
      return fetch(`${this._url}/cards/${id}`, {
        method: `DELETE`,
        headers: this._headers,
      })
      .then(this._checkResponse)
    }

    sendUserData(name, about){
      //Отправляем измененные данные на сервер.
      console.log(this._headers)
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: `${name}`,
          about: `${about}`
        })
      })
      .then(this._checkResponse)
    }

    sendUserAvatar(link){
      //Отправляем измененные данные на сервер.
      return fetch(`${this._url}/users/me/avatar`, {
        method:`PATCH`,
        headers: this._headers,
        body: JSON.stringify({
          avatar: `${link}`,
        })
      })
      .then(this._checkResponse)
    }
  }



  const api = new Api({
    baseUrl: 'http://api.mesto.zheglov.nomoredomains.monster',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export {api};