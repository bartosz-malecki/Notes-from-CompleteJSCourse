"use strict";

////////////////////////////// Domyślne parametry
/*

const bookings = [];

const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  // ES5
  // numPassengers = numPassengers || 1
  // price = price || 199

  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2);

// Zadziała to tylko dla parametrów, które są zdefiniowane na liście przed nim. Jakby price było przed, to by nie zadziałało.
// Tak samo nie możemy pominąć liczby pasażerów, bo JS tego nie ogarnie. Liczba argumentów musi sie zgadzac. Można dać wtedy 'undefined' i ogarnie
*/

/*
//////////   Przekazywanie argumentów   Wartości vs referencje

const flight = 'LH234';
const bartosz = {
  name: 'Bartosz Małecki',
  passport: 213234123,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 213234123) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, bartosz);
// console.log(flight); // 'LH234"
// console.log(bartosz); // Mr. B.. M..

// przekazując prymitywa (typ wartościowy) to flightNum jest kopią flight a nie oryginalną wartością, czyli kompletnie inną wartością dlatego nie zostało to odzwierciedlone
// kiedy przekazujemy typ referencyjny do funkcji, to co jest kopiowane jest tylko referencją (odniesieniem) do obiektu w stercie pamięci, ale oba wskazuja na ten sam obiekt w pamięci.

// Is the same as doing..
// const flightNum = flight;
// const passenger = bartosz;

// Podsumowując, przekazując typ pierwotny(wartościowy) do funkcji, w rzeczywistości jest tworzeniem kopii poza funkcją - wartość jest tylko kopiowana, oryginał bez zmian. Natomiast przekazując obiekt to przypomina kopiowanie obiektu - jak zrobimy zmiany w kopii, zmieni się też oryginał

const newPassport = function (person) {
  person.passport = Math.floor(Math.random() * 10000000000000);
};

newPassport(bartosz); // Checked in
checkIn(flight, bartosz); // Wrong passport!

// Po zmianie nr passportu, zmienia sie tez w funkcji checkIn więc jest różny od starego

// Są dwa terminy które są używane w odniesieniu do funkcji - przekazywanie przez wartośc oraz przez referencję.
// JS nie ma przekazywania przez referencję, tylko przez wartość! Oryginalna wartość poza funkcją zostanie zmieniona i jest to nazwane przekazywaniem przez odniesienie, ale tego nie zrobił...samo odwołanie jest nadal wartością. To po prostu wartość która zawiera adres pamięci.
// Tak więc w zasadzie przekazujemy referencję do funkcji, ale nie przekazujemy przez referencję.
*/

/*
//////////////////  First-Class Functions & High-Order Functions

// JS traktuje funkcje jako pierwszymi obywatelami. W praktyce oznacza to, że są zwykłymi wartościami. Są po prostu kolejnym typem obiektów, a ponieważ obiekty są wartościami to funkcje również nimi są.
// Pozwala to nam wykorzystywać je na kilka sposobów jak przechowywanie ich w zmiennych lub właściwościach obiektów. Mozna przekazywać je do innych funkcji jak i zwracać je z funkcji.
// Skoro są obiektami to możemy korzystać z metod.

// Dzięki funkcjom pierwszej klasy mamy możliwość pisania i uzywania funkcji wyższego rzędu.

// Funkcje wyższego rzędu jest to funkcja która otrzymuje inną funkcję jako argument albo zwraca nową funkcję. 
// Funkcją wyższego rzędu jest np addEventListener, otrzymuje inną funkcję jako dane wejsciowe. 
// Zwykle mówimy, że przekazywana funkcja jest funkcją zwrotną tzw. Challback function. Dzieje się to z tego powodu bo callback func będzie wywołana potem przez HO func.

// Występuje zamieszanie pomiędzy FC a HO func, że obie te funkcje to to samo, a tak nie jest. FC func to tylko funkcja którą dany język programowania ma lub nie, czyli to tylko wartość. W praktyce więc nie ma żadnej FC func, jest to tylko koncepcja. W praktyce występują HO func które wykożystuja FC func.
*/

/*
///////////////////// Functions accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
}; // tworzy jeden wyraz z ciągu

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}; // duże litery w 1 słowie

// Funkcja wyższego rzędu
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`); // tutaj wywołujemy callback func a sa nazwane fn
  console.log(`Trasnformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', oneWord); // oneWord jest callback func
transformer('JavaScript is the best!', upperFirstWord); // upperFirstWord jest callback func
// Nazywamy je funkcjami zwrotnymi bo nie wywołujemy ich sami tylko wywołujemy JS aby powiedzieć im później żeby się wywołały.

// JS używa callbacks cały czas
const high5 = function () {
  // funkcja zwrotna która wywoła się gdy klikniemy w body
  console.log(`Hello`);
};
document.body.addEventListener('click', high5);

['bartek', 'tomek', 'maciek'].forEach(high5); // funkcja wywoła sie dla kazdego elementu z tablicy

// Funkcje zwrotne są bardzo przydatne bo ułatwiają dzielenie lub kodowanie na części, które można wielokrotnie wykorzystywać i połączyć. Czyli mamy podzielone wszystkie funkcje na ich własne zastosowanie.

// Pozwalają nam też tworzyc abstrakcje..
// ...abstrakcja to oznacza, że podkreslamy szczegóły niektórych implementacji kodu, choc tak na prawde nie dbamy o nie. A to pomaga nam mysleć o problemach na wyższym, bardziej abstrakcyjnym poziomie.

// Na przykładzie funkcję transformer nie obchodzi jak ten ciąg jest zmieniany, nie przejmuje się tym poziomem abstrakcji, to co chce zrobic to przekształcić ciąg, ale nie obchodzi jej jak to ma zrobić. Moglibysmy przenieśc kod z oneWord i upperFirstWord i wyszło by to samo. Stworzyliśmy więc nowy poziom abstrakcji. Wykonanie głównej funkcji transformatora dotyczy tylko przekształcenia ciągu wejściowego. Oddelegowuje go więc do innych funkcji nizszego poziomu.
// Funkcja transformer działa na wyższym poziomie abstrakcji, zostawiąjąc szczegóły funkcjom niższego poziomu.

// Sama funcja eventListenera nie miała by pojęcia co robic gdy zachodzi tu zdarzenie kliknięcia. Dlatego przekazujemy jej funkcję zwrotną aby powiedzieć jej co ma robić, więc jest ona na wyższym poziomie abstrakcji, a funkcja high5 na niższym.
*/
/*
/////////////////    Functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // ta wartośc to teraz function (name) {console.log(`${greeting} ${name}`);};
// Uzgodniona funkcja zwróciła nową funkcję zapisaną w zmiennej. Więc zmienna jest tylko funkcją którą można wywołać.
greeterHey('Jonas'); // skoro jest funkcją to możemy ją wywołać
greeterHey('Bartek');

greet('Hello')('bartek'); // skoro greet('Hello') jest funkcja to możemy ją od razu wywołać. Przekazujemy od razu argument ('bartek')

// Challenge przekonwertowac greet na arrowfunc
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Siema')('bartek');
*/
/*
/////////////// The call and apply methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function ()
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.airline} flight ${this.iataCode}${flightNum}`,
      name,
    });
  },
};
lufthansa.book(666, 'Bartek Małecki');
lufthansa.book(123, 'Jan Kowalski');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // kopiujemy funkcje book z obiektu lufthasna

// nie zadziała
// book(23, 'Sarah Williams'); // jest zwykłym wywołaniem funkcji, więc this pokazuje na undefined
// funkcja book nie jest tutaj już metodą z obiektu. Jest zwykłą funkcją, kopią ale juz nie tamtą metodą.

// Call method

// zadziała
book.call(eurowings, 123, 'Norah Jones'); // pierwszy argument jest dokładnie tym na co chcieliśmy wskazac this., a potem reszta.
// nie wywołaliśmy sami funkcji book. Zamiast tego wywołaliśmy metodę call która wywołała funkcje book ze słowem kluczowym this ustawionym na eurowings. Pozwala nam to ręcznie i jawnie ustawiać this dla dowolnej funkcji którą chcemy wywołać

book.call(lufthansa, 666, 'Maciek Tylutki'); // teraz this wskazuje obiekt lufthansa
console.log(lufthansa);

// Mimo, że kod funkcji book jest w obiekcie lufthansa, zrobilismy tak, że this wskazuje na inny obiekt

// możemy dodawać kolejne obiekty, ale trzeba pamiętać o zachowaniu tych samych nazw właściwości

// Apply method
// robi to samo co call, z tą różnicą, że nie otrzymuje listy argumentów po słowie this, tylko pobierze argumenty z tablicy i przekaże je do funkcji
const flightData = [583, 'Józek Pan'];
book.apply(eurowings, flightData);
console.log(eurowings);
// jednak nie jest używana we współczesnym JS bo mamy lepszy sposób na to samo..:
book.call(eurowings, ...flightData); // daje taki sam wynik

// Bind method
// Różni się od call tym, że nie wywołuje od razu funkcji, tylko zwraca nową w której this jest powiązane.
// book.call(eurowings, 123, 'Norah Jones');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(eurowings);
bookEW(123, 'Norah Jones');
// sprawia to, że w tym przykładzie łatwiej zarezerwować lot dla każdej z linii, jeśli chcemy to robić wiele razy. Nie musimy przepisywać wiele razy this, zamiast tego wywołujemy kolejne funkcje. Więc zamiast ciągle korzystać z call, możemy raz przypiąć się (bind, definiując this) i od tego momentu możemy używać tych funkcji

// możemy ustawić pewne argumenty już na początku. Np. przypisywanie do jednego lotu:
const bookEW23 = book.bind(eurowings, 23); // możemy dorzucić też imie..
bookEW23('Ala Kot');
bookEW23('Bolek Lech');

// takie wczesniejsze określenie części argumentu nazywamy 'częściowym zastosowaniem' (partial application). Oznacza to, że część oryginalnej funkcji jest już zastosowana - ustawiona.

// With event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// w eventlistereach this wskazuje na element do którego dana funkcja jest dołączona. W tym przypadku this wskazuje na element button
// jest to dowód na to, że this zmienia się dynamicznie. Jeżeli byśmy wywołali osobno funkcję wtedy bo wskazało na lufthanse:
// lufthansa.buyPlane();

// Aby to zadziałało musimy zdefiniować this ręcznie oraz nie możemy od razu wywołać funkcji, dlatego call odpada a bierzemy bind bo zwróci nową funkcję.
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application (częściowe zastosowanie)
// w przypadku częsciowego zastosowania wielokrotnie nie interesuje nas this,  ale nadal używamy bind do tego.

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23); // dajemy null bo nas this nie interesuje
// addVat = value + value * 0.23; // tak wygląda nasza funkcja

console.log(addVat(100));
console.log(addVat(23));

// Drugi sposób
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
*/

///////////////////////////////////////
// Coding Challenge #1

/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    // register answer
    typeof answer === "number" &&
      answer < this.options.length &&
      this.answers[answer]++;
  },
};
poll.registerNewAnswer();
