//Реализовать функцию конвертации JSON в строку

//(аналог JSON.parse)


function parseJson(jsonString) {

  if (jsonString === '')  {
    return null;
  }

  //возвращаем число в формате number, если строка это число
  if (!isNaN(jsonString)) {
    return parseFloat(jsonString);
  }

  //запускаем функцию parseObject, если json содержит объект
  if (jsonString[0] === '{' && jsonString[jsonString.length - 1] === '}') {
    return parseObject(jsonString);
  }

  //запускаем функцию parseArray, если json содержит массив
  if (jsonString[0] === '[' && jsonString[jsonString.length - 1] === ']') {
    return parseArray(jsonString);
  }

  //возвращаем строку без двойных ковычек
  if (jsonString[0] === '"' && jsonString[jsonString.length - 1] === '"') {
    return jsonString.slice(1, jsonString.length - 1);
  }

}

function parseObject(jsonString) {
  const object = {};

  //удаляем скобки
  const content = jsonString.slice(1, jsonString.length - 1);

  const keyValuePairs = content.split(',');

  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split(':');
    //удаляем ковычки из ключа
    const cleanedKey = key.replace(/"/g, '');
    //записываем ключ и значение в объект
    object[cleanedKey] = parseJson(value);
  });

  return object;
}

function parseArray(jsonString) {
  const array = [];
  const content = jsonString.slice(1, jsonString.length - 1);

  const elements = content.split(',');

  elements.forEach(element => {
    array.push(parseJson(element));
  });

  return array;
}

const json = `{"product":"test","amount":3}`

const result = parseJson(json);
console.log(result); // -> { product: 'test', amount: 3 }


