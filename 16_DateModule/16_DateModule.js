//Задача на модули и использование внешних библиотек: напишите модуль,
//который экспортирует функцию для работы с датами.
//Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

import moment from 'moment';

//форматирование даты
export function formatDate(date, format) {
  return moment(date).format(format);
}

//добавление даты/времени
export function addDate(date, value, type) {
  return moment(date).add(value, type).toDate();
}


