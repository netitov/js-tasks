//Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию для элемента
//на веб-странице, например, плавное изменение его положения или размера.


//вариант 1: через добавление класса
function addAnimationClass(element) {
  element.classList.add('_floated');
}

//вариант 2: через свойство style
function addAnimationStyle(element) {

  element.style.transform = 'translateY(50%)';

  //таймаут, чтобы можно было увидеть анимацию при обновлении страницы
  setTimeout(() => {
    element.style.transform = 'translateY(0)';
  }, 100);
}

const element = document.querySelector('.page__container');
addAnimationClass(element);
//addAnimationStyle(element);
