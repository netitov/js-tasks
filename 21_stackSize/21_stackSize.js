//Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).


const valueElement = document.querySelector('.page__value');

let stackSize = 0;

function getStackSize() {
  try {
    stackSize++;
    getStackSize();
  } catch (error) {
    //перехватываем ошибку переполнения стека
    return stackSize;
  }
}

const stackLimit = getStackSize();
valueElement.textContent = stackSize;

console.log('Размер коллстэк:', stackSize);

//Chrome -> 12566
//Firefox -> 30570
//Opera -> 12553
//Safari -> 45633
