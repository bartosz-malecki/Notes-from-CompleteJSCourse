'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
const getCode = str => str.toUpperCase().slice(0, 3);

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45);
  console.log(output);
}
///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

*/

/*
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
///////////////////////////////////////
// Working with strings 2

// Split and join
console.log('a+very+nice+string'.split('+')); // dzieli ciąg na wiele części na podstawie ciągu dzielącego. Daje nam to tablice z elementami ciągu
// Powrzechne jest wykorzystywanie tego do tworzenia zmiennych.
console.log('Bartosz Małecki'.split(' '));

const [firstName, lastName] = 'Bartosz Małecki'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); // dodaje ciąg rozdzielający. Tutaj tworzy jeden ciąg złożony z elementów tablicy połączony razem przez spacje z join
console.log(newName);

const capitalizeName = name => {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1)); // sposób 1
    namesUpper.push(n.replace(n[0], n[0].toUpperCase())); // sposób 2
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('bartosz małecki');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+')); // dodaje znaki przód/tył w zależności jaką długość ciągów chcemy

const maskCreditCard = number => {
  const str = number + ''; // gdy łączymy number ze stringiem dostajemy string
  const last = str.slice(-4);
  return last.padStart(str.length, '*'); // odsłaniamy 4 ostatnie cyfry i maskujemy wczesniejsze
};

console.log(maskCreditCard(7437438943289324));
console.log(maskCreditCard(743741222));
console.log(maskCreditCard('74374165433'));

// Repeat
const message2 = 'Bad weather... All departures delayed.. ';
console.log(message2.repeat(4));

const planesInLine = n => {
  console.log(`There is ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(9);
*/
/*
///////////////////////////////////////
// Working with strings

const airlane = 'TAP Air Portugal';
const plane = 'A320';

// wydobycie znaku na określonej pozycji
console.log(airlane[5]);
console.log('B737'[0]);

// długość ciągów
console.log(airlane.length);
console.log('B737'.length);

// szukanie indeksu znaku
console.log(airlane.indexOf('r')); // pierwsze wystąpienie
console.log(airlane.lastIndexOf('r')); // ostatnie wystąpienie
console.log(airlane.indexOf('Portugal'));

// wyodrębnianie części ciągów
console.log(airlane.slice(4)); // parametr początkowy. nie zmienia podstawowego ciągu. Aby go uzyć, musimy zapisac w zmiennej.
console.log(airlane.slice(4, 7)); // parametr końcowy, nie zawiera się w ciągu, kończy wyodrębniać przed jego osiągnięciem. Długość ciągu = końcowy - początkowy

// Wszystkie metody zwracają nowe ciągi.

// Aby wyodrębnić pierwsze słowo
console.log(airlane.slice(0, airlane.indexOf(' ')));
// Aby wyodrębnić ostatnie słowo
console.log(airlane.slice(airlane.lastIndexOf(' ') + 1)); // łapie spację więc trzeba dać +1

console.log(airlane.slice(1, -1));

const checkMiddleSeat = seat => {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got middle seat');
  else console.log('You got lucky');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Istnieje możliwośc wykorzystywania metod na ciągach z tego względu, że JS konwertuje ciąg na obiekt
console.log(typeof new String('Bartek'));

// Naprawa wielkich liter (kapitalizacja)
const passenger = 'baRTosZ';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const capitalize = name => {
  const nameLower = name.toLowerCase();
  const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);
  return nameCorrect;
};
console.log(capitalize('baRtOSZ'));

// sprawdzanie email
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io  \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// replacing
const priceGB = '288,97Ł';
const priceUS = priceGB.replace('Ł', '$').replace(',', '.');
console.log(priceUS);

const annoucement =
  'All passengers come to boarding door 23. Boarding door 23!';
// console.log(annoucement.replace(/door/g, 'gate'));
console.log(annoucement.replaceAll('door', 'gate'));

// Booleans
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320'));
console.log(plane1.startsWith('Air'));

if (plane1.startsWith('Airbus') && plane1.endsWith('neo'))
  console.log('Part of the NEW airbus family');

// Praktyczny przykład
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are NOT allowed on board');
  else {
    console.log('Welcome aboard');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
*/
///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/*
// 1;
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2;
gameEvents.delete(64);

// 3;
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
4;
for (const [min, event] of gameEvents) {
  const half = min < 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}


////////////
// Struktury danych: podsumowanie

// Gdy potrzebujemy prostych list wartości, bez ich opisywania: tablice i sety.
// Gdy potrzbujemy przechowywać wartości w kolejnosci, gdy mogą zawierać duplikaty oraz gdy zamierzamy manipulować danymi - tablice.
// Gdy potrzebujemy unkikalnych wartości, lepsza wydajność, usuwanie duplikatów z tablicy - sety.

// Gdy potrzebujemy opisywać wartości za pomocą kluczy - obiekty i mapy.
// Gdy potzebujemy po prostu odwzorować klucze na wartości oraz gdy te klucze nie są tylko ciągami - mapy.
// Gdy potrzebujemy funkcji(metod) jako wartości, użyć this, do pracy z JSON - obiekty.

/*
////////////////////// MAPS
// Mapa jest to struktura danych, której możemy użyć do odworowania wartości na klucze. Różnica między mapami a obiektami jest taka, że w mapach klucze mogą mieć dowolny typ (w obiektach zawsze stringi).
// Sposobem tworzenia nowej mapy jest utworzenie pustej.

const rest = new Map();
// następnie dodajemy elementy (podobne do ADD w setach):
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
// wywołanie metody set zwraca nam zaktualizowaną mapę
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

// by odczytać dane z mapy używamy metody GET:
console.log(rest.get('name'));
console.log(rest.get(true));

// Przykład
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// pisząc nową mapę bezposrednio z kodu, lepiej robic to w ten sposob. Gdy dodajemy nowe elementy programowo za pomocą kodu, wtedy metoda set się sprawdza
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again'],
]);
console.log(question);

// Taka tablica tablic wygląda jak Object.entries() więc istnieje łatwy sposób na konwersję obiektów na mapy:
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app (iterowanie)
console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
//////////////////////////////////////////
*/

/*
//////////////////////////////// SETS
// Sety są to zbiory unikatowych wartości (nie ma duplikatów).
// Sety są bardzo podobne do tablic, nie mają par klucz-wartośc oraz są iterowalne. Jednak róznią się tym, że elementy setu są unikalne (duplikaty nie są brane pod uwagę), oraz kolejnośc elementów nie ma żadnego znaczenia.

const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);



// // stringi są również iterowalne
// console.log(new Set('Bartosz'));
// // Mogą być też puste
// console.log(new Set());

// Możemy uzyskać wielkośc setu
console.log(orderSet.size); // w tym przykładzie kucharz będzie wiedział ile różnych dań będzie musiał przygotować

// Sprawdzenie czy dany element jest w secie (coś jak include w tablicach)
console.log(orderSet.has('Pizza'));

// Dodawanie nowych wartości
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');

// Usuwanie wartości
orderSet.delete('Risotto');
// orderSet.clear(); // czyści cały set
console.log(orderSet);

// Nie ma sensu pobierać danych z setu, ponieważ indeksy i kolejnośc nie ma znaczenia. To co musimy wiedzieć to czy dana wartość jest w secie.
// Jeżeli potrzebujemy przechowywać wartości w kolejności i je pobierać, po to są tablice.

// iterowanie
for (const order of orderSet) console.log(order);

// Praktyczny przykład
// Chcemy dostac tablice róznych zawodów w tej restauracji
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
// Jeżeli bysmy chcieli tylko sprawdzic jaka jest ilośc róznych pozycji wystarczy (bez potrzeby tworzenia tablicy):
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

// Podsumowanie
Gdy potrzebujemy uporzątkować wartości które mogą zawierać duplikaty używamy tablic. Sety mają przydatną właściwość, że są unikalne i łatwo jest działać z nimi, używająć wszystkich prostych metod.
//////////////////////////////
*/

/////////////////////////////////////
// Coding Challenge #2
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
// for (const [i, scorer] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${scorer}`);
// }

// 2.
// const values = Object.values(game.odds);

// let sum = 0;
// for (const i of values) {
//   sum += i;
// }

// let average = sum / 3;
// console.log(average);

// 3.
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odds of ${teamStr}: ${odd}`);
// }

// bonus
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀

*/
// 1)
// const [players1, players2] = game.players;
// console.log(players1, players2);

// 2)
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// 3)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4)
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5)
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(game.odds);
// console.log(team1, draw, team2);

// 6)
// const printGoals = (...players) => {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// 7)
// team1 < team2 && console.log('Team1 is more likely to win');
// team1 > team2 && console.log('Team2 is more likely to win');
/*

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
//////////////////////////

///////////////////////////
// Operator łączący sprawdza czy wartość po jego lewej stronie istnieje
// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// jeżeli open nie występuje dostaniemy błąd. ?. daje nam undefined.
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}
// operator łączący ?. oraz operator koalesencji ?? powinny być używane razem

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? 'User array empty');
//////////////////////////////




// The Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null and undefined (NOT 0 or ''), 0 i '' są dla niego prawdziwymi wartościami
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/

/*
console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
// Zwróci pierwsza wartość prawdziwą albo ostatnią fałszywą gdy wszystkie takie są.
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
// Zwróci pierwsza wartośc fałszywą albo ostatnią prawdziwą gdy wszystkie takie są
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/
