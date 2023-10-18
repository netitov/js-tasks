//Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
//Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах.
//Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.


const inputELement = document.querySelector('.page__input');
const liElements = document.querySelectorAll('.page__check');
const progress = document.querySelector('.page__progress-done');
const gradeValueElement = document.querySelector('.page__progress-value');


const validationRegex = [
  { regex: /.{8,}/ }, //min 8 letters,
  { regex: /[a-z]/ }, //letters from a - z (lowercase)
  { regex: /[A-Z]/ }, //letters from A-Z (uppercase),
  { regex: /[0-9]/ }, //numbers from 0 - 9
  { regex: /[!,%,&,@,#,$,^,*,?,_,~]/ } //special characters
];

const grades = [
  {
    grade: 5,
    percent: '100%',
    value: 'Сильный',
    color: '#52c26b'
  },
  {
    grade: 3,
    percent: '50%',
    value: 'Средний',
    color: '#ffd350'
  },
  {
    grade: 1,
    percent: '15%',
    value: 'Слабый',
    color: '#ff9660'
  },
  {
    grade: 0,
    percent: '0%',
    value: 'Слабый',
    color: 'transparent'
  }
];


inputELement.addEventListener('input', () => {
  let grade = 0;

  validationRegex.forEach((i, index) => {

    //проверяем, подходит ли пароль под рег выражение
    const isValid = i.regex.test(inputELement.value);

    //переключаем стили для подсказок (скрыть/показать)
    if (isValid) {
      liElements[index].classList.add('page__check_checked');
      grade++;
    } else {
      liElements[index].classList.remove('page__check_checked');
    }
  })

  //скрываем оценку, если поле пустое
  if (!inputELement.value) {
    gradeValueElement.style.opacity = 0;
  } else {
    gradeValueElement.style.opacity = 1;
  }

  //добавляем стили прогресс бар + значение оценки
  const gradeData = grades.find(g => grade >= g.grade);
  progress.style.width = gradeData.percent;
  progress.style.backgroundColor = gradeData.color;
  gradeValueElement.textContent = gradeData.value;

})

