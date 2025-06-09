//Информация о пользователе
export function getUserInfo() {
return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me ', {
  headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f'
  }
})
   .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
};


  //Предзагруженные карточки
export function getInitialCards() {
return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
  headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f'
  }
})
   .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
};


// Изменение данных пользователя
export function changeUserInfo(name, about) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    method: 'PATCH',
     headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, about })
})
 .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
}; 


// Добавление новой карточки
export function addCard(name, link) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
    method: 'POST',
     headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, link })
})
 .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
}; 

// Ставим лайк
export function setCardLike(cardID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardID}`, {
    method: 'PUT',
       headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    'Content-Type': 'application/json'
  }})
   .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Удаляем лайк
export function removeCardLike(cardID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardID}`, {
    method: 'DELETE',
       headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    'Content-Type': 'application/json'
  }})
  .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Удаляем карточку
export function deleteCurrentCard(cardID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardID}`, {
    method: 'DELETE',
       headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    'Content-Type': 'application/json'
  }})
   .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Меняем аватар
export function changeUserAvatar(avatar) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar', {
    method: 'PATCH',
     headers: {
    authorization: '8244d22d-a73b-4ad7-9136-f4b7ce43271f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ avatar })
})
  .then(res => {
      if (res.ok) {
        return res.json();
      }
       return Promise.reject(`Ошибка: ${res.status}`);
    });
}; 