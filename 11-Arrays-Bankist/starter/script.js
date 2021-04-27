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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // opróżniam cały kontener i dopiero wtedy dodaje nowe elementy
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>      
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // wrzuca string do html w dane miejsce
  });
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
