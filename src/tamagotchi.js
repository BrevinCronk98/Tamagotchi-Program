export class Tamagotchi {
  constructor(name) {
    this.hunger = 20;
    this.potty = 0;
    this.health = 50;
    this.isAlive = true;
    this.age = 0;
    this.name = name;
    this.happy = 20;
  }

  decreaseHappy() {
    setInterval(() => {
      this.happy--;
      if (this.happy <= 0) {
        this.happy = 0;
        this.decreaseHealth(this.health / 2);
      }
    }, 5000);
  }

  increaseHappy() {
    this.happy += 10;
    if (this.happy >= 21) {
      this.happy = 20;
    }
  }

  increaseAge() {
    setInterval(() => {
      this.age++;
      if (this.age > 20) {
        this.isAlive = false;
      }
    }, 60000);
  }

  getAge() {
    if (this.age <= 2) return "Baby";
    else if (this.age > 2 && this.age <= 5) {
      return "Child";
    } else if (this.age > 5 && this.age <= 8) {
      return "Teen";
    } else if (this.age > 8 && this.age < 20) {
      return "Adult";
    } else return "Dead";
  }

  addHealth(num) {
    this.health += num;
    if (this.health >= 51) {
      this.health = 50;
    }
  }

  decreaseHealth(num) {
    this.health -= num;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }

  makeHungry() {
    setInterval(() => {
      this.hunger--;
      if (this.hunger <= 3 && this.hunger > 0) {
        this.decreaseHealth(5);
      } else if (this.hunger === 0) {
        this.decreaseHealth(50);
      } else if (this.hunger < 0) {
        this.hunger = 0;
      }
    }, 7000);
  }

  giveFood() {
    if (this.hunger <= 16 && this.isAlive) {
      this.hunger += 4;
    } else if (this.isAlive) {
      this.hunger = 20;
    }
  }

  giveMedicine() {
    this.addHealth(30);
  }

  useToilet() {
    this.potty = 0;
    this.addHealth(15);
  }

  pottyIncrease() {
    setInterval(() => {
      this.potty++;
      if (this.potty === 25) {
        this.haveAccident();
      }
    }, 4000);
  }

  haveAccident() {
    this.potty = 0;
    this.decreaseHealth(this.health / 2);
  }
}
