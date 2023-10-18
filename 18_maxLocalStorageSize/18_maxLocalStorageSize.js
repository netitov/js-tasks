//Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.


const valueElement = document.querySelector('.page__value');

function getMaxLocalStorageSize() {

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

  return totalSize;  //возвращаем максимальный размер localStorage в байтах
}


document.addEventListener('DOMContentLoaded', () => {

  const maxLocalStorageSize = Math.floor(getMaxLocalStorageSize() / 1024);

  valueElement.textContent = maxLocalStorageSize + ' KB';
  console.log('Максимальный размер localStorage:', maxLocalStorageSize);
});

