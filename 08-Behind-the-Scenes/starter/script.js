'use strict';

////
/////////////////////////                     Notatki                   /////////////////////////////////
/*
Silnik JS - program który wykonuje kod. Każda przeglądarka posiada własny silnik. Silnik JS zawiera stos wywołań (Call Stack) oraz stertę do wywołania (HEAP).

Call Stack - miejsce w którym kod jest wykonywany przy uzyciu konetkstu wykonania (execution context)
HEAP - nieustruktyryzowana pula pamieci w ktorę przychowywane są wszystkie obiekty, których potrzebuje nasza aplikacja.

Kod jest kompilowany do kodu maszynowego (binarnego 1,0) za pomocą kompilacji lub interpretacji.

- kompilacja - cały kod źródłowy jest konwertowany na kod maszynowy od razu, a nastepnie zapisywany w przenośnym pliku który mozna wykonać na dowolnym komputerze. Czyli: najpierw budowny jest kod, a potem wykonywany w CPU.

- interpretacja - iterpreter przechodzi przez kod źródłowy i wykonuje kod linijka po linijce. Kod jest odczytywany i wykonywany w tym samym czasie. Kod dalej jest konwertowany, ale tuz przed samym wykonaniem, a nie z wyprzedzeniem. Jest dużo wolniejsza od kompilacji, a teraz opóźnienia sa nie dopuszczalne.

JS wykorzystuje teraz połączenie kompilacji i interpretacji co jest zwane Just-in-time (JIT) compilaton.
- JIT - kompiluje cały kod na kod maszynowy na raz ale wykonuje go od razu. Dalej mamy dwa kroki regularnej kompilacji z wyprzedzeniem, ale nie ma pliku przenosnego. Wykonanie następuje natychmiast po kompilacji.

> Gdy fragment kodu JS trafia do silnika pierwszym krokiem jest przekazanie kodu (parsing), co oznacza odczyt do kodu podczas procesu przekazywania. Kod jest przekazywany do struktury danych zwanych AST (abstract sytax tree). Działa to poprzez podzielenie każdego wiersza kodu na części które są znaczące dla języka (const, function), a następnie zapisanie wszytskich ich w drzewie w uporzadkowany sposób. Sprawdza także czy nie ma błędów składniowych (sytnax errors),a drzewo wynikowe użyte potem jest do wygenerowania kodu maszynowego.
> Kompilacja , która pobiera wygenerowany plik i kompiluje go do kodu maszynowego. 
> Natychmiastowe wykonanie kodu. Wykonanie odbywa się w silniku JS-a. .
> Optymalizajca kodu w tle, aby mógł rozpocząć wykonywanie tak szybko jak to możliwe, i ponowna kompilacja juz podczas uruchomionego programu (mozna to zrobic wiele razy). Sprawia to, że nowoczesne silniki są takie szybkie.


//////        Środowisko wykonwacze

Mozna wyobrazic sobie to jako duży kontener zawierający wszystko to co potrzebujemy do uzycia JS-a (w tym przypadku przeglądarki). > Sercem wykonawczym JS jest silnik.
> Potrzebujemy też dostepu do WEB APIs (DOM, API Timers Fetch API...). Uzyskuje dostęp do interfejsów API poprzez globalny obiekt window.
> Kolejka wywołań zwrotnych. Jest to struktura danych zawierająca wszytskie funkcje wywołania zwrotnego, które są gotowe do wywołania. Funkcje zwrotne (click, timer, data,..)

umieszczenie funkcji zwrotnej w kolejce wywołań zwrotnych --> przekazanie funkcji do Call Stack aby można było ją wywołać --> 

Dzieje się tak dzięki event loops (pętla zdarzeń). Pobiera funkcje zwrotne z wywołania zwrotnego i umieszcza w stosie wywołań aby mogły byc wykonane. Sposób implementacji nieblokującego modelu współbieżności.
*/

// console.log(this); // dostajemy global window

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAge(1990); // dostajemy undefined

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   //   console.log(this);
// };
// calcAgeArrow(1980); // dostajemy this ze swojej funkcji/zakresu nadrzędnej/go (lexical this) czyli w tym wypadku global window (arrow function nie ma swojego this!)

// // Wywołanie metody
// const bartosz = {
//   year: 1990,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };
// bartosz.calcAge(); // dostaniemy obiekt

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = bartosz.calcAge; // wypożyczenie metody z drugiego obiektu
// matilda.calcAge(); // this wskazuje teraz na obiekt matilda. Nawet jeśli metoda jest zapisana w obiekcie bartosz, this będzie dalej wskazywało na obiekt który wywołuje metodę - jest dynamiczne.

// const f = bartosz.calcAge;
// f(); // dostaniemy undefined i błąd bo teraz ta funkcja jest zwykłym wywołaniem funkcji, nie jest przyczepiona do żadnego obiektu

// Regular functions vs arrow - na co zwracać uwagę

// var firstName = 'Maciek'; // jeżeli zdefiniujemy jako var, firstName zostanie dodane do window i będzie wtedy działać. Unikać!

const bartosz = {
  firstName: 'Bartosz',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Rozwiązanie 1
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   //   console.log(this);
    //   //   console.log(this.year >= 1981 && this.year <= 1996);
    // };

    // Rozwiązanie 2

    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    }; // używa this z zakresu nadrzędnego, w tym przypadku metody calcAge, kluczem jest tu obiekt bartosz

    isMillenial(); // dostaniemy błąd ponieważ jest to zwykłe wywołanie funkcji, nawet jeśli wewnątrz metody, czyli this jest undefined. Mozna to naprawić: użyć dodatkowej zmiennej self/that, albo arrow function
  },

  greet: () => console.log(`Hey ${this.firstName}`),
};
// bartosz.greet(); // dostaniemy 'hey undefined' dlatego, że to obiekt, a nie block scope i arrow uzyje this z otoczenia, a  więc wszystko jest w zasięgu globalnym. W window nie ma firstName więc dostajemy undefined
bartosz.calcAge();
// Aby uniknąć takich rzeczy, najlepszą praktyką jest nie używania arrow function jako metody, tylko wyrażenia funkcyjnego!

// arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 56);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 9);

// arguments słowo kluczowe istnieją  ale tylko w zwykłych funkcjach. Nie są już tak uzwyane

/////////////     Primitives vs Objects         //////////////////

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge); // dostaniemy 31 i 30. Age sie zmienilo, ale zanim zmiana była wprowadzona to oldAge miało 30.

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend: ', friend);
console.log('Me: ', me); // dostaniemy w obu obiektach age = 27.

// Primitives :
// Number, string, boolean, undefined, null, Symbol, bigint <--- Primitive Types. (przechowywane w Call stack, czyli w kontekstach wykonania w których są zadeklarowane)

// Pierw JS tworzy unikalny identyfikator z nazwą zmiennej i kawałek pamięci zostanie przydzielony pod określony adres. Na końcu wartość zostaje zapisana pod podanym adresem.
// WAŻNE! identyfikator wskazuje na adres a nie na samą wartość! Więc age jest równe adresowi a nie wartości.
// Gdy chcemy nadać nową wartość, powstaje nowy adres z wartością do którego identyfikator zostaje przypisany.

// Objects:
// Object iteral, Arrays, Functions, Many more..  <--- Reference Types. (przechowywane są w HEAP)

// Podobnie jak przy wczesniej, JS tworzy identyfikator oraz adres z wartością, jednak fragment pamięci w call stack(stos) ma odniesienie do fragmentu pamięci w heap(sterta) czyli miejscu w którym obiekt jest przechowywany. Działa to tak dlatego, że obiekty mogą być zbyt duże aby można je było przechowywać w stosie, natomiast sterta ma prawie nieogarniczoną pamięć. Stos zachowuje odniesienie do miejsca w którym obiekt jest faktycznie przechowywany, czyli sterty, aby mógł go znależć. Gdy zmieniamy wartość w obiekcie, jest on znajdowany w stercie, nie ma problemu, że zdefiniowaliśmy go jako const, ponieważ nie zmieniamy wartości w stosie(w stosie adres i wartość jest taka sama bez zmian, zmienia się wartość w stercie).
// Gdy kopiuje się obiekt, trzeba mieć na uwadze, że tak naprawde tworzy się nową zmienną, która wskazje ten sam obiekt.

// Zmienne zadeklarowane jako const są niezmienne gdy są wartościami pierwotnimi, nie dotyczy to wartości odniesienia(reference). Stałe muszą być wartości w stosie, a stos zawiera tylko odniesienie(którego nie zmienieamy) do obiektu w stercie(zmieniamy).

//kopiowanie obiektu aby były niezależne
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const jessicaCopy = Object.assign({}, jessica2); // funkcja ta łączy dwa obiekty i zwraca nowy. Tworzymy nowy obiekt i kopiujemy do niego wszystkie własności.
jessicaCopy.lastName = 'Davies';
console.log('Before marriage: ', jessica2);
console.log('After: ', jessicaCopy);

// w stercie powstał rzeczywiście nowy obiekt na który wskazuje jessicaCopy.
