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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// Metody tablicowe są funkcjami, a że tablice są obiektami, to mają dostęp do specjalnych wbudowanych metod, które morzemy postrzegać jako narzędzia do tablic.

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// możemy wyodrębnić część dowolnej tablicy. Zwraca nową tablice, ale bez zmiany oryginalnej.

console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // parametr końcowy nie jest pokazywany. długośc tablicy to końcowy paramter - poczatkowy
console.log(arr.slice(-2)); // pobranie 2ch opstatnich elementów
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
