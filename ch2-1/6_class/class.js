class Human {
  constructor(type = 'human') { // 생성자 함수
    this.type = type;
  }
  
  static isHuman(human) {
    return human instanceof Human;
  }
  
  breathe() {
    alert('h-a-a-a-m');
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero); // true