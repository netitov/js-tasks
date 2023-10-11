//Задача о палиндроме: напишите функцию, которая проверяет,
//является ли заданная строка палиндромом. Палиндром — это строка,
//которая читается одинаково в обоих направлениях (например, «аргентина манит негра»)


function isPalindrome(string) {

  if (string == null || string == undefined) {
    return false;
  }

  //удаляем из строки все символы, кроме букв и цифр, и приводим к нижнему регистру
  const cleanStr = string.replace(/[^a-zA-Zа-яА-Я]/g, '').toLowerCase();

  //переворачиваем очищенную строку
  const reversedStr = cleanStr.split('').reverse().join('');

  return cleanStr === reversedStr;
}

console.log(isPalindrome('Аргентина манит негра')); // -> true
console.log(isPalindrome('Аргентина не манит')); // -> false
console.log(isPalindrome('Учуя молоко, я около мяучу')); // -> true
console.log(isPalindrome(null)); // -> false
