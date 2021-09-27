// W tym projekcie używamy koncepcji zwanej - USER STORIES.

// 1. USER STORIES -> 2. FEATURES -> 3. FLOWCHART -> 4. ARCHITECTURE (etap planowania) -> DEWELOPMENT STEP

// 1. Jest to opis funkcjonalności aplikacji z perspektywy użytkownika, ogólny jej przegląd. Taki przegląd pozwala nam określić....
// 2. ... funkcje które musimy wdrożyć aby aplikacja funkcjonowała zgodnie z zamierzeniami.
// 3. Wizualizacja działań, których uzytkownik może wykonać i jak program reaguje na te działania. Schemat blokowy. (Co budujemy)
// 4. Organizacja kodu, to co trzyma nasz kod w całości. (jak budujemy)
// Krok deweloperski - wdrażanie naszego planu przy uzyciu kodu.

////////////// USER STORIES
// Ogólny format: Jako [rodzaj usera], chcę wykonać [akcja], aby [uzyskac korzyść]. Czyli kto? co? i dlaczego?

// W tym projekie:
// 1. Jako użytkownik chcę rejstrować moje treningi biegowe z lokalizacją, dystansem, czasem, tempem i krokami na minute, aby prowadzić dziennik wszystkich biegów.
// 2. Jako użytkownik chcę rejstrować moje treningi rowerowe z lokalizacją, dystansem, czasem, tempem i wzrostem wysokości, aby prowadzić dziennik wszystkich moich jazd na rowerze.
// 3. Jako użytkownik chcę zobaczyć wszystkie moje treningi na pierwszy rzut oka, aby móc łatwo śledzić swoje postępy.
// 4. Jako uzytkownik chcę zobaczyć wszystkie moje treningi na mapie, aby sprawwdzić gdzie ćwiczę najczęściej.
// 5. Jako użytkownik chcę zobaczyć moje postępy kiedy wyjdę z aplikacji i wrócę później, więc mogę korzystać z niej cały czas.

// dzięki temu możemy rozplanować aplikacje niezbędne do nastepnego kroku.

////////////// FEATURES

// 1. Będę potrzebował:
// - mapy gdzię kliknę by dodać nowy trening (najlepszy sposób by zdobyć koordynaty).
// - geolokacji by wyświetlić mapę w bieżącej lokalizacji użytkownika (bardziej przyjazne użytkownikowi niz scrollowanie np.).
// - formularz do wypełnienia pozostałych danych.
// 2. To samo co wyżej, tylko inny formularz.
// 3. Lista wszystkich treningów.
// 4. Funkcja która będzie wyświetlać wszystkie treningi na mapie.
// 5. Zachowanie danych w local storage API. Przy zalogowaniu strony, wczytanie danych zapisanych w local storage i na liście.

////////////// FLOWCHARTS

// Schemat blokowy powinien zawierać różne funkcje, które zamierzamy zaimplementować ale też i info, jakie różne cześci apklikacji współdziałają ze sobą, a także jak dane przepływają w całej aplikacji.

// Gdy tworzymy taki schemat, dobrze zacząć od wydarzeń.
// Dokładny schemat w innym pliku. Żółte - akcja, zielone - gdy coś renderujemy, czerwone - async

// Załadowanie strony -> pobranie współrzędnych lokalizacji za pomocą API (1) -> wyrenderowanie mapy wyśrodkowanej na bieżącej lokalizacji użytkownika (2) ---- Kliknięcie na mapę -> renderowanie formularza (3)(4) ---- Potwierdzenie nowego treningu -> renderowanie treningu na mapie (5) oraz renderowanie treningu na liście (6) oraz zapisanie danych w przeglądarce (7). (8) wczytanie danych przy każdym ponownym załadowaniu strony. (9) Kliknięcie na trening z listy -> przesunięcie mapy na lokalizacje treningu.

// W real-world projekcie nie zawsze wymyśla się wszystkie kroki na schemacie bezpośrednio na etapie planowania. Można tu stworzyć szkic i początek, a dokładne szczegóły podczas implementacji. Nie trzeba skupiac się na tworzeniu idealnego schematu!!!!

// Schematy blokowe nie mają jeszcze nic wspólnego z samą implementacją.

////////////// ARCHITECTURE

// Podobnie jak flowchartsy, nie potrzebujemy ostatecznej architektury przed wdrożeniem, abysmy mogli poeksperymentować, pobawić się kodem. W tym projekcie to omijamy na początku.

// Architektura polega na nadaniu projektowi struktury, a potem możemy rozwijać funkcjonalność.
// W tym projekcie główna architektura będzie pochodzić z klas i obiektów.
// Główna klasa będzie posiadać wspólne części dystans, czas i lokalizacja, a dzieci dodatkowo cadence, pace speed i elevation gain.
// Każda klasa jest reprezentowana przez takie pudełko jak w osobnych plikach, w górnej części właściwości a w dolnej metody.
// Zdarzenia które mamy to: ładowanie strony, otrzymanie pozycji z API geolokalizacji, kliknięcie na mape, zmiana rodzaju treningu i zatwierdzenie formularza. Musimy stworzyc funkcje które będą je obsługiwać.
// W tym celu tworzymy dużą klasę App, która będzie przechowywać wszystkie te funkcje jako metody.

///////////                Kod przed refaktoryzacja !!!!!!!!!!

//   let map, mapEvent;
//   // Pobieranie geolokacji
//   // funkcja przyjmuje dane wejsciowe do funkcji zwrotnych, jedna z nich to sukcesu (gdy przeglądarka uzyska współrzędne bieżącej lokalizacji), a druga błędu (gdy wystąpi błąd przy pobieraniu)
//   if (navigator.geolocation)
//     navigator.geolocation.getCurrentPosition(function (position) {
//       const latitude = position.coords.latitude;
//       const { longitude } = position.coords; // zastosowanie destrukturyzacji. Tworzy się zmienna longiute na podstawie właściwości longitude tego obiektu
//       // console.log(`https://www.google.pl/maps/@${latitude},${longitude}`);

//       const coords = [latitude, longitude];

//       map = L.map('map').setView(coords, 13); // koordynaty, a drugi to przybliżenie. Zapisujemy wartości w zmiennej abysmy mogli dodać do niego eventlistener. Obiekt map jest wygenerowany przez lefleat

//       // kafelki z których zrobione są mapy, możemy wybierać różne style
//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       // Handling clicks on map
//       map.on('click', function (mapE) {
//         mapEvent = mapE;
//         form.classList.remove('hidden');
//         inputDistance.focus(); // dla wygody użytkownika
//       });

//       form.addEventListener('submit', function (e) {
//         e.preventDefault(); // by strona się nie przeładowywyała po wysłaniu formularza

//         // Clear input fields
//         inputDistance.value =
//           inputDuration.value =
//           inputCadence.value =
//           inputElevation.value =
//             '';
//         console.log(mapEvent);

//         // Display marker
//         const { lat, lng } = mapEvent.latlng;
//         // tworzy marker, ustawia go na mapie, tworzy wyskakujące okienko i wiąże  je z markerem
//         L.marker([lat, lng])
//           .addTo(map)
//           .bindPopup(
//             L.popup({
//               maxWidth: 250,
//               minWidth: 100,
//               autoClose: false,
//               closeOnClick: false,
//               className: 'running-popup',
//             })
//           )
//           .setPopupContent('Workout')
//           .openPopup();
//       }); // metoda do evenlistenera wbudowana w lefleat, bedziemy jej używać zamiast EL.
//     });

//   inputType.addEventListener('change', function () {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // wybiera najbliższego rodzica (querySel..wybiera dziecko)
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // wybiera najbliższego rodzica (querySel..wybiera dziecko)
//   });
