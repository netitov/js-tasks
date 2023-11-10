//Задача о странных числах: Напишите функцию,
//которая принимает число и возвращает true,
//если это число является странным, и false в противном случае


function isWeirdNumber(number) {

  if (typeof number !== 'number') {
    return false;
  }

  if (number < 70) return false;

  //получаем сумму делителей начиная с 1 и меньше самого числа
  function getDevisorSum(n) {
    let sum = 0;
    for (let i = 1; i < n; i++) {
      if (n % i === 0) {
        sum += i;
      }
    }
    return sum;
  }

  const divisorsSum = getDevisorSum(number);

  //сравниваем сумму делителей с исходным числом
  return divisorsSum > number;
}

console.log(isWeirdNumber(70)); // -> true
console.log(isWeirdNumber(15)); // -> false
console.log(isWeirdNumber(836)); // -> true
console.log(isWeirdNumber('number')); // -> false
console.log(isWeirdNumber(null)); // -> false
