//Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи.
//При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер 	хранилища.


const takenValueElement = document.querySelector('.page__value-taken');
const totalValueElement = document.querySelector('.page__value-total');


function getLocalStorageSize() {

  //размер текущих данных
  const initialSize = JSON.stringify(localStorage).length;

  //создаем строку из 1024 символов 'a'
  const testData = 'a'.repeat(2024);
  let totalSize = initialSize;

  try {
    while (true) {
      const key = `testKey_${totalSize}`;
      localStorage.setItem(key, testData);
      totalSize += testData.length;
    }
  } catch (e) {

    //очищаем тестовые данные из localStorage
    for (let i = initialSize; i < totalSize; i += testData.length) {
      const key = `testKey_${i}`;
      localStorage.removeItem(key);
    }
  }

  return { totalSize, initialSize };
}


document.addEventListener('DOMContentLoaded', () => {

  const { totalSize, initialSize } = getLocalStorageSize();

  const currentLocalStorageSize = Math.floor(initialSize / 1024);
  const maxLocalStorageSize = Math.floor(totalSize / 1024);

  takenValueElement.textContent = currentLocalStorageSize + ' KB';
  totalValueElement.textContent = maxLocalStorageSize + ' KB';

  console.log('Объем занятой памяти local storage:', currentLocalStorageSize);
  console.log('Максимальный размер localStorage:', maxLocalStorageSize);
});
