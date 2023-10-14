//Разработайте функцию преобразования JSON в связный список.
//На входе функция должна получать JSON, содержащий список объектов,
//на выходе объект, представляющий из себя односвязный список.


//создание узла списка
function createNode(value) {
  return { value, next: null }; // Создаем новый узел с переданным значением и указателем на следующий узел (изначально null)
};

//добавление узла в список
function addToTail(list, value) {
  const newNode = createNode(value);
  //если список пустой, новый узел становится головой списка
  if (!list.head) {
    list.head = newNode;
    return;
  }

  let current = list.head;
  while (current.next) {
    current = current.next;
  }

  //добавляем новый узел в конец списка
  current.next = newNode;
};

//создание связанного списка из JSON
function jsonToLinkedList(json) {
  //try/catch - для проверки ошибок парсинга JSON
  try {
    const jsonData = JSON.parse(json);
    const linkedList = { head: null };

    //добавляем каждый объект из JSON в список
    if (Array.isArray(jsonData)) {
      jsonData.forEach(item => {
        addToTail(linkedList, item);
    });
    } else {
      addToTail(linkedList, jsonData);
    }

    return linkedList.head;

    //обработка ошибки парсинга
  } catch (error) {
    return new Error('Некорректный формат данных JSON');
  }
};

//имитируем JSON
const jsonData = JSON.stringify([
  { product: 'product1', amount: 2333 },
  { product: 'product2', amount: 1000 },
  { product: 'product3', amount: 500 },
]);

const linkedList = jsonToLinkedList(jsonData);

console.log(linkedList); // -> { value: { product: 'product1', amount: 2333 } ...}
