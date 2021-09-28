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

// zajęcia treningowe, ale nigdy na nich nie utworzymy treningu
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // unikalne id abyśmy mogli wyszukać łatwo konkretne (tu daje nam znacznik aktualnej daty)

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace(); // dajemy w konstruktorze by natychmiast obliczyć tempo (przeciwieństwo prędkości)
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([20, -5], 5.2, 5, 10);
// const cyc1 = new Cycling([20, -5], 50.2, 20, 100);
// console.log(run1, cyc1);

///////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;

  // wywoływuje się od razu po utworzeniu nowego obiektu z tej klasy
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); // funkcja zwrotna, trzeba ręcznie ustawic this na ten obiekt
    inputType.addEventListener('change', this._toggleElevationField); // funkcja nie używa słowa kluczowego więc nie musimy przypisywać
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // jest to funkcja zwrotna więc sami jej nie wywołujemy. this jest undefined, więc musimy ręcznie ustawić
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    console.log(this);
    this.#map = L.map('map').setView(coords, 13);

    // kafelki z których zrobione są mapy, możemy wybierać różne style
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // sprawdza czy dane wejściowe są  liczbą skończoną

    e.preventDefault();

    // Pobierz dane z formularza
    const type = inputType.value;
    const distance = +inputDistance.value; // konwertowanie na liczbę
    const duration = +inputDuration.value;

    // Jeżeli trening jest biegiem, utwórz obiekt z bieganiem
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Sprawdź czy dane są prawidłowe
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers');
    }

    // Jeżeli trening jest jazdą na rowerze, utwórz obiekt z jazdą na rowerze.
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (!validInputs(distance, duration, elevation))
        return alert('Inputs have to be positive numbers');
    }

    // Dodaj obiekt do tablicy treningów

    // Wyświetl trening na mapie jako marker
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
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

    // Wyświetl trening na liście

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Display marker
  }
}

const app = new App();
