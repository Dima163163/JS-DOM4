// Функция для получения данных из localStorage
export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Функция записи в localStorage
export const setStorage = (key, obj) => {
  const data = getStorage(key);
  if (typeof obj === 'object') {
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
  }
  if (Array.isArray(obj)) {
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(obj));
  }
};

// Функция добавление контакта в объект
export const addContactData = (contact) => {
  if (contact) {
    setStorage('data', contact);
  }
};

// Функция удаления контакта по номеру телефона
export const removeStorage = (number) => {
  const arr = getStorage('data');
  const newArr = arr.filter(elem => elem.phone !== number);
  setStorage('data', newArr);
};


