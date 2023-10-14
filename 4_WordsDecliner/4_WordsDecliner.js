//Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
//112 сообщений
//12 сообщений
//1 сообщение
//1024 пользователя
//1026 пользователей
//121 пользователь

//Функцию надо упаковать в модуль.


const WordsDecliner = {

  declineWithNumerals(n, forms) {

    //n - число, для которого требуется склонение
    //forms - массив слов в падежах (именительный, родильный ед.ч., родительные мн.ч.)

    //обработка ошибок
    if (typeof n !== 'number') {
      return new Error('Первым аргументом должно быть число');
    }

    if (!Array.isArray(forms) || forms.length < 3) {
      return new Error('Вторым аргументом должно быть массив строк: [<слово в им.падеже>, <слово в род.падеже ед.числа>, <слово в род.падеже мн.числа>]');
    }

    //получаем последние 2 цифры числа
    const num = Math.abs(n) % 100;

    //получаем последнюю цифру числа
    const lastDigit = Math.abs(n) % 10;

    //возвращаем 3 форму, если последние 2 цифры от 11 до 14
    if (num >= 11 && num <= 14) {
      return forms[2];
    }

    //возвращаем 1 форму, если последняя цифра 1
    if (lastDigit === 1) {
      return forms[0];
    }

    //возвращаем 2 форму, если последняя цифра от 2 до 4
    if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
    }

    return forms[2];
  }
};

console.log(WordsDecliner.declineWithNumerals(10235, ['сообщение', 'сообщения', 'сообщений'])); // -> сообщений
console.log(WordsDecliner.declineWithNumerals(1, ['пользователь', 'пользователя', 'пользователей'])); // -> пользователь
console.log(WordsDecliner.declineWithNumerals(1022, ['пользователь', 'пользователя', 'пользователей'])); // -> пользователя
console.log(WordsDecliner.declineWithNumerals('23', ['пользователь', 'пользователя', 'пользователей'])); // -> ошибка
console.log(WordsDecliner.declineWithNumerals(1225, ['пользователь', 'пользователя'])); // -> ошибка

module.exports = WordsDecliner;
