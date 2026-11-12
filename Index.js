// Задание 1. Базовый пример с fetch
async function fetchPosts() {
  try {
    // await приостанавливает функцию, пока не придёт ответ сервера
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const posts = await response.json();

    console.log(posts.slice(0, 5));
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}


// Задание 2. Две асинхронные функции в цепочке

// Первая функция: получает список пользователей и возвращает его
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return await response.json();
}

// Вторая функция: берёт первого пользователя из списка
async function fetchUserDetails() {
  try {
    const users = await fetchUsers();
    const user = users[0];
    console.log('User details:', user);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}


// Задание 3. Обработка ошибок

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Создаём ошибку, если сервер ответил статусом не из диапазона 200–299.
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // После обработки ошибки функция возвращает undefined.
    console.error('Fetch error:', error);
  }
}

async function main() {
  const users = await fetchData('https://jsonplaceholder.typicode.com/users');

  // Выводим данные только в случае успешной загрузки.
  if (users) {
    console.log(users);
  }
}


// Задание 4. «Синтаксический сахар»

// Вариант с async/await и try/catch:
async function getData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


// Дополнительное задание. Promise.all

// Promise.all запускает запросы параллельно и ждёт все сразу.
// Если упадёт хотя бы один, управление перейдёт в catch.
async function fetchMultipleData() {
  try {
    const [posts, comments] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
    ]);
    console.log('Posts:', posts.slice(0, 3));      
    console.log('Comments:', comments.slice(0, 3)); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


// Запуск всех заданий по порядку
async function runAll() {
  await fetchPosts();
  await fetchUserDetails();
  await main();
  await getData();
  await fetchMultipleData();
}
runAll();