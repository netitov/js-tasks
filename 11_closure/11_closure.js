//Задача о замыканиях и области видимости: напишите функцию,
//которая возвращает другую функцию. Внутренняя функция должна
// иметь доступ к переменной, определенной во внешней функции,
//даже после того, как внешняя функция завершила свое выполнение.


function sum(x) {
  return function(y) {
    return x + y;
  };
}

//вызываем функцию sum с аргументом 5 и сохраняем возвращенную функцию в переменную addSum
const addSum = sum(5);

//вызываем функцию addSum с аргументом 2, используя замыкание для сохранения значения x (5)
console.log(addSum(2)); // -> 7

