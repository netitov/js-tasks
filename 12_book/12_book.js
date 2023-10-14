//Задача на работу с объектами: создайте объект, представляющий собой книгу.
//Объект должен иметь свойства, такие как: название книги, автор и год издания.
//Напишите методы для получения и изменения значений свойств книги.


const book = {
  title: 'War and Peace',
  author: 'Leo Tolstoy',
  published: 1867,

  //получить свойство объекта
  getProperty(property) {
    return this[property];
  },

  //изменить свойство объекта
  setProperty(property, newValue) {
    this[property] = newValue;
  },

};

console.log('title:', book.getProperty('title')); // -> War and Peace
console.log('author:', book.getProperty('author')); // -> Leo Tolstoy
console.log('published:', book.getProperty('published')); // -> 1867

book.setProperty('title', 'Test Title'); //меняем название книги

console.log('new title:', book.getProperty('title')); // -> Test Title
