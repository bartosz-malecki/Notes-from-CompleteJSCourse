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
