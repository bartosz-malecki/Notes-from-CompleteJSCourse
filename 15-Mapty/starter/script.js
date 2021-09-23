'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  constructor() {}

  _getPosition() {}

  _loadMap(position) {}

  _showForm() {}

  _toggleElevationField() {}
}

let map, mapEvent;
// Pobieranie geolokacji
// funkcja przyjmuje dane wejsciowe do funkcji zwrotnych, jedna z nich to sukcesu (gdy przeglądarka uzyska współrzędne bieżącej lokalizacji), a druga błędu (gdy wystąpi błąd przy pobieraniu)
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const { longitude } = position.coords; // zastosowanie destrukturyzacji. Tworzy się zmienna longiute na podstawie właściwości longitude tego obiektu
    // console.log(`https://www.google.pl/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    map = L.map('map').setView(coords, 13); // koordynaty, a drugi to przybliżenie. Zapisujemy wartości w zmiennej abysmy mogli dodać do niego eventlistener. Obiekt map jest wygenerowany przez lefleat

    // kafelki z których zrobione są mapy, możemy wybierać różne style
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handling clicks on map
    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus(); // dla wygody użytkownika
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // by strona się nie przeładowywyała po wysłaniu formularza

      // Clear input fields
      inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
          '';
      console.log(mapEvent);

      // Display marker
      const { lat, lng } = mapEvent.latlng;
      // tworzy marker, ustawia go na mapie, tworzy wyskakujące okienko i wiąże  je z markerem
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
          })
        )
        .setPopupContent('Workout')
        .openPopup();
    }); // metoda do evenlistenera wbudowana w lefleat, bedziemy jej używać zamiast EL.
  });

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // wybiera najbliższego rodzica (querySel..wybiera dziecko)
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // wybiera najbliższego rodzica (querySel..wybiera dziecko)
});
