import {getStorage, setStorage, addContactData} from './serviceStorage.js';
import * as render from './render.js';
import {createRow} from './createElements.js';


// Функция сортировки по алфавиту
export const sortFunction = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

// Функция вызова открытия и закрытия модального окна
export const modalControl = (btnAdd, formOverlay) => {
  // Функция открывания модального окна
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  // Функция закрывания модального окна
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });
  return {
    closeModal,
  };
};

// Функция вызова удаления из таблицы
export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
    }
  });
};

// Функция добавления нового контакта в телефонный справочник
export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

// Функция добавления данных из модального окна в форму
export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};

// Функция вызова сортировки по имени и фамилии
export const sortControl = (table, list) => {
  table.addEventListener('click', e => {
    const data = getStorage('data');
    const target = e.target;
    if (target.closest('.name')) {
      const newArr = data.sort((a, b) => sortFunction(a.name, b.name));
      // localStorage.setItem('data', JSON.stringify(newArr));
      setStorage('data', newArr);
      list.textContent = '';
      render.renderContacts(list, newArr);
    }
    if (target.closest('.surname')) {
      const newArr = data.sort((a, b) => sortFunction(a.surname, b.surname));
      // localStorage.setItem('data', JSON.stringify(newArr));
      setStorage('data', newArr);
      list.textContent = '';
      render.renderContacts(list, newArr);
    }
  });
};

