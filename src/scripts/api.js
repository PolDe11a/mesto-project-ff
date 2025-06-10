const apiParams = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    "Content-Type": "application/json",
  },
}; 

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
};


//Информация о пользователе
export const getUserInfo = () => {
return fetch(`${apiParams.baseUrl}/users/me`, {
  headers: apiParams.headers,
})
   .then(getResponseData);
};


  //Предзагруженные карточки
export const getInitialCards = () => {
return fetch(`${apiParams.baseUrl}/cards`, {
 headers: apiParams.headers,
})
 .then(getResponseData);
};


// Изменение данных пользователя
export const changeUserInfo = (name, about) => {
  return fetch(`${apiParams.baseUrl}/users/me`, {
    method: 'PATCH',
     headers: apiParams.headers,
  body: JSON.stringify({ name, about })
})
.then(getResponseData);
}; 


// Добавление новой карточки
export const addCard = (name, link) => {
  return fetch(`${apiParams.baseUrl}/cards`, {
    method: 'POST',
    headers: apiParams.headers,
  body: JSON.stringify({ name, link })
})
.then(getResponseData);
}; 


// Ставим лайк
export const setCardLike = (cardID) => {
  return fetch(`${apiParams.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
       headers: apiParams.headers,})
   .then(getResponseData);
};


// Удаляем лайк
export const removeCardLike = (cardID) => {
  return fetch(`${apiParams.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
       headers: apiParams.headers,})
.then(getResponseData);
};


// Удаляем карточку
export const deleteCurrentCard = (cardID) => {
return fetch(`${apiParams.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
       headers: apiParams.headers,})
   .then(getResponseData);
};

// Меняем аватар
export const changeUserAvatar = (avatar) => {
return fetch(`${apiParams.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
     headers: apiParams.headers,
  body: JSON.stringify({ avatar })
})
  .then(getResponseData);
}; 