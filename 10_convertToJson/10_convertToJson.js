//Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

//JSON ведь и есть строка? Ниже реализация перевода js значения в JSON строку (аналог JSON.stringify)


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
      const newValue = currentValue !== null ? convertToJson(currentValue) : null;
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

const jsonObj = convertToJson(object);

console.log(jsonObj);
console.log(`Результат равен JSON.stringify: ${jsonObj === JSON.stringify(object)}`); // -> true

