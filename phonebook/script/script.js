'use strict';

// Данные для теста
// const data = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
// ];

{
  // Функция для получения данных из localStorage
  const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  // Функция записи в localStorage
  const setStorage = (key, obj) => {
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
  const addContactData = (contact) => {
    // data.push(contact);
    if (contact) {
      setStorage('data', contact);
    }
  };

  // Функция создания Container
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  // Функция создания header
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };
  // Функция создания логотипа
  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  // Функция создания main секции
  const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  // Функция создания кнопок
  const createButtonGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  // Функция создания таблицы
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
    <th class='delete'>Удалить</th>
    <th class='name'>Имя</th>
    <th class='surname'>Фамилия</th>
    <th>Телефон</th>
    <th></th>
    </tr>
    `);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  // Функция создания формы
  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.type = 'button';
    form.append(closeBtn);

    form.insertAdjacentHTML('beforeend', `
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" name="name" id="name" type="text" requared>
      </div>
      <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname"
      id="surname" type="text" requared>
      </div>
      <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone" id="phone" type="number" requared>
      </div>
    `);
    const buttonGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);
    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
      btnCancel: buttonGroup.btns[1],
      btnClose: closeBtn,
    };
  };

  // Функция создания footer секции
  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };
  // Функция создания логотипа footer
  const createTextFooter = (title) => {
    const p = document.createElement('p');
    p.classList.add('logo-footer');
    p.style.cssText = `font-size: 20px;
    font-weight: 400;`;
    p.textContent = `Все права защищены ©${title}`;

    return p;
  };

  const renderPhoneBook = (app, title) => {
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

  // Функция создания строк с контактами на основе полученных данных
  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    const btnCencel = document.createElement('button');
    btnCencel.classList.add('btn', 'btn-primary', 'mt-1');
    btnCencel.textContent = 'Редактировать';

    tr.append(tdDel, tdName, tdSurname, tdPhone, btnCencel);

    return tr;
  };

  // Фунция отрисовки контактов
  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  // Функция замены логотипа на номер телефона при наведнеии
  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  // Функция сортировки по алфавиту
  const sortFunction = (a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  // Функция вызова открытия и закрытия модального окна
  const modalControl = (btnAdd, formOverlay) => {
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
  const deleteControl = (btnDel, list) => {
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
  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  // Функция добавления данных из модального окна в форму
  const formControl = (form, list, closeModal) => {
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
  // Функция удаления контакта по номеру телефона
  const removeStorage = (number) => {
    const arr = getStorage('data');
    const newArr = arr.filter(elem => elem.phone !== number);
    // localStorage.setItem('data', JSON.stringify(newArr));
    setStorage('data', newArr);
  };
    // Функция вызова сортировки по имени и фамилии
  const sortControl = (table, list) => {
    table.addEventListener('click', e => {
      const data = getStorage('data');
      const target = e.target;
      if (target.closest('.name')) {
        const newArr = data.sort((a, b) => sortFunction(a.name, b.name));
        // localStorage.setItem('data', JSON.stringify(newArr));
        setStorage('data', newArr);
        list.textContent = '';
        renderContacts(list, newArr);
      }
      if (target.closest('.surname')) {
        const newArr = data.sort((a, b) => sortFunction(a.surname, b.surname));
        // localStorage.setItem('data', JSON.stringify(newArr));
        setStorage('data', newArr);
        list.textContent = '';
        renderContacts(list, newArr);
      }
    });
  };

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
    } = renderPhoneBook(app, title);
    // Функционал
    // Вызываем функцию отристовки контактов
    const allRow = renderContacts(list, getStorage('data'));
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
