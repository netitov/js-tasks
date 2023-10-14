//Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.


const valueElement = document.querySelector('.page__value');

function getMaxLocalStorageSize(testData) {
  //браузерный лимит для localStorage - до 10мб
  const browserLimitMB = 10;
  const browserLimitBytes = browserLimitMB * 1024 * 1024;

  let totalDataSizeBytes = 0;
  let iteration = 0;

  //запускаем цикл записанный объем данных не привышает ограничение
  while (totalDataSizeBytes <= browserLimitBytes) {
    //генерируем уникальный ключ для каждой итерации
    const testKey = `testData_${iteration}`;
    const jsonData = JSON.stringify(testData);

    try {
      //записать данные в localStorage
      localStorage.setItem(testKey, jsonData);
      //обновляем текущий размер записанных данных
      totalDataSizeBytes += jsonData.length;
      iteration++;
    } catch {
      //если превышен лимит localStorage, выходим из цикла
      break;
    }
  }

  //очищаем localStorage
  localStorage.clear();

  //переводим размер данных в KB
  const totalDataSizeKB = totalDataSizeBytes / 1024;

  return totalDataSizeKB;
}


document.addEventListener('DOMContentLoaded', () => {
  const testData = {
    product: 'Test product',
    amount: 3,
    porperties: [1, 2, 3, 4, 5],
    price: [1, 2, 3, 4, 5, 6, 7, 8],
    colors: ['black', 'white'],
  };

  const maxLocalStorageUsageKB = Math.round(getMaxLocalStorageSize(testData));

  valueElement.textContent = maxLocalStorageUsageKB + ' KB';
  console.log(`Максимальный объем localStorage: ${maxLocalStorageUsageKB} KB`);
});

