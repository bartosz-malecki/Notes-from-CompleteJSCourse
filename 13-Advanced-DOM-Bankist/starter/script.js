'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
/////////////////////////////
//////////// Pobieranie elementów

// dla tych specjalnych elementów nie trzeba pisać selectorów
console.log(document.documentElement); // cały html
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // wybiera 1 element
const allSelections = document.querySelectorAll('.section'); // wybiera wszystkie elementy
console.log(allSelections); // zwraca NodeList (nie aktualizuje się live) z wszystkimi elementami wybranymi przez selektor

document.getElementById('section--1'); // nie musimy miec selectora (. #)

const allButtons = document.getElementsByTagName('button'); // wszystkie przyciski co są na stronie. zwraca HTMLCollection (aktualizuje sie automatycznie - live)
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // to samo co wyżej. Oba przydatne gdy potrzeba HTMLCollection

////////////////////
///////////// Tworzenie i dodawanie elementów
// .insertAdjacentHTML() // wrzuca string do html

const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality. <button class="btn btn--close-cookie"> Got it!</button>;
message.innerHTML =
  'We use cookies for improved functionality. <button class="btn btn--close-cookie"> Got it!</button>';

// header.prepend(message); // wstawia element do kodu html jako pierwsze dziecko podanego elementu (tutaj header)
header.append(message); // to samo co wyżej tylko jako ostatnie dziecko.
// header.append(message.cloneNode(true)); // kopiuje i wstawia element w drugim miejscu (nie przenosi jak wyżej)

// header.before(message); // wstawia element przed podanym elementem (jako rodzeństwo)
// header.after(message); // to samo tylko, że na końcu

////////////////////
///////////// Usuwanie elementów

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // nowy sposób
    // message.parentElement.removeChild(message); // stary sposób
  });

////////////////////
///////////// Style

message.style.backgroundColor = '#373784'; // zmienia coś w danym stylu
message.style.width = '120%';

console.log(message.style.color); // nie zadziała
console.log(message.style.backgroundColor); // zadziała bo ustawiliśmy ręcznie za pomocą właściwości style

console.log(getComputedStyle(message).color); // zadziała i pokaże prawdziwy kolor jaki pojawia się na stronie nawet jeśli nie zadeklarujemy go w CSS. Nawet jak sami nie zadeklarowaliśmy to pokaże wartość obliczoną przez przeglądarkę.
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 10 + 'px'; // ręczne zmienianie wartości

document.documentElement.style.setProperty('--color-primary', 'orangered'); // zmiana wartości zmiennej CSS.

////////////////////
///////////// Atrybuty

const logo = document.querySelector('.nav__logo');
// Standard
console.log(logo.alt); // zadziała na standardowych właściwościach
console.log(logo.className);

logo.alt = 'Beatiful logo'; // ustawianie

// Niestandardowe
console.log(logo.designer); // nie zadziałało bo to nie standardowa właściwość obrazu
console.log(logo.getAttribute('designer')); // tak zadziała
logo.setAttribute('company', 'Bankist'); // ustawianie

console.log(logo.src); // daje nam wersje absolutną url  z http
console.log(logo.getAttribute('src')); // daje wersję względną z samym url

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

////////////////////
///////////// Atrybuty danych

//specjalny zestaw zaczynający są od data-
console.log(logo.dataset.versionNumber);

////////////////////
///////////// Klasy

logo.classList.add('c', 'j');
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains(); // not includes
// można dawać wiele wartości

// tego nie używać bo nadpisze wszytskie klasy tą jedną!!
logo.clasName = 'jonas';
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // otrzymujemy bezwzględne położenie elementu względem całej strony (bieżąca pozycja + bieżące przewijanie)

  // Oldschoolowy przykład
  // aby zaimplementować gładkie przewijanie musimy określić obiekt z left, top i zachowaniem
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Nowoczesny dla nowych przeglądarek
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('onmouseenter: great');
// });

// nasłuchiwanie bezpośrednio na elemencie
h1.onmouseenter = function (e) {
  // alert('onmouseenter: great');
};
