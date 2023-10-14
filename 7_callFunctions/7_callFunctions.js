//Задача о коллекции функций: у вас есть массив функций,
//напишите код, который вызовет каждую функцию в этом массиве
//и выведет их порядковый номер. Однако, вызов каждой функции
//должен происходить только после вызова предыдущей функции.


async function callFunctions(array) {

  if (!Array.isArray(array)) {
    return new Error('Аргументом должен быть массив');
  }

  const functionsNumber = [];

  for (const func of array) {

    //проверяем тип данных
    if (typeof func === 'function') {
      //вызываем функцию после завершения предыдущей
      await func();
      //сохраняем индекс вызыванной функции
      functionsNumber.push(array.indexOf(func));

    } else {
      throw new Error('Массив должен состоять из функций');
    }
  }

  //выводим в консоль данные по номерам функциий
  console.log(`All finished functions: ${functionsNumber}`);
}

const array = [
  function func0() {
    console.log('function 0 finished');
  },
  async function func1() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('function 1 finished');
        resolve();
      }, 500);
    });
  },
  function func2() {
    console.log('function 2 finished');
  },
  function func3() {
    console.log('function 3 finished');
  }
]

callFunctions(array); // -> All finished functions: 0,1,2,3
