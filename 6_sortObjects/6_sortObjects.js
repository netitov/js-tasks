// .Задача о сортировке объектов:
//у вас есть массив объектов вида { name: 'John', age: 25 }.
//Напишите код, который сортирует этот массив по возрастанию возраста
//а при равных возрастах сортирует по алфавиту по полю name


function sortObects(array) {

  if (!Array.isArray(array)) {
    return new Error('Аргументом должен быть массив');
  }

  return array.sort((a, b) => {
    //если возраст отличается, сортируем по возрасту
    if (a.age !== b.age) {
      return a.age - b.age;
    }

    //иначе сортируем по имени
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });
}

const users = [
  { name: 'John', age: 25 },
  { name: 'Bob', age: 20 },
  { name: 'Jack', age: 25 },
  { name: 'ann', age: 25 },
  { name: 'Frank', age: 10 }
];

console.log(sortObects(users));
