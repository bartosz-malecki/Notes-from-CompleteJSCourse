'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// wypisanie działań (wpłaty, wypłaty)
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // opróżniam cały kontener i dopiero wtedy dodaje nowe elementy

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>      
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // wrzuca string do html w dane miejsce
  });
};

// obliczanie i wyświetlanie balansu
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// obliczanie i wyświetlanie poszczególnych ruchów
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // wyrzucamy odsetki mniejsze od 1
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// tworzenie nazw użytkowników - inicjały
const createUsernames = function (accs) {
  accs.forEach(
    acc =>
      (acc.username = acc.owner // dodajemy nową właściwośc do obiektów account
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////     Event handlers
let currentAccount;

// logowanie
btnLogin.addEventListener('click', function (e) {
  // w HTML po wciśnięciu button z formularza, domyślnie strona się przeładowuje. Trzeba temu zapobiec. Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // optional chaining by nie dostawać błedu gdy zle wpiszemy uzytkownika

    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // usuwa focus na btn

    // Update UI
    updateUI(currentAccount);
  }
});

// Przelewy z konta na konto
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username // jesli takie konto nie istnieje to sie nie wykona
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// Zamykanie konta
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //delete acc
    accounts.splice(index, 1);
    // wylogowanie / hide ui
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // po każdym kliknięciu zamienia się
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
//////////////////   Simple array methods

// Metody tablicowe są funkcjami, a że tablice są obiektami, to mają dostęp do specjalnych wbudowanych metod, które morzemy postrzegać jako narzędzia do tablic.

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// możemy wyodrębnić część dowolnej tablicy. Zwraca nową tablice, ale bez zmiany oryginalnej.

console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // parametr końcowy nie jest pokazywany. długośc tablicy to końcowy paramter - poczatkowy
console.log(arr.slice(-2)); // pobranie 2ch ostatnich elementów
console.log(arr.slice(1, -2)); // pobranie wszystkiego od 1 el prócz 2ch ostatnich
console.log(arr.slice()); // kopiowanie tablicy to samo co [...arr]

// SPLICE
// to samo co slice, z tym, że zmienią oryginalną tablice

// console.log(arr.splice(2));
// jednym z powrzechnych przypadków uzycia jest usuniecie ostatniego elementu
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); // usuniecie 2ch elementów
console.log(arr);

// REVERSE
// odwraca tablicę i zmienia oryginalną

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// łączy dwie tablice. Nie mutuje oryginalnych tablic

const letters = arr.concat(arr2);
console.log(letters); // to samo co cl([...arr], [...arr2])

// JOIN
// łączy elementy w string oddzielony danym znakiem

console.log(letters.join(' - '));

// pop, push, shift, unshift poznaliśmy na początku kursu
*/

/*
///////////// Metoda forEach

// aby przejść przez tabliće możemy użyć pętli for of, albo prościej: metodę forEach.



// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  // 1 element to index, 2 element bieżący element
  // aby uzyskać dostep do indexu
  if (movement > 0) {
    console.log(`Movement ${i + 1}:  You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}:  You withdrew ${Math.abs(movement)}`);
  }
}
console.log('----- FOREACH -----');

// forEach jest funkcją nadrzędną która potrzebuje funkcji zwrotnej by powiedzieć jej co ma zrobić.
// Metoda forEach robi pętlę po tablicy i w każdej iteracji wykona funkcję zwrotną i przekaże bieżący element tablicy jako argument.
// W tym wypadku mówimy: w każdej iteracji zaloguj jeden z tych dwóch ciągów do konsoli.
// W rzeczywistości forEach przechodzi przez bieżący element, indeks oraz całą tablicę którą zapętlamy.

// movements.forEach(function (movement) {
movements.forEach(function (mov, i, arr) {
  // 1 bieżący element, 2 indeks
  if (mov > 0) {
    console.log(`Movement ${i + 1}:  You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}:  You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// kiedy użwyać czego:
// z pętli for of można się wyrwać, na forEach nie działają break i continue. ForEach obejmuje zawsze całą tablicę.
// Więc głównie zależy to od preferencji, jednak gdy potrzeba nam się wyrwać z pętli wtedy tylko for of.
*/
/*
///////////  forEach z map i set

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Map

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
// Otrzymujemy wynik taki, że key = value. W setach nie ma kluczy ani indeksów, więc nie ma wartości która miała by sens dla key. Key mogłoby tu nie byc ale nie usunięto by nie robić zamieszania. Można więc dać '_' co w JS oznacza zmienną jednorazową -zupełnie nie potrzebną.
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// const dogsJulia2 = [9, 16, 6, 8, 3];
// const dogsKate2 = [10, 5, 6, 1, 4];

// const onlyDogsJulia = dogsJulia.slice(1, 3);
// const allDogs = onlyDogsJulia.concat(dogsKate);
// const onlyDogsJulia2 = dogsJulia2.slice(1, 3);
// const allDogs2 = onlyDogsJulia2.concat(dogsKate2);

// const checkDogs = arr => {
//   arr.forEach(function (age, i) {
//     if (age >= 3)
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
//     else console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//   });
// };
// checkDogs(allDogs);
// checkDogs(allDogs2);

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [9, 16, 6, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
/*
/////// MAP, FILTER, REDUCE

// Są to metody których używamy do tworzenia nowych tablic w oparciu o przekształcenie danych z innych tablic.

////////// Map - zwraca nową tablicę zawierająca rezultat operacji na oryginalnej tablicy. Np. wszystkie elementy * 2. Przykład:

// konwertowanie
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd); // arrow func
console.log(movements);
console.log(movementsUSD);

// można zrobic to samo za pomoca pętli for of, jednak to wymaga utworzenia ręcznie pustej tablicy (map zwraca automatycznie). Użycie map metody jest bardziej funkcjonalnym programowaniem i nowocześniejszym.
// tak jak z forEach, mamy dostęp do 3ch parametrów: wartości, indeksów i całej tablicy:

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}:  You ${mov > 0 ? 'deposited' : 'withdrew'}  ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
// Czyli...przekazujemy funkcje zwrotną do metody map (sami jej nie wywołujemy), a metoda map wywoła tą funkcję dla każdego elementu tablicy (tutaj movement) czyli po prostu przekaże bieżący element oraz indekx i całą tablicę.
// Z forEach różni się tym, że forEach stwarza efekty uboczne (side effects) czyli zrobienie czegoś, bez zwracania niczego. forEach w tym przykładzie wylogowało nam każdy element jeden po drugim, a map całą tablicę.

/////////// Filter - zwraca nową tablicę zawierającą elementy oryginalnej tablicy ,spełniające jakiś warunek, np. wszystkie elementy > 2.

// tak jak z forEach czy map, mamy dostęp do 3ch parametrów: wartości, indeksów i całej tablicy.

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


/////////// Reduce - sprowadza wszystkie elementy tablicy do jednej wartości (zamiast tablicy), np. sumuje wszystkie elementy tablicy. Przy tym mamy tzw. zmienną akumulatorową - reduce zapętla tablicę i dodaje bieżący element do akumulatora i na końcu pętli mamy sumę wszystkich elementów. (efekt kuli śnieżnej).

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur; //  w każdej iteracji pętli zwracamy zaktualizowany akumulator
// }, 0); // drugi parametr - wartość początkowa akumulatora

// arr func:
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// zamiast tego było by:
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
// potrzebujemy zmiennej zewnetrznej. przy jednej pętli jest to praktyczne, ale gdy mamy więcej operacji i pętli wtedy jest to kłopotliwe.

// metody unikają tej dodatkowej zmiennej i po prostu od razu zwracają zmienna lub wartośc od razu.

// max value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]); // gdy szukamy min i max lepiej dać pierwszą wartośc tabilcy jako początkowa wartośc niz 0;
console.log(max);

// jest mnóstwo rzeczy jakie możemy zrobic za pomocą reduce. Jest ona najpotęzniejszą metodą a zarazem najtrudniejszą. Musimy wiedzieć co ma byc akumulatorem i jak powinien współdziałać z bieżącą wartościa.
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(dogAge =>
    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
  );
  const adultDogs = humanAge.filter(age => age >= 18);
  // const averageAdultDogs =
  //   adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length; // 1 sposób
  const averageAdultDogs = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  ); // 2 sposób
  return averageAdultDogs;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
//////////////  The Magic of Chaining Methods
const eurToUsd = 1.1;

// Pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
// możemy używać z wielu metod na raz i mieszać, jednak tylko wtedy gdy wcześniejsza zawiera tablicę!
// filter i map zwracają tablicę, więc reduce nie może być przed nimi.
// Możemy sobie wyobrazić to jako rura do przetważania danych. Na początku są dane wejściowe i w tym przypadku sa 3 kroki gdzie są przetważane po drugiej stronie.
// Jeżeli wychodzą jakies dziwne wyniki, możemy sprawdzić wynik danej operacji (bieżącą tablicę) w nastepnej metodzie. W tym przypadku metode map wywołano na wyniku operacji filter (otrzymaliśmy wartość arr)

// Nie powinniśmy nadużywać takich łancuchów, ponieważ może to powodować problemy z wydajnością jeżeli bysmy mieli wielkie tablice. Powinnismy skompresowac je do jak najmniejszej liczby metod.
// Złą praktyką jest także łączenie w łańcuch metod które modyfikują oryginalna tablicę jak np splice czy reverse (raczej używać przy małych aplikacjach jak ta)
*/

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge2 = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/
/*
///////////////     Find method
// Działa podobnie jak wcześniejsze, potrzebuje funkcji zwrotnej i tak jak filter, która zwraca wartośc logiczną.

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// Róznica między filter i find jest taka, że find zamiast zwracania nowej tablicy, zwróci nam pierwszy element spełniający dany warunek (pierwszy element dla którego ta operacja staje się prawdą). Oraz filter zwraca tablice, a find tylko element.

// Find przydatne jest przy strukturze obiektów, ponieważ za jej pomoca możemy znaleźć obiekt w tablicy na podstawie jakiejś właściwości.

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// zazwyczaj celem find jest znalezienie dokładnie jednego elemntu, dlatego przeważnie ustawiamy warunek tak, aby tylko jeden element mógł go spełnić.


///////////////     findIndex Method
// podobnie jak w find, zwróci pierwszy element spełniający dany warunek, jednak zamiast tego elementu - zwraca jej index.
// .indexOf sprawdza tylko czy dana tablica zawiera daną wartośc, a jeśli tak, to zwraca index. Dzięki findIndex mozemy budowac złożone wartunki.

///////////////     SOME Method

// Równość
console.log(movements.includes(-130));

// SOME: Warunek
console.log(movements.some(mov => mov === -130)); // lepsze do tego includes

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);
// Jeżeli istnieje wartość, dla której dany warunek jest prawdziwy - zwróci nam true.

///////////////     EVERY Method
// Jeżeli wszystkie wartości w tablicy spełniają dany warunek - zwraca true.
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callbacks
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
// dobre dla DRY

///////////////     FLAT Method
// Metoda flat spłaszcza tablice - usuwa zagnieżdżenia. Nie posiada funkcji zwrotnej.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

// metoda ta, domyślnie idzie tylko o jeden poziom. Możemy ustawić liczbe poziomów.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// wybieranie wszystkich działań ze wszystkich kont.

// flat
// tworze tablice z samymi ruchami
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance);

///////////////     FLAT Method
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance2);
// flatMap jest bardziej wydajna, tworzy tablice i spłaszcza za jednym zamachem. Jednak działa to o 1 poziom. Gdy potrzebujemy się bardziej zagłębić, wtedy metoda flat będzie konieczna.

// flat i flatMap są przydatne gdy mamy zagnieżdżone tablice i potrzebujemy z nimi pracować.


///////////////     SORT Method
// Sortuje zawartość tablicy. Mutuje oryginalną tablicę!!

// Strings - alfabetycznie
const owner = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owner.sort());
console.log(owner);

// Numbers .
console.log(movements);
// console.log(movements.sort());- konwertuje na ciągi i wtedy od najmniejszej do największej ale np -10 -20 10 20

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending - rosnąco
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending - malejąco
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

// Jeżeli mamy mieszaną tablice liczby/ciągi, to nie zadziała.


///////////////     More ways to creating and filling
// Możemy programowo utworzyć tablicę np:

const arr = [1, 2, 3, 4, 5, 6, 7];

// Empty arrs + fill method
const x = new Array(7); // pusta tablica z 7 elementami

// działa na to tylko jedna metoda - fill (podobna do slice).
// x.fill(1); // wypełnia 7ma jedynkami

x.fill(1, 3, 5); // wypełnia 1ką od indeksu 3go do 5go(bez niego)
console.log(x);
// możemy wypełniać też wypełnione tablice:
arr.fill(23, 4, 6); // daje 23 na pozycjach 4 i 5
console.log(arr);

// Array.from
// w zasadzie nie używamy tego jako metoda na tablicy, tylko uzywamy na konstruktorze tablicy który jest funkcją
const y = Array.from({ length: 7 }, () => 1); // przekazujemy obiekt o długości 7, oraz funcja zwrotna (tutaj map method)(nie potrzebujemy żadnych argumentów itp).
// Robi to samo co wyżej, ale jest czystrze
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1); // jak w map method. Mamy dostęp do aktualnego elementu i indeksu. Tutaj dodajemy do każdego indeksu 1 i da nam to wartości od 1-7. Zamiast cur możemy dać '_' ponieważ nie potrzebujemy tego parametru.
console.log(z);

// .from funkcja została wprowadzona w celu utworzenia tablic ze struktur podobnych do tablic czyli strings, maps i sets (są iterowalne).

// Pobranie elementów z UI nie mając ich nigdzie w kodzie (nie mając tablicy z tymi wartościami)

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // drugi sposób ale trzeba osobno zmapować.
});
// Użyliśmy Array.from do stworzenia tablicy z wyników querySelectorAll (nie jest tablicą tylko strukturą podobną do tablicy). Tą strukturę łatwo można przekonwertowąc na tablicę dzięki Array.from(). Drugi krok to map method dzięki której przekształcamy tą strukturę w tablicę (konwertowanie surowego elementu na jego zawartość tekstową z usunęciem znaku euro)
*/

//////////////////////////////////////
//////////////  Array Methods Practice
/*
// 1. Obliczenie wszystkich wpłat ze wszystkich depozytów.
// Trzeba utworzyć jedną spłaszczoną tablicę z wszystkimi ruchami, a następnie odfiltrować te wpływające i zsumować.

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2. Obliczanie ilości depozytów z banku z conajmniej 1k.

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// Prefixed ++ operator
// let a = 10;
// console.log(++a);
// console.log(a);

// 3, Tworzymy nowy obiekt zawierający sumy wpłat i wypłat.

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur >= 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums; // musimy zawsze w metodzie reduce zwrócić akumulator. Tutaj mamy nawiasy klamrowe więc musimy dać return, w przykładzie jak wyżej jest on zwrócony niejawnie (nie ma nawiasów).
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recomFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recomFood ? 'much' : 'little'
  }.`
);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recomFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')} dog's eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')} dog's eat too little!`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogs.some(dog => dog.curFood === dog.recomFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// current > (recommended * 0.90) && current < (recommended * 1.10)
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recomFood * 0.9 && dog.curFood < dog.recomFood * 1.1
  )
);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const dogsOk = dogs.filter(
  dog => dog.curFood > dog.recomFood * 0.9 && dog.curFood < dog.recomFood * 1.1
);
console.log(dogsOk);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsCopy = dogs.slice().sort((a, b) => a.recomFood - b.recomFood);
console.log(dogsCopy);
