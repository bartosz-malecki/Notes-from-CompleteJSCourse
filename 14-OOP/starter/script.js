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
// Funkcja konstruktora:
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
*/

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
