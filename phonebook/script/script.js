import {getStorage, removeStorage} from './modules/serviceStorage.js';

import * as render from './modules/render.js';

import {
  modalControl, deleteControl,
  formControl, sortControl,
} from './modules/control.js';

import hoverRow from './modules/hover.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      table,
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = render.renderPhoneBook(app, title);
    // Функционал
    // Вызываем функцию отристовки контактов
    const allRow = render.renderContacts(list, getStorage('data'));
    // Вызываем функцию открытия и закрытия модального
    // окна и вытаскиваем ф-ию закрытия модального окна
    const {closeModal} = modalControl(btnAdd, formOverlay);
    // Вызываем функцию замены логотипа на номер телефона
    hoverRow(allRow, logo);
    // Вызываем функцияю удаления из формы
    deleteControl(btnDel, list);
    // Вызываем функцию добавления данных из модального окрна в таблицу
    formControl(form, list, closeModal);
    // Вызываем функцию удаления контакта по номеру телефона
    removeStorage('666');
    // Вызываем функцию вызова сортировки в таблице по имени и фамилии
    sortControl(table, list);
  };

  window.phoneBookInit = init;
}
