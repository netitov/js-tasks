//создайте базовый класс Shape (фигура),
//который имеет методы для расчета площади и периметра. Затем создайте подклассы,
//представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
//Реализуйте методы расчета площади и периметра для каждой фигуры.


//создаем Shape и вывод данных в консоль, чтобы подклассы наследовали какую-то функциональность
class Shape {
  constructor() {
    this.area = 0;
    this.perimeter = 0;
    this.type = 'Shape';
  }

  getArea() {
    console.log(`Площадь ${this.type}: ${Math.round(this.area)}`);
    return Math.round(this.area);
  }

  getPerimeter() {
    console.log(`Периметр ${this.type}: ${Math.round(this.perimeter)}`);
    return Math.round(this.perimeter);
  }
}

//создаем подкласс, наследуя методы Shape
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.type = 'Rectangle';
    this.getArea();
    this.getPerimeter();
  }

  getArea() {
    this.area = this.width * this.height;
    super.getArea();
  }

  getPerimeter() {
    this.perimeter = 2 * (this.width + this.height);
    super.getPerimeter();
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
    this.type = 'Circle';
    this.getArea();
    this.getPerimeter();
  }

  getArea() {
    this.area = Math.PI * this.radius * this.radius;;
    super.getArea();
  }

  getPerimeter() {
    this.perimeter = 2 * Math.PI * this.radius;
    super.getPerimeter();
  }
}

class Triangle extends Shape {
  constructor(base, height, side1, side2, side3) {
    super();
    this.base = base;
    this.height = height;
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.type = 'Triangle';
    this.getArea();
    this.getPerimeter();
  }

  getArea() {
    this.area = (this.base * this.height) / 2;
    super.getArea();
  }

  getPerimeter() {
    this.perimeter = this.side1 + this.side2 + this.side3;
    super.getPerimeter();
  }
}


const rectangle = new Rectangle(6, 7);
const circle = new Circle(4);
const triangle = new Triangle(3, 4, 3, 4, 5);

