//Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

//JSON ведь и есть строка? Ниже реализация перевода js значения в JSON строку (аналог JSON.stringify)


function addObjToArr(obj, newArr) {

  //проходим по ключам объекта
  Object.keys(obj).forEach((i) => {
    const currentValue = obj[i];

    //исключаем свойства со значенением undefined (по аналогии с JSON.stringify)
    if (currentValue !== undefined) {

      let newValue;

      //если значение ключа =  массив, запускаем рекурсивно функцию convertToJson для каждого элемента массива
      if (Array.isArray(currentValue)) {
        newValue = `[${currentValue.map((i) => {
          const convertedEl = convertToJson(i);

          return convertedEl;
        })}]`;

      //если значение ключа =  объект, запускаем рекурсивно функцию convertToJson для ключа
      } else if (typeof currentValue === 'object') {
        newValue = convertToJson(currentValue);
      } else {
        //если тип данные строка - используем двойные ковычки
        newValue = typeof currentValue === 'string' ? `"${currentValue}"` : currentValue;
      }

      //добавляем строку ключ-значение в массив
      newArr.push(`"${i}":${newValue}`);
    }
  })
}

function convertToJson(obj) {
  if (obj === undefined || typeof obj === 'function') {
    return;
  }

  //если аргумент =  массив, запускаем convertToJson для всех элементов массива
  if (Array.isArray(obj)) {
    const newArr = obj.map(item => convertToJson(item));
    return `[${newArr.join(',')}]`;
  }

  //если аргумент строка, возвращаем возвращаем строку в двойных ковычках
  if (typeof obj === 'string') {
    return `"${obj}"`;

    //если аргумент не объект и не null, возвращаем результат без ковычек
  } else if (typeof obj !== 'object' || obj === null) {
    return `${obj}`;
  }

  //если аргумент объект, проходим по ключам объекта
  const newArr = [];
  Object.keys(obj).forEach(key => {
    const currentValue = obj[key];
    if (currentValue !== undefined) {
      const newValue = currentValue !== null ? convertToJson(currentValue) : 'null';
      newArr.push(`"${key}":${newValue}`);
    }
  });

  return `{${newArr.join(',')}}`;
}

const object = {
  product: 'test',
  title: undefined,
  amount: null,
  amountAll: 3,
  sold: false,
  array: ['test', 'test1'],
  properties: {
    size: 'small',
    color: ['black', { props: 2 }]
  }
};

const array = [
  {
    product: 'test',
    amount: 2,
    properties: [1, 2, 3]
  },
  {
    product: 'test2',
    amount: 3,
    properties: [10, 20, 30]
  }
];

const jsonObj = convertToJson();

console.log(jsonObj);
console.log(`Результат равен JSON.stringify: ${jsonObj === JSON.stringify(object)}`); // -> true

