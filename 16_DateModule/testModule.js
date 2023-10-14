import { formatDate, addDate } from './16_DateModule.js';

console.log(formatDate(new Date(), 'YYYY/MM/DD')); // --> текущая дата в формате YYYY/MM/DD
console.log(addDate(new Date(), 2, 'months')); // --> текущая дата + 2 мес
