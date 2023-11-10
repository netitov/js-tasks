//Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
//вычисление N-го числа в ряду Фибоначчи
//вычисление всех чисел в ряду Фибоначчи до числа N
//вычисление N-го просто числа
//вычисление всех простых чисел до числа N


export const MathX = {

  //вычисление N-го числа в ряду Фибоначчи
  nthFibonacci(n) {

    if (n < 1) {
      return new Error('Число не может быть меньше 1');
    }

    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');
    }

    //вычисление ряда Фибоначчи длины n
    const fibonacciArr = this.fibonacciLength(n);

    //возвращаем последний элемент из массива
    return fibonacciArr[fibonacciArr.length - 1];
  },

  //вычисление всех чисел в ряду Фибоначчи до числа N
  fibonacci(n) {

    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');

    }

    //первые 3 числа в ряду
    const fibonacciArr = [0, 1, 1];

    if (n < 0) {
      return new Error('Число не может быть меньше 0');
    }

    if (n === 0) {
      return [0];
    }

    //запускаем цикл - добавляем в массив сумму двую предыдущих чисел пока не доходим до n
    while (fibonacciArr[fibonacciArr.length - 1] + fibonacciArr[fibonacciArr.length - 2] <= n) {
      const nextNumber = fibonacciArr[fibonacciArr.length - 1] + fibonacciArr[fibonacciArr.length - 2];
      fibonacciArr.push(nextNumber);
    }

    return fibonacciArr;
  },

  //вычисление ряда Фибоначчи длины n
  fibonacciLength(n) {

    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');
    }

    //первые 3 числа в ряду
    const fibonacciArr = [0, 1, 1];

    if (n < 1) {
      return new Error('Длина ряда не может быть меньше 1');
    }

    if (n < fibonacciArr.length) {
      return fibonacciArr.slice(0, n);
    }

    //запускаем цикл - добавляем в массив сумму двую предыдущих чисел пока длина массива не доходит до n
    while (fibonacciArr.length < n) {
      const nextNumber = fibonacciArr[fibonacciArr.length - 1] + fibonacciArr[fibonacciArr.length - 2];
      fibonacciArr.push(nextNumber);
    }

    return fibonacciArr;
  },

  //функция для проверки простого числа
  isPrime(n) {

    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');
    }

    // возвращаем false, т.к. 2 первое простое число
    if (n <= 1) return false;

    if (n > 1) {
      //запускаем от 2 (первое простой число)
      for (let i = 2; i < n; i++) {
        //если n делится без остатка на любое кроме 1 и n - возвращаем false
        if (n % i == 0) {
          return false;
        }
      }

      return true;
    }
  },

  //вычисление N-го просто числа
  nthPrime(n) {
    if (n < 1) {
      return new Error('Число не может быть меньше 1');
    }

    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');
    }

    //вычисление ряда Фибоначчи длины n
    const fibonacciArr = this.primesLength(n);

    //возвращаем последний элемент из массива
    return fibonacciArr[fibonacciArr.length - 1];
  },

  //вычисление всех простых чисел до числа N
  primesUpTo(n) {

    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');
    }

    if (n < 2) {
      return new Error('Простые числа начинаются с 2');
    }

    const primes = [];

    //запускаем цикл от 2 (минимальное простое число)
    for (let i = 2; i <= n; i++) {
      //проверяем является ли i простым числом
      if (this.isPrime(i)) {
        //добавляем i в массив primes
        primes.push(i);
      }
    }

    return primes;
  },

  //вычисление массива простых чисел длины n
  primesLength(n) {
    if (typeof n !== 'number') {
      return new Error('Аргумент должен быть числом');
    }

    let primesArr = [];

    for (let i = 0; primesArr.length < n; i++) {
      if (this.isPrime(i)) {
        primesArr.push(i);
      }
    }

    return primesArr;
  }

};


console.log(MathX.nthFibonacci(9)); // -> 21
console.log(MathX.fibonacci(10)); // -> [0, 1, 1, 2, 3, 5, 8]
console.log(MathX.isPrime(7)); // -> true
console.log(MathX.nthPrime(9)); // -> 23
console.log(MathX.primesUpTo(20)); // -> [2, 3, 5, 7, 11, 13, 17, 19]
