//Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает
// новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.


function renderElement(template, container) {
  //находим и клонируем template
  const elementTemplate = document.querySelector(template).content.cloneNode(true);

  //добавляем текст или другие данные элементу
  const textElement = elementTemplate.querySelector('.page__text');
  textElement.textContent = 'Some element';

  //добавляем элемент внутрь container
  container.append(elementTemplate);
}

const container = document.querySelector('.page');
renderElement('#new-element', container);
