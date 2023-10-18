//Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

//Требования:
//данные должны загружаться при загрузке страницы
//необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
//необходимо реализовать клиентскую пагинацию (50 элементов на странице)


let allTableData = [];
let activeTableData = [];
let rowsPerPage = 50;
let currentPage = 1;
let pagesAmount = 0;

const nextBtn = document.querySelector('.paginator__btn-next');
const prevBtn = document.querySelector('.paginator__btn-prev');
const input = document.querySelector('.paginator__number');
const pagesLengthElement = document.querySelector('.page__pagiantor-length');
const container = document.querySelector('.table__body');
const tableHeaders = document.querySelectorAll('.table__header');


//получение данных таблицы через API
async function fetchData() {
  try {
    const response = await fetch(`http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true`);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Возникла ошибка при запросе');
    }
  } catch (err) {
    return { err };
  }
}

async function renderTable() {
  //получаем данные таблицы
  const data = await fetchData();

  if (data.err) {
    console.log(data.err)
  } else {
    allTableData = data;
    //получаем первые 50 записей
    const tableSlice = data.slice(0, rowsPerPage);

    //отрисовываем первые 5- записей
    tableSlice.forEach((i, index) => {
      const tableRow = generateTableData(i, index + 1);
      container.append(tableRow);
    })

    pagesAmount = Math.ceil(allTableData.length / rowsPerPage);
    pagesLengthElement.textContent = 'of ' + pagesAmount;
    activeTableData = tableSlice;
  }
}

function fillTable(rowElement, data, index) {
  let number = rowElement.querySelector('.table__data-number');
  let fname = rowElement.querySelector('.table__data-fname');
  let lname = rowElement.querySelector('.table__data-lname');
  let tel = rowElement.querySelector('.table__data-tel');
  let address = rowElement.querySelector('.table__data-address');
  let city = rowElement.querySelector('.table__data-city');
  let state = rowElement.querySelector('.table__data-state');
  let zip = rowElement.querySelector('.table__data-zip');

  number.textContent = index;
  fname.textContent = data.fname;
  lname.textContent = data.lname
  tel.textContent = data.tel;
  address.textContent = data.address;
  city.textContent = data.city;
  state.textContent = data.state;
  zip.textContent = data.zip;
}

//генерируем данные для нового адреса
function generateTableData(data, index) {
  const rowElement = getTemplate('#table-row');
  fillTable(rowElement, data, index);

  return rowElement;
}

function getTemplate(template) {
  const cardElement = document
    .querySelector(template)
    .content
    .cloneNode(true);
  return cardElement;
}

//функция переключения страниц
function switchPage(direction, newValue) {
  let nextPage;

  if (direction === 'next' && currentPage < pagesAmount) {
    nextPage = !newValue ? currentPage + 1 : newValue;
  } else if (direction === 'prev' && currentPage > 1) {
    nextPage = !newValue ? currentPage - 1 : newValue;
  } else {
    //если достигнуты крайние страницы, выходим из функции
    return;
  }

  //начальный элемент следующей страницы
  const nextPageStart = (nextPage - 1) * rowsPerPage;
  const nextPageEnd = nextPageStart + rowsPerPage;
  //массив для следующей страницы
  const tableSlice = allTableData.slice(nextPageStart, nextPageEnd);

  const tableRows = document.querySelectorAll('.table__row');

  //заполнение данных таблицы
  tableSlice.forEach((data, index) => {
    if (tableRows[index]) {
      fillTable(tableRows[index], data, index + 1 + nextPageStart);
    }
  });

  //удаление лишних строк, если на последний странице осталось менее rowsPerPage
  if (nextPageEnd > allTableData.length) {
    for (let i = (allTableData.length % rowsPerPage); i < rowsPerPage; i++) {
      tableRows[i].remove();
    }
  } else if (Array.from(tableRows).length < rowsPerPage) {
    //возвращаем удаленные строки: если на тек странице строк меньше, чем на следующей (для перехода с последней страницы)
    for (let i = Array.from(tableRows).length; i < rowsPerPage; i++) {
      const row = generateTableData(tableSlice[i], i + 1 + nextPageStart);
      container.append(row);
    }
  }

  //аткуализируем текущий номер страницы
  currentPage = nextPage;
  input.value = currentPage;
  activeTableData = tableSlice;

  //переключаем активность кнопок если достигли max/min
  if (currentPage === 1) {
    prevBtn.classList.add('paginator__btn_inactive');
  } else {
    prevBtn.classList.remove('paginator__btn_inactive');
  }

  if (currentPage === pagesAmount) {
    nextBtn.classList.add('paginator__btn_inactive');
  } else {
    nextBtn.classList.remove('paginator__btn_inactive');
  }

  //убираем все классы связанные с сортировкой для всех заголовков
  tableHeaders.forEach(h => h.classList.remove('asc', 'desc'));
}


//переключить на следующую страницу
nextBtn.addEventListener('click', () => {
  switchPage('next');
});

//переключить на предыдущую страницу
prevBtn.addEventListener('click', () => {
  switchPage('prev');
});

//обработка переключения через ввод в input
input.addEventListener('change', () => {
  let newPage = parseInt(input.value, 10);

  //если новое значение равно текущей странице, выходим их функции
  if (newPage === currentPage) {
    return;
  }

  //если новое значение меньше 1, возвращаем минимальную страницу - 1
  if (newPage < 1) {
    newPage = 1;
    input.value = 1;
  }

  //если новое значение больше кол-ва страницу, возвращаем последнюю страницу
  if (newPage > pagesAmount) {
    newPage = pagesAmount;
    input.value = pagesAmount;
  }

  //если новое значение больше текущего, запускаем функцию с параметром увеличения
  if (newPage > currentPage) {
    switchPage('next', newPage);
  }

  //если новое значение меньше текущего, запускаем функцию с параметром уменьшения
  if (newPage < currentPage) {
    switchPage('prev', newPage);
  }
});

const sortInfo = {};

//сравнение значений для сортировки
function compareByField(field, order) {
  return function(a, b) {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  };
}

//сортировка по клику по шапке таблицы
tableHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const fieldName = header.textContent;
    if (fieldName === '#') return;

    //если сортировка не преминена к полю, сортируем по возрастанию
    if (!sortInfo[fieldName]) {
      sortInfo[fieldName] = 'asc';
    } else {
      sortInfo[fieldName] = sortInfo[fieldName] === 'asc' ? 'desc' : 'asc';
    }

    //убираем все классы связанные с сортировкой для всех заголовков
    tableHeaders.forEach(h => h.classList.remove('asc', 'desc'));

    //устанавливаем класс для текущего заголовка
    header.classList.add(sortInfo[fieldName]);

    //сортируем массив данных
    const sortedArr = activeTableData.sort(compareByField(fieldName, sortInfo[fieldName]));

    const tableRows = document.querySelectorAll('.table__row');

    //запоняем данные таблицы
    sortedArr.forEach((data, index) => {
      if (tableRows[index]) {
        fillTable(tableRows[index], data, index + 1);
      }
    });
  });
});

renderTable();
