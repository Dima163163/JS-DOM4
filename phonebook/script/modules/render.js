import {
  createHeader, createLogo,
  createMain, createButtonGroup, createTable, createForm,
  createFooter, createTextFooter, createRow,
} from './createElements.js';

// Функция отрисовки телефонного справочника
export const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay, btnClose, btnCancel} = createForm();
  const footer = createFooter();
  const logoFooter = createTextFooter(title);

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  footer.footerContainer.append(logoFooter);

  app.append(header, main, footer);

  return {
    table,
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
    btnClose,
    btnCancel,
  };
};

// Фунция отрисовки контактов
export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};


