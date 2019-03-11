/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

getCookies();

filterNameInput.addEventListener('keyup', function (keyValue) {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    getCookies(filterNameInput.value);
    // if (!filterNameInput.value) {
    //     console.log('fromTestVAl')
    //     getCookies(filterNameInput.value)
    // } else {
    //     if (keyValue) {
    //         console.log('FromKey', keyValue.key);
    //         getCookies(keyValue.key);
    //     }
    // }
});

listTable.addEventListener('click', (e) => {
    console.log('hello from tests');
    if (e.target.type === 'submit') {
        const cookieName = e.target.parentElement.parentElement.querySelector('#cookieName').innerText;
        console.log('CookieName', cookieName.trim());

        // deleteCookie(e.target.dataset.name);
        deleteCookie(cookieName);
        getCookies();
    }
})

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    const cookieName = addNameInput.value;
    const cookieValue = addValueInput.value;

    if (cookieName !== '' && cookieValue !== '') {
        for (let item of document.cookie.split('; ')) {
            const [name] = item.split('=');

            if (name === cookieName) {
                setCookie(name, '', {
                    expires: -1
                });
            }
        }

        setCookie(cookieName, cookieValue, {});
    }

    getCookies(filterNameInput.value);
});

function getCookies(symbolsInCookie = '') {
    listTable.innerHTML = '';
    for (let cookieValue of document.cookie.split('; ')) {
        let [name, value] = cookieValue.split('=');
        const trString = `<td id="cookieName">${name}</td><td id="cookieValue">${value}</td><td>` +
            `<button id="deleteCookie" data-name="${name}">Удалить</button></td>`;

        if (symbolsInCookie) {
            if (name.indexOf(filterNameInput.value) < 0 && value.indexOf(filterNameInput.value) < 0) {
                continue;
            }
        }
        if (value !== undefined) {
            const tr = document.createElement('tr');

            tr.innerHTML = trString;

            listTable.appendChild(tr);

        }
    }
}

function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    });
    getCookies(filterNameInput.value);
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == 'number' && expires) {
        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + '=' + value;

    for (var propName in options) {
        updatedCookie += '; ' + propName;
        let propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}
