//Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент,
//добавляет его в DOM и устанавливает для него стиль с помощью CSS.


function addElement(tag, className, container, content) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = content;

  container.appendChild(element);
}

const containerElement = document.querySelector('.page');
const newElement = addElement('div', 'page__container', containerElement, 'New element');
