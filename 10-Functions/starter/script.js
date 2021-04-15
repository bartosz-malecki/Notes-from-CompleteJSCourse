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

/////////// Call method

// zadziała
book.call(eurowings, 123, 'Norah Jones'); // pierwszy argument jest dokładnie tym na co chcieliśmy wskazac this., a potem reszta.
// nie wywołaliśmy sami funkcji book. Zamiast tego wywołaliśmy metodę call która wywołała funkcje book ze słowem kluczowym this ustawionym na eurowings. Pozwala nam to ręcznie i jawnie ustawiać this dla dowolnej funkcji którą chcemy wywołać

book.call(lufthansa, 666, 'Maciek Tylutki'); // teraz this wskazuje obiekt lufthansa
console.log(lufthansa);

// Mimo, że kod funkcji book jest w obiekcie lufthansa, zrobilismy tak, że this wskazuje na inny obiekt

// możemy dodawać kolejne obiekty, ale trzeba pamiętać o zachowaniu tych samych nazw właściwości

/////////////// Apply method

// robi to samo co call, z tą różnicą, że nie otrzymuje listy argumentów po słowie this, tylko pobierze argumenty z tablicy i przekaże je do funkcji
const flightData = [583, 'Józek Pan'];
book.apply(eurowings, flightData);
console.log(eurowings);
// jednak nie jest używana we współczesnym JS bo mamy lepszy sposób na to samo..:
book.call(eurowings, ...flightData); // daje taki sam wynik

/////////////// Bind method

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
/*
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // register
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    // update
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;
    poll.displayResults();
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(",")}`);
    }
  },
};
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
*/
/*
/////////// Immediately Invoked Function Expressions (IIFE)

// IIFE - czyli natychmiast wywołane wyrażenie funkcyjne. Gdy potrzebna nam funkcja którą wywołamy tylko raz, albo inaczej funkcja która zniknia nam zaraz po jej wywołaniu.

// Moglibyśmy napisać normalnie funkcje i potem wywołać ją tylko raz, ale nie o to chodzi. Chcemy wywołać natychmiast funkcje i nie musimy jej nawet zapisywać.

(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

// console.log(isPrivate); // niezadziała

// wystarczy wrzucić stwierdzenie w nawiasy i JS traktuje to jako wyrażenie funkcji i zadziała. Potem natychmiast ją wywołujemy. Nie musimy dawać żadnej nazwy funkcji.

// Działa to też w arrow func
(() => console.log("This will never run again"))();

// Ma to związek z zakresem oraz prywatnością zmiennych. W przypadku zakresu utworzonego przez funkcję mówimy, że wszystkie dane definioweane wewnątrz zakresu są prywatne. Ważne jest ukrywać dane przed przypadkowym nadpisaniem, a zakresy są dobrym narzędziem do tego. Dlatego też wymyslono IIFE i to nie jest cecha języka JS, tylko wzór wymyślony przez niektórych progamistów.

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

// IIFE teraz juz jest praktycznie nie używany, ponieważ wystarczy utworzyć blok jak wyżej i juz nasze dane są chronione. Nie ma potrzeby tworzenia funkcji do tego. Jednak jeżeli faktycznie dana funkcja ma byc wykonana tylko raz, to wtedy IIFE się przydaje.
*/

/*
//////////////// Closures (zamknięcia)

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();

// krok po kroku jak tworzymy closure:
// funkcja secureBooking znajduje sie w Global environement Context, czyli global scope obejmuje tą funkcję. Następnie, gdy wywołujemy, nowy kontekst wykonywania umieszczany jest na szczycie call stacku (tu wykonują się funkcje).
// (każdy kontekst wykonania (EC) ma zmienne środowisko, które zawiera jego zmienne lokalne. w tym przypadku tylko passengerCount)
// to zmienne środowisko jest również zakresem tej funkcji. Zatem passengerCout  miesci sie w lokal scope, ale ma dostep oczywiscie do zakresów nadrzednych, w tym wypadku jest to tylko global scope.
// w nastepnym wierszu funkcji, zwracana jest nowa funkcja która zostanie zapisana w zmiennej.
// zatem teraz Global EC zawiera też zmienną booker.
// gdy secureBooking powróci, jego EC (passengerCount) wyskoczy ze stosu i zniknie!

booker();
booker();
booker();

// jak to możliwe, że to działa skoro niby EC juz nie ma?
// Booker jest po prostu funkcją, która istnieje w środowisku globalnym. środowisko w którym jest cały wyżej kod, nie jest już aktywne, znikneło. Jednak cały czas jakoś booker ma dojście do zmiennych, które były obecne w czasie, gdy funkcja została utworzona. I to własnie robi clousre.

// Możemy ppwiedzieć, że clousre pełni funkcję - zapamiętaj wszystkie zmienne w miejscu narodzin funkcji

// Możemy sobie w tym przykładzie wyobrazic secureBooking jako miejsce narodzin funkcji. Więc funkcja booker pamieta wszystko w miejscu urodzenia od czasu jej utworzenia.

// Funkcja ma zawsze dostep do środowiska zmiennych  (VE) kontekstu wykonania EC, w którym została utworzona, nawet po zniknięciu tego EC.
// Closure jest więc tym VE przypisanym do funkcji dokładnie tak jak było w czasie i miejscu, w którym została utworzona.

// Funkcja booker ma dostęp do zmiennej passengerCount ponieważ jest ona zdefiniowana w zakresie, w którym faktycznie została utworzona funkcja booker

// Podsumowanie, definicje:
// Clousure jest zamykane w środowisku zmiennych VT kontestu wykonania EC, w którym została utworzona funkcja. Nawet po zniknięciu EC (nawet po zwróceniu funkcji).

// Clousure daje funkcji dostęp do wszystkich zmiennych funkcji nadrzędnej (funkcji w której jest zdefiniowana), nawet po zwróceniu tej funkcji nadrzędnej. Funkcja zachowuje odniesienie do swojego zakresu zewnętrznego, nawet po zniknięciu tego zakresu, co zachowuje scope chain przez cały czas.

// Clousure zapewnia, że funkcja nigdy nie straci połączenia ze zmiennymi, które istniały w miejscu urodzenia funkcji. Pamięta zmienne nawet po zniknięciu ich miejsca narodzin. Cos na zasadzie, że człowiek nigdy nie traci połączenia ze swoim rodzinnym miastem. Osoba jest funkcją, miasto jest parent scope i funkcja nie traci połączenia ze zmiennymi w tym parent scope.

// Albo clousure jest jak plecak który funkcja wszędzie nosi. A w tym plecaku są wszystkie zmienne, które były obecne w środowisku w którym funkcja została utworzona. Wtedy gdy funkcja nie moze znaleść zmiennej w swoim zakresie funkcji, JS przeszuka plecak i pobierze brakującą zmienną.

// Nie musimy ręcznie tworzyć zamknięć. JS robi to automatycznie. Nie ma też jawnego dostępu do zamkniętych zmiennych, bo zamknięcia nie są namacalne jak np obiekty i nie umożliwiają nam dostepu. Nie możemy sobie od tak pobrać z niego zmiennych, poniweaż jest to tylko wewnętrzną właściwości funkckcji. Możemy zaobserwować zamkniecie,gdy w dziwny sposob funckje maja dostęp do zmiennych, które nie powinny istnieć.

// Możemy przyjżec się co znajduje się w tym 'plecaku':
console.dir(booker);

// Wewnętrzna właściwośc Scopes jest VE funkcji booker. Podwójne nawiasy oznaczają własność wewnętrzną do której nie mamy dostępu z naszego kodu.
*/

// Przykład 1
//Przykład, że nie musimy zwracać funkcji by zobaczyc zamknięcie.
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
// po wywołaniu g() - a stanie sie 23, a zmienna f stanie się funkcja f.
f();
// dostaliśmy 46. Więc jest to dowód na to, że funkcja f przysłoniła wszelkie zmienne EC w którym została zdefiniowana. Nawet gdy sama zmienna f, nie została tutaj technicznie zdefiniowana w VE funkcji. Więc zmienna f została zdefiniowana na zewnątrz w global scope, ale potem gdy przypisujemy jej funkcję, jest nadal zamknięta w VE funkcji g. Obejmuje to zmienną więc jest w stanie uzyskać do niej dostęp, nawet gdy funkcja g zakończyła swoje działanie.
// W tym miejscu VE funkcji g już nieistnieje, ale, że funkcja f zamknęła się w tym VE dlatego mamy dostęp do zmiennej a. (analogicznie, a zawiera się w plecaku f funkcji)
console.dir(f);

const h = function () {
  const b = 666;
  f = function () {
    console.log(b * 2);
  };
};

h();
f();
console.dir(f);

// kiedy przepisujemy funkcję do nowej wartości, stare zamknięcie (clousure) znika. Teraz clousure jest b, czyli w nowym miejscu narodzenia. Czyli clousre może się zmienić gdy zmienna jest przepisana. Sprawdziło się stwierdzenie, że funkcja nie utraci połączenia ze zmiennymi które były obecne w jej miejscu narodzenia. W tym przypadku funkcja f narodziła się wewnątrz g, a następnie odrodziła się w h, więc pierw clousure zawierało zmienną z 1 miejsca narodzenia, a potem z nastepnego.

// Przykład 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// Dowód na to, że domknięcia maja pierwszeństwo przed scope chain.
// const perGroup = 1000; // pierw pobierze zmienna w środku funkcji bo w rzeczywistości jest zamknięta w VE.

boardPassengers(180, 3);

// po wywołaniu funkcji zmienna perGroup zostanie utworzona, nastepnie zostanie wywołany timer i zarejstruje funkcje zwrotną i zostanie to wywołane po 3s. Natychmiast zostanie wywołany ostatni console.log (nie będzie czekał tych 3ch sekund.).
// funkcja timeru, została tutaj wykonana całkowicie niezależnie od boardPassengers, mimo tego funkcja zwrotna była w stanie używac wszystkich zmiennych, które znajdowały się w VE, którym została utworzona.
// Jest to kolejny wyraźny przykład tworzonego zamknięcia, czyli funkcja zwrotna ma dostęp do zmiennych które były zdefiniowane w boardPassengers a która chwilę temu była wywołana.
// Zamknięcie więc zawiera też argumenty (n, wait), ponieważ są tylko lokalnymi zmiennymi w funkcji.
