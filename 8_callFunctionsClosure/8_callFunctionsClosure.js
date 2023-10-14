//Задача о замыканиях: напишите функцию, которая будет принимать массив
// функций и возвращать новую функцию, которая вызывает каждую функцию
//в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.


function callFunctionsClosure(functionsArray) {
  //возвращаем анонимную функцию
  return function() {
    const results = [];
    //выполняем все функции из массива, сохраняя результат
    for (const func of functionsArray) {
      results.push(func());
    }
    return results;
  };
}

const functionsArray = [
  function() { return 1; },
  function() { return 2; },
  function() { return 3; }
];

//возвращаем анонимную функцию
const callFunctions = callFunctionsClosure(functionsArray);

//вызываем анонимную функцию: функция запоминает переменные (замыкание)
const results = callFunctions();
console.log(results); // -> [1, 2, 3]
