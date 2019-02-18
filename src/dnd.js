/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
// window.onload = function () {
const homeworkContainer = document.querySelector('.homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

const div = createDiv();

homeworkContainer.appendChild(div);

function createDiv() {

    const element = document.createElement('div');

    element.style.height = Math.floor(generateHeight()) + 'px';
    element.style.width = Math.floor(generateWidth()) + 'px';
    element.style.background = 'red';
    element.setAttribute('id', 'addDiv');
    element.setAttribute('draggable', true);

    element.style.position= 'absolute';
    element.style.top = Math.floor(generateTop()) +  'px';
    element.style.left = Math.floor(generateLeft()) +  'px';
    element.style.cursor = 'move';

    function generateHeight() {
        return Math.random() * 100;
    }

    function generateWidth() {
        return Math.random() * 100;
    }

    function generateTop(){
        return Math.random() * 200;
    }


    function generateLeft(){
        return Math.random() * 150;
    }

    return element;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
// function addListeners(target) {
// }

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

