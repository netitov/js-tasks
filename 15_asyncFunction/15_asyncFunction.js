//Задача на асинхронность: напишите асинхронную функцию,
//которая использует ключевое слово await для ожидания выполнения
//других асинхронных операций, и возвращает результат выполнения.


import fetch from 'node-fetch';

async function fetchData(url) {
  try {
    //делаем api запрос
    const response = await fetch(url);

    if (response.ok) {
      //парсим результат, если запрос успешен
      const result = await response.json();

      //возвращаем результат
      return result;
    } else {
      //выбрасываем ошибку, если запрос не успешен
      throw new Error('Возникла ошибка при запросе');
    }
  } catch (err) {
    return err;
  }
}

//вызываем функцию и обрабатываем результат
async function getApiData(url) {
  try {
    const data = await fetchData(url);
    //дожидаемся выполнения fetchData и выводим результат в консоль
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getApiData('https://jsonplaceholder.typicode.com/todos/1'); // -> { userId: 1, id: 1, title: 'delectus aut autem', completed: false }


