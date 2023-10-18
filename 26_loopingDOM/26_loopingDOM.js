//Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM,
//начиная с указанного элемента, и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).


const allNodes = [];

function loopingDOM(node) {

  console.log(node.tagName);
  allNodes.push(node);

  //обходим в цикле все дочерние узлы
  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];

    //запускаем рекурсивно функцию для дочерних узлов
    loopingDOM(childNode);
  }
}

loopingDOM(document);
console.log(allNodes);
