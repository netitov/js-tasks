//Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице
//и выполняет определенные действия с этими данными, например, отправляет их на сервер
//или отображает всплывающее окно с результатами.


const form = document.querySelector('.page__form');
const inputs = form.querySelectorAll('.user__input');
const container = document.querySelector('.popup__data');
const closeBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');


let formData = {};

//отрисовка введенных пользователем данных
function renderElements(template, container) {

  //добавляем текст или другие данные элементу
  Object.entries(formData).forEach((i) => {

    //находим и клонируем template
    const elementTemplate = document.querySelector(template).content.cloneNode(true);

    const fieldName = elementTemplate.querySelector('.popup__field-name');
    const fieldValue = elementTemplate.querySelector('.popup__field-value');

    fieldName.textContent = i[0];
    fieldValue.textContent = i[1];

    //добавляем элемент внутрь container
    container.append(elementTemplate);
  })
}

//функция очистки формы после сохранения
function clearForm() {
  //очищаем форму
  inputs.forEach((i) => {
    i.value = '';
    i.labels[0].classList.remove('user__label_filled');
  })

  //удаляем ранее добавленные значения формы в модальное окно
  const savedElements = document.querySelectorAll('.popup__data-saved');
  savedElements.forEach((i) => {
    i.remove();
  })

  formData = {};
}

//обработка ввода данных в форму
inputs.forEach((i) => {
  i.addEventListener('input', () => {
    if (i.value !== '') {
      i.labels[0].classList.add('user__label_filled');
      formData[i.name] = i.value;
    }
  })
})

//отправка формы
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    //открыть модальное окно
    popup.classList.add('popup_active');
    //отрисовать данные формы в модальном окне
    renderElements('#input-data', container);
  }
});

//закрытие модального окна по клику по оверлей
popup.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    popup.classList.remove('popup_active');
    //очистить форму
    clearForm();
  }
})

//закрытие модального окна по клику по кнопке
closeBtn.addEventListener('click', () => {
  popup.classList.remove('popup_active');
  //очистить форму
  clearForm();
})
