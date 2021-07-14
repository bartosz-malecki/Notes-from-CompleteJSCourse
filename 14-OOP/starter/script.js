'use strict';
/*
//////////////// Object-Oriented Programming (OOP)

// OOP to paradygmat (styl kodu, jak piszemy i organizujemy go) programowania oparty na koncepcji obiektów.
// Używamy obiektów do modelowania, wyrażania aspektów świata rzeczywistego takich jak uzytkownik czy lista zadań do wykonania, lub do bardziej abstrakcyjnych funkcji jak komponent HTML czy struktura danych.
// Obiekty mogą zawierać dane, które nazywamy właściwościami (properties) oraz kody - który nazywamy metodami. Używając obiektów, pakujemy wszystkie dane do odpowiednich zachowań w jeden duży blok. To sprawia, że działanie bezpośrednio na danych jest bardzo łatwe.
// W OOP obiekty są samodzielnymi fragmentami kodu lub blokami kodu, takimi jak samodzielne małe aplikacje.
// Używamy tych obiektów jako elementów składowych naszej aplikacji i sprawiamy, że obiekty wchodzą ze sobą w interakcje.
// Interakcje te odbywają się za pośrednictwem tzw interfejsu publicznego (API) który jest zbiorem metod do których można uzyskać dostęp poza obiektami i których używamy do komunikacji z obiektem.
// OOP wynaleziono w celu organizacji kodu, aby był bardziej elastyczny i łatwiejszy w utrzymaniu. Pomaga uniknąć tzw 'spaghetti code' czyli szalonego, nie uporządkowanego kodu (rozproszony kod w wielu funkcjach czy w global scope bez żadnej struktury).

//////////////                Classes
// Klasa to mniej więcej plan który może być używany do tworzenia nowych obiektów. Obiekty są tworzone w oparciu o zasady opisane w klasie.
// JS nie obsługuje prawdziwych klas, jest to taki pogląd myślowy. Zawiera ona opis danych, ale nie są to rzeczywiste dane.

// new User('jonas')

// Instancja jest prawdziwym obiektem, którego możemy użyć w kodzie, który został utworzony z klasy. Klasa sama w sobie nie jest obiektem. Mozemy użyć tej klasy do stworzenia tylu instancji ile nam potrzeba - obiekty te mogą zawierać różne dane, ale wszystkie mają tą samą funkcjonalność.

///// Istnieją 4 podstawowe zasady, które moga nas poprowadzić w dobrej implementacji/konstrukcji klasy:

////           Abstraction
// Abstrakcja czyli ukrywanie/ignorowanie szczegółów, które nie mają znaczenia. Pozwala nam uzyskać ogólną perspektywę tego, co wdrażamy, zamiast mieszać ze szczegółami które nie mają znaczenia dla naszej implementacji.
// Na przykładznie obiektu-telefonu, nie potrzeba nam znać danych typu temperatura, napięcie, czy ma wibracje i jak to wszystko działa. Wystarczy nam wiedziec, że ma wyswietlacz, klawisze i że się ładuje.
// Abstrakcji używamy także poza OOP np. eventListener nie wiemy co się dzieje za kulisami i nie musimy tego wiedzieć. Szczegóły niskiego poziomu dotyczące jak coś działa dokładnie, zostały ukryte. Jestesmy użytkownikami i niektóre funkcje możemy użyć bez zrozumienia i konieczności jej samodzielnego wdrażania.

////           Encapsulation
// Hermetyzacja oznacza zachowanie prywatności niktórych właściwości i metod wewnętrznej klasy tak, aby nie były dostępne z zewnątrz klasy. Niektóre metody mogą jednak zostać ujawnione jako API.
// Dzięki zamknęciu tych krytycznych właściwości w ten sposób zapobiegamy przypadkowemu manipulowaniu tym stanem wewnętrzym przez zewnętrzny kod.
// API to wszystkie metody, które nie są prywatne - nie są hermetyzowane.
// Gdyby niektóre metody były dostępne dla całego naszego kodu, wtedy zmiana implementacji metody może uszkodzić kod, który na niej polega. Pomaga to uniknąć błędów oraz kodu spaghetti. Dlatego istnieje hermetyzacja i prywatne metody i właściwości.
// Naszym celem zawsze powinno byc ładne ujęcie większości naszego stanu i metod pozostawiając jedynie podstawowe metody publiczne.

////           Inheritance
// Dziedziczenie udostępnia wszystkie właściwości i metody określonej klasy nadrzędnej, klasie potomnej (jest bardziej specyficzna). Celem tego jest wykorzystanie logiki wspólnej dla obu klas, aby sie nie powtarzać. Klasa potomna posiada więc pewne metody i właściwości rodzica oraz pewne swoje własne.
// Np klasy User i Admin - Admin ma te same funkcje to User, ale ma też kilka dodatkowych opcji, czyli jest też użytkownikiem ale rozszerzonym.

////           Polymorphism
// Polimorfizm oznacza, że klasa potomna może nadpisać metodę odziedziczoną, czyli może być np bardziej złożona. Np admin potrzebował by 2składnikowego logowania a user 1.
// Nadpisywanie jest proste - piszemy nową metodę o tej samej nazwie.

////////////////                OOP in JS

// Obiekty są połączone z pewnym obiektem prototypowym. Mówimy, że każdy obiekt ma swój prototyp.
// Obiekt prototypowy zawiera metody i właściwości do których mają dostęp i mogą z nich korzystać, wszystkie obiekty połączone z tym prototypem. Takie zachowanie nazywamy - prototypowym dziedziczeniem (Prototypal inheritance). Czyli obiekty dziedziczą te właściwosci i metody.
// Wcześniej (w ogólnym rozrachunku) klasa dziedziczyła po innej klasie. Tutaj instancja dziedziczy po klasie!!
// Obiekty delegują zachowanie do połączonego obiektu prototypowego.
// 'Zachowanie' to inny termin określający metody!
// Oprucz dziedziczenia prototypów, nazywamy to również delegowaniem mechanizu. Prototypal inheritance/delegation.
//     Obcjets (Can access methods) ----->  Prototype (Contains methods)

////           Implementacja OOP w JS
// W JS istnieją 3 różne sposoby implementacji OOP: 1. Constructor functions, 2. ES6 Classes, 3. Obcject.create().

// 1. Funkcje konstruktorów są sposobem na programowe tworzenie obiektów przy użyciu funkcji, która również ustawi prototyp nowego obiektu. Tak są zaimplementowane obiekty wbudowane jak Arrays, Sets czy Maps.

// 2. ES6 Classes są nowoczesniejszym sposobem wykonywania OOP w JS. Nie są to jednak identyczne 'klasyczne klasy' jak wyżej. Są tzw 'syntactic sugar', czyli są poprostu warstwą abstrakcji nad funkcjami konstruktora (poprostu ładniejsza składnia, ale behind the scenes są implementowane z funkcjami konstruktora)

// 3. Object.create() to najszybszy i najprostrzy sposób na połączenie obiektu z obiektem prototypowym.
*/

/*
//                           Funkcja konstruktora:
// W OOP istnieje konwencja, że nazwy funkcji konstruktora zaczynają się z dużej litery! Dodatkowo zadziała deklaracja oraz wyrażenie funkcji. Arrow func nie działa przy konstruktorze (ponieważ nie zawiera this)!

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this!! aby dodać metody używa się prototypów i dziedziczenia
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const bartek = new Person('Bartek', 1990);
console.log(bartek);

// Różnica między zwykła funkcja a kontruktową jest taka, że wywołujemy ją z operatorem - new.
// Co się dzieje przez wywołanie z new? :
// 1. New {} is created - tworzy się nowy obiekt.
// 2. function is called, this = {}, this będzie wskazywac na ten nowy obiekt.
// 3. {} is linked to prototype.
// 4. function automatically return {}

// Podsumowując - wywołujemy funkcję konstruktora z oberatorem new, dlatego od razu jest tworzony nowy pusty obiekt. Następnie wywołuje się funkcja i this jest przypisane do pustego obiektu. Potem w funkcji ustawiamy nowe właściwości dla tego obiektu i dajemy im takie same nazwy jak parametry jakie przekazujemy funkcji. Na końcu funkcji this ma te dwie właściwości i obiekt jest automatycznie zwracany z funkcji.

const jonas = new Person('Jonas', 1985);
const jacob = new Person('Jacob', 2000);
console.log(jonas, jacob);

// Zatem według analogii, funkcja konstruktora jest planem domu, a obiekty to domy utworzone na jego podstawie i są one realne - w tym wypadku obiekt z rzeczywistymi danymi. bartek jonas i jacob są instancjami.
console.log(bartek instanceof Person);

////           Prototypes
// Każda funkcja w JS z automatu ma właściwośc zwaną prototypem, która obejmuje funkcję konstruktora. Każdy obiekt utworzony za pomoca konstruktora uzyskuje dostęp do wszystkich metod i właściwości, które zdefiniujemy we właściwościach prototypu konstruktora.

console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

bartek.calcAge();
// Możemy użyc tej metody na innym obiekcie, nawet jak nie znajduje sie on na tym samym obiekcie. Mamy do niej dostęp dzięki dziedziczeniu prototypów.
// Nie wrzucamy do obiektu tej metody bo wtedy tworzylibyśmy jej kopie i dołączali do każdego obiektu, a tak tworzymy tylko jedną kopię i wszystkie utworzone obiekty za pomocą funkcji konstruktora mają do niej dostęp.

// Prototypem bartka, jonasa i jacoba jest Person.prototype. Każdy obiekt ma specjalna właściwośc __proto__ (zostaje dodana w kroku 3cim).
console.log(bartek.__proto__); // prototyp bartka
console.log(bartek.__proto__ === Person.prototype); // potwierdzenie
console.log(Person.prototype.isPrototypeOf(bartek));

// Person.prototype nie jest prototypem Person, tylko jest tym, co będzie używane jako prototyp wszystkich obiektów stworzonych przez funk konstr. !!
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo sapiens';
console.log(bartek, jacob);
// Właściwość ta nie jest bezpośrednio w obiekcie, więc nie jest jego własnością. Własnymi właściwościami są tylko te, które są zdefiniowane bezpośrednio w samym obiekcie - nie uwzlgędniając odziedziczonych właściwości.
// Można to sprawdzić:
console.log(bartek.hasOwnProperty('firstName'));
console.log(bartek.hasOwnProperty('species'));

////           Prototype Chain i Inheritance
// Każdy obiekt ma swój prototyp, więc Person.prototype też musi mieć i jest nim Object.prototype. Powstaje on gdy tylko tworzymy nowy obiekt. {...} = new Object(...).
// Cała seria takich powiązań obiektów nazywa się Prototype Chain (coś jak scope chain), a Object.prototype jest zwykle na szczycie łańcucha, co oznacza, że jego prototyp jest pusty - zatem jego __proto__: null (oznacza koniec łancucha protorypów).
// Ilekroć JS próbuje znaleźć określoną właściwośc lub metodę w określonym obiekcjie, będzie szukał nastęonego prototypu w łańcuchu, czy może go tam znaleźć.

console.log(bartek.__proto__);
// Object.prototype (top of prototype chain)
console.log(bartek.__proto__.__proto__);
console.log(bartek.__proto__.__proto__.__proto__);

const arr = [1, 2, 3, 4, 5, 6, 78, 8, 1, 2, 3]; // new Array === []
console.log(arr.__proto__); // znajdują się tu wszystkie metody.
// Własnośc .prototype będzie prototypem wszystkich obiektów utworzonych przez tego konstruktora.
console.log(arr.__proto__ === Array.prototype);

// Każda tablica nie zawiera tych metod, zamiast tego każda tablica dziedziczy je po swoim prototypie.
// Za każdym razem gdy tworzymy tablice jak ta arr, jest ona tworzona przez konstruktor Array

// Dziedziczenie prototypów to tak naprawde mechanizm ponownego wykorzystania kodu - wszystkie te metody muszą istnieć tylko raz, gdzieś w silniku JS, a następnie wszystkie tablice w kodzie otrzymują dostęp do nich poprzez dziedziczenie i łańcuch prototypów.

// Chcemy metodę co zwróci unikalne elementy tablicy.
Array.prototype.unique = function () {
  return [...new Set(this)]; // this będzie tablica na której ta metoda się wykona.
};
console.log(arr.unique());
// Tego przykładu w praktyce lepiej nie robić - rozszerzenie prototypu wbudowanego obiektu tak jak tu.
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

bmw.brake();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();
*/
/*
//                           ES6 Classes

// Classes w JS są takim upiękrzeniem funkcji konstruktora. Nadal wrażają prototypy za kulisami, ale ze składnią która ma większy sens dla programistów innych języków.

// class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hej ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // ustawienie właściwości która już istnieje
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // taka konwencja żeby unknąć konfliktu tej samej nazwy zmiennej
    else alert(`${name} is not a full name`);
  }
  // nie możemy podać pełnego imienia bo _firstName nieistnieje, więc musimy zwrócić
  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log(`Hey there`);
  }
}
const jessica = new PersonCl('Jessica Davies', 1996);
console.log(jessica);
jessica.calcAge();
PersonCl.hey();
console.log(jessica.age); // jak widać getter jest taki sam jak zwykła metoda którą ustawiliśmy w prototypie.

console.log(jessica.__proto__ === PersonCl.prototype);

// Działa tak samo jak każdy inny konstruktor funkcji, z tym, że wygląda ładniej. Dzięki tej składni nie musimy ręcznie modyfikować właściwości prototypu. Wystarczy napisać metodę wewnątrz klasy, ale poza konstruktorem.

// Oczywiście ręcznie też możemy dodawać, też zadziała:

// PersonCl.prototype.greet = function () {
//   console.log(`Hej ${this.firstName}`);
// };
jessica.greet();

const walter = new PersonCl('Walter White', 1965);
// 1. Klasy nie są podnoszone (not hoisted). Deklaracje funkcji są podnoszone tzn., że można je użyć zanim zostaną zadeklarowane. W przypdakdu deklaracji klasy, to nie zadziała.

// 2. Classes are first-class citizens - znaczy, że możemy je przekazywać do funkcji, a także zwracać z funckji ponieważ, klasy to tak naprawdę specjalny rodzaj funkcji za kulisami.

// 3. Klasy są wykonywane w strict mode. Nawet jeżeli nie aktywowaliśmy strict mode, to cały kod w klasie zostanie wykonany w tym trybie ścisłym.

// Korzystanie z funkcji konstruktora czy classes to wybór osobisty wg preferencji. Klasy są bardziej spójne, cały kod znajduje sie w jednym bloku, a w konstruktorze funkcji troche jest bałagan i można sie pogubić.

////           Setters and Getters
// Każdy obiekt może mieć własności specjalne setter i getter. (Normalne są zwane własnościami danych.) Są to metody pobierające i ustawiające które są funkcjami i pobierają i ustawiają wartośc, ale na zewnatrzą wyglądają jak normalne właściwości.

const account = {
  owner: 'Jonas',
  movement: [200, 120, 300, 500, 69],

  get latest() {
    return this.movement.slice(-1).pop();
  },

  set latest(mov) {
    this.movement.push(mov);
  },
};
console.log(account.latest); // nie wywołujemy tego jako metody latest(), tylko piszemy tak jakby to była zwykła właściwość.
// przydatne gdy chcemy przeczytać cos jako właściwośc ale nadal trzeba wykonać jakieś obliczenia wcześniej.
// gdy mamy getter, letter nie jest wymagany jeśli chodzi o tą samą właściwość. Więc wystarczy jedno albo drugie.

account.latest = 666; // ustawiamy nową wartośc jak dla właściości a nie metody
console.log(account.movement);

// metody pobierające i ustawiające mogą byc przydatne do weryfikacji poprawności danych. (wyżej sprawdzenie czy jest pełne imie)

////           Static methods
// Metody statyczne nie są dostępne w instancjach i czasami są przydatne do zaimplementowania jakiejś funkcji pomocniczej dotyczącej klasy lub funkcji konstruktora. Są one dołączone do konstruktora, a nie do prototypów dlatego zadziała na Array.from(...) a nie zadziała na [1,2,3].from(...).
// A ponieważ, nie ma ich w prototypie, to inne obiekty tego nie dziedziczą.
*/

/*
//                           Object.create()

// Funkcja ta działa zupełnie inaczej niż funkcja konstruktora oraz ES6 Classes. Dalej istnieje idea dziedziczenia prototypów, jednak nie są w to zaangażowane żadne właściwości prototypu, ani funkcje konstruktora czy new operator.
// Możemy ręcznie ustawić prototyp obiektów na dowolny obiekt:
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  // wygląda jak funkcja konst. ale nią nie jest bo nie ma operatora new do wywołania jej.
};
// Tworzymy obiekt osoby z tym obiektem jako prototypem:
const steven = Object.create(PersonProto); // pusty obiekt powiązany z prototypem PersonProto.
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1972);
sarah.calcAge();

// Wniosek: Object.create() tworzy nowy obiekt, a prototypem jego będzie obiekt, który przekażemy.
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUS() {
    return `${this.make} going at ${this.speed / 1.6} mi/h`;
  }

  set speedUS(v) {
    this.speed = v * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);


///////////////////////////////////////
// Inheritance between "Classes": Construktor Function

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName; // DRY
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); // ustawiamy ręcznie this, by z tej funkcji this było faktycznie this z Person
  this.course = course;
};

// Linking prototypes
// Aby połączyć dwa prototypowe obiekty manulanie, uzywamy Object.create().

Student.prototype = Object.create(Person.prototype);

// Teraz obiekt prototypowy studenta, dziedziczy po obiekcie proto Person
// To połączenie trzeba utworzyć tutaj, zanim dodamy metody do studenta, ponieważ w tym momencie ten Obiekt.create() zwróci pusty obiekt. Jeżeli było by to po stworzeniu metody introduce, object.create() nadpisało by tą metodę.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
console.log(mike);

mike.calcAge();

// Prototype chain tutaj: szuka metody calcAge() w Obiekcie mike->Student.prototype->Person.prototype. Dalej jest Object.prototype->null.
// Dzięki dziedziczeniu jest możliwe wywołanie metody która jest własnością Person.prototype, na obiekcie Student i to zadziała.

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
console.log(mike);

// Musimy ustawic konstruktora na studenta, ponieważ JS myśli, że to person przez to, że ustawiamy własciwosc prototupu studenta za pomoca object.create() przez to konstruktor student.prototype jest dalej person.
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.acceleration = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `'${this.make}' going at ${this.speed} km/h, with a charge ${this.charge}`
  );
};
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new EV('Tesla', 120, 23);
tesla.brake();
tesla.acceleration();
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
<<<<<<< HEAD
tesla.acceleration();
tesla.acceleration();
tesla.acceleration();
tesla.acceleration();
=======
tesla.accelerate();
*/

///////////////////////////////////////
// Inheritance between "Classes": ES6

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hej ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`Hey there`);
  }
}

// Aby zaimplementować dziedziczenie w ES6 potrzbujemy słowa kluczowego extends oraz funkcji super (funkcja kontruktora klasy nadrzędnej, idea ta samo co w constuctor functions z tym, że wszystko dzieje sie automatycznie)
class StudentCL extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Musi się to wydarzyć na początku!!! Bo funkcja super odpowiada za utworzenie this w tej subklasie.
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear} years old, but I feel like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// Jeżeli nie potrzebujemy żadnych nowych właściwości, to nie musimy pisać tego constructora w klasie potomnej.
const martha = new StudentCL('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// Łańcuch prototypów został faktycznie utworzony automatycznie za pomocą słowa kluczowego extends.

///////////////////////////////////////
// Inheritance between "Classes": Object.create()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// Wszystko co tu robimy to łączenie ze sobą obiektów, gdzie niektóre służą innym jako prototypy.
>>>>>>> 090a38fc6807bfd38b3c3acab9e017bd5263ba9d

