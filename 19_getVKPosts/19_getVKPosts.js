//Реализовать виджет, отображающий список постов из любого паблика в VK
//(подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK.
//Виджет должен иметь фиксированные размеры и возможность прокрутки.
//При прокрутке содержимого виджета до конца должны подгружаться новые посты.
//Необходимо реализовать возможность кэширования уже загруженных данных:
//если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать
//все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).

//При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.


const token = 'e448b77ce448b77ce448b77c98e75d424dee448e448b77c8162c2efa50ad700b00ee00a';
const spinnerElement = document.querySelector('.page__spinner');
const containerElement = document.querySelector('.page__posts');
const inputElement = document.querySelector('.page__input');
const formElement = document.querySelector('.page__form');
const errorElement = document.querySelector('.error');
const closeBtn = document.querySelector('.error__close-btn');

//с какого по счету поста делаем запросы
let offset = 0;

//кол-во постов в запросе
let count = 5;

let maxStorageSize;
const groupStorage = JSON.parse(localStorage.getItem('group'));
let groupName = !groupStorage  ? 'liverpoolfc' : groupStorage.response[0].screen_name;
let newGroupName = '';


async function fetchPosts(groupName) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;

    //определяем функцию обратного вызова
    window[callbackName] = (data) => {
      //проверяем наличие скрипта и удаляем его
      const script = document.querySelector(`script[data-callback="${callbackName}"]`);
      if (script) {
        script.parentElement.removeChild(script);
      }

      //удаляме предыдущие скрипты
      if (window[callbackName]) {
        delete window[callbackName];
      }

      //проверяем наличие ошибки в ответе
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data?.response?.items);
      }
    };

    //создаем скрипт для запроса
    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/wall.get?domain=${groupName}&count=${count}&offset=${offset}&v=5.131&callback=${callbackName}&access_token=${token}`;
    script.setAttribute('data-callback', callbackName);
    document.body.appendChild(script);
  });
}

async function fetchGroupData(groupName) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;

    //определяем функцию обратного вызова
    window[callbackName] = (data) => {
      //проверяем наличие скрипта и удаляем его
      const script = document.querySelector(`script[data-callback="${callbackName}"]`);
      if (script) {
        script.parentElement.removeChild(script);
      }

      //удаляме предыдущие скрипты
      if (window[callbackName]) {
        delete window[callbackName];
      }

      //проверяем наличие ошибки в ответе
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data);
      }
    };

    //создаем скрипт для запроса
    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/groups.getById?group_id=${groupName}&v=5.131&callback=${callbackName}&access_token=${token}`;
    script.setAttribute('data-callback', callbackName);
    document.body.appendChild(script);
  });
}

//генерируем данные для нового поста
function generatePost(post) {
  const postElement = getTemplate('#post');

  let postDate = postElement.querySelector('.post__date');
  let postText = postElement.querySelector('.post__text');
  let postImg = postElement.querySelector('.post__img');
  let likeAmount = postElement.querySelector('.post__like-amount');
  let commentAmount = postElement.querySelector('.post__comment-amount');
  let repostAmount = postElement.querySelector('.post__repost-amount');
  let viewAmount = postElement.querySelector('.post__view-amount');

  const date = new Date(post.date * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedYear = year < 10 ? `0${year}` : year;

  const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

  postDate.textContent = formattedDate;
  postText.textContent = post.text;
  const photoData = post.attachments[0].photo.sizes;
  postImg.src = photoData[photoData.length - 1].url;
  likeAmount.textContent = post?.likes?.count || 0;
  commentAmount.textContent = post?.comments?.count || 0;
  repostAmount.textContent = post?.reposts?.count || 0;
  viewAmount.textContent = post?.views?.count || 0;

  return postElement;
}

function getTemplate(template) {
  const cardElement = document
    .querySelector(template)
    .content
    .cloneNode(true);
  return cardElement;
}

async function renderGroup(groupName) {

  let groupData;

  const groupStorage = JSON.parse(localStorage.getItem('group'));

  //проверяем, сохранены ли данные в localStorage. Если да используем их
  if (groupStorage?.response[0]?.screen_name === groupName) {
    groupData = groupStorage;
  } else {
    try {
      //иначе вызываем функцию получения данных группы через API
      groupData = await fetchGroupData(groupName);
    } catch (error) {
      return error;
    }
  }

  //отрисовываем данные группы
  if (groupData?.response.length > 0) {

    localStorage.setItem('group', JSON.stringify(groupData));

    let imgElement = document.querySelector('.group__img');
    let titleElement = document.querySelector('.group__title');

    imgElement.src = groupData.response[0].photo_200;
    titleElement.textContent = groupData.response[0].name;
  }

  return groupData
}

//рендер полученных постов
async function renderPosts(groupName) {

  if (groupName !== '') {

    let posts;
    const postsStorage = JSON.parse(localStorage.getItem('posts'));

    //если данные сохранены в localStorage - используем их
    if (postsStorage?.length >= (offset + count)) {
      posts = postsStorage.slice(offset, offset + count);
    } else {
      try {
        posts = await fetchPosts(groupName);
        updateLocalStorage(postsStorage, posts);
      } catch (error) {
        console.error(error);
      }
    }

    //отрисовываем посты
    if (posts.length > 0) {

      //обновляем номер поста, начиная с которого будем загружать новые данные
      offset += posts.length;

      //ренедрим посты, фильтруя только те, где есть фото
      posts.filter(el => el.attachments[0]?.photo).forEach((i) => {
        const newPost = generatePost(i);
        containerElement.append(newPost);
      })
    }
  }
  dataIsLoading = false;
}

function updateLocalStorage(postsStorage, posts) {
  if (postsStorage) {

    let currentStorage = postsStorage;
    const currentStorageSize = JSON.stringify(postsStorage) * 2;

    //удалить первые 10 записей, если хранилище заполнено более чем на 95%
    if (currentStorageSize > (maxStorageSize * 0.95)) {
      currentStorage = postsStorage.slice(10);
    }

    //добавить новые записи в хранилище
    localStorage.setItem('posts', JSON.stringify([...currentStorage, ...posts]));

  } else {
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

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

//получить мах размер localstorage
function getMaxLocalStorageSize() {

  //размер текущих данных
  const initialSize = JSON.stringify(localStorage).length;

  const testData = 'a'.repeat(1024);
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

let dataIsLoading = false;

//функция обновления постов при скролле
function updatePosts() {

  const lastPost = document.querySelector('.post:last-child');

  if (!dataIsLoading && lastPost.scrollHeight + window.scrollY  >  lastPost.offsetTop) {
    dataIsLoading = true;

    renderPosts(groupName);
  }
}

const updatePostsTrottled = throttle(updatePosts, 300);

//добавление постов при скролле
document.addEventListener('scroll', () => {
  updatePostsTrottled();
})

//добавление группы и первых постов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {

  //получаем данные по размеру localstorage
  maxStorageSize = getMaxLocalStorageSize();

  renderGroup(groupName);
  renderPosts(groupName);
});

//обработка ввода новой группы в input
inputElement.addEventListener('input', (e) => newGroupName = e.target.value);

//поиск постов по новой группе
formElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (newGroupName !== groupName) {
    const groupResponse = await renderGroup(newGroupName);

    if (groupResponse.error_code) {
      errorElement.classList.add('error_active');
    } else {
      const postElement = document.querySelectorAll('.post');

      //удаляем посты по предыдущей группе со страницы и храниоища
      Array.from(postElement).forEach((i) => {
        i.remove();
      })
      localStorage.removeItem('posts');

      groupName = newGroupName;
      offset = 0;

      renderPosts(newGroupName);
    }
  }
})


//close error popup
errorElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('error')) {
    errorElement.classList.remove('error_active');
  }
})

closeBtn.addEventListener('click', () => {
  errorElement.classList.remove('error_active');
})

