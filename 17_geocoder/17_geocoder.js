//Необходимо реализовать простое поле ввода адреса с функцией геокодинга:
//пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper),
//подбирается адрес. Найденные данные должны отображаться в выпадающем списке,
//из которого можно выбрать подходящее значение.
//Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.


const apiKey = '44a18405-acd9-4638-ad9e-0d4d165b6dc5'; // должен быть перенесет в proccess.env на backend. В таком виде оформлен для тест задания

const inputElement = document.querySelector('.page__input');
const spinnerElement = document.querySelector('.page__spinner');
const addressContainer = document.querySelector('.page__address-box');

let timeoutId;

//получение геокодинга через API Яндекс Геокодер
async function fetchData(address) {
  try {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${address}&format=json`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Возникла ошибка при запросе');
    }
  } catch (err) {
    return err;
  }
}

//рендер полученных адресов
async function renderAddresses(string) {
  //запускаем функцию, только если строка не пустая
  if (string.length > 0) {
    try {
      //вызываем функцию получения адресов через API
      const data = await fetchData(string);
      const addressArray = data?.response?.GeoObjectCollection?.featureMember;

      //рендерим адреса
      addressArray.forEach((i) => {
        const city = i?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components.find(el => el.kind === 'locality')?.name;
        const element = generateAddress(i.GeoObject.name, !city ? '' : city);
        addressContainer.append(element);
      });
    } catch (error) {
      console.error(error);
    } finally {
      //скрываем спиннер
      spinnerElement.classList.remove('page__spinner_active');
    }
  } else {
    spinnerElement.classList.remove('page__spinner_active');
  }
}

//генерируем данные для нового адреса
function generateAddress(addressData, cityData) {
  const addressElement = getTemplate('#address');
  const liElement = addressElement.querySelector('.page__address');
  let fullAddress = addressElement.querySelector('.page__address-value');
  let city = addressElement.querySelector('.page__address-city');

  fullAddress.textContent = addressData;
  city.textContent = cityData;

  const selectedAddress = `${addressData}${cityData && `, ${cityData}`}`;
  setEventListener(liElement, selectedAddress);

  return addressElement;
}

function getTemplate(template) {
  const cardElement = document
    .querySelector(template)
    .content
    .cloneNode(true);
  return cardElement;
}

//функция удаления адресов
function removeList() {
  const liElements = document.querySelectorAll('.page__address');
  liElements.forEach((li) => addressContainer.removeChild(li));
}

//добавляем слушателя клика по адресу
function setEventListener(element, address) {
  element.addEventListener('click', () => {
    //добавляем выбранный адрес в строку поиска
    inputElement.value = address;
    //удаляем все адреса
    removeList();
  });
}

//троттлинг - ограничиваем частоту вызова функции
function throttle(func, delay) {
  let lastExecutionTime = 0;  //время последнего выполнения функции
  let timeoutId;

  return function (...args) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecutionTime;  //время с момента последнего выполнения функции

    //если прошедшее время больше или равно задержке (delay),
    //вызываем функцию.
    if (elapsedTime >= delay) {
      func(...args);
      lastExecutionTime = currentTime;
    } else {
      //иначе отменяем предыдущий таймаут
      clearTimeout(timeoutId);
      //устанавливаем новый таймаут для вызова функции
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecutionTime = Date.now();
      }, delay - elapsedTime);
    }
  };
}


const renderAddressesThrottled = throttle(renderAddresses, 100);

//обработка изменения адреса
inputElement.addEventListener('input', (e) => {
  //удаляем предыдущий список адресов
  removeList();
  //запускаем спиннер
  spinnerElement.classList.add('page__spinner_active');
  //сбрасываем таймер, чтобы предотвратить предыдущий запланированный вызов
  clearTimeout(timeoutId);
  //устанавливаем новый таймер
  timeoutId = setTimeout(() => renderAddressesThrottled(e.target.value), 300);
});
