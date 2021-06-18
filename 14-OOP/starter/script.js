'use strict';

//////////////// Object-Oriented Programming (OOP)
// OOP to paradygmat (styl kodu, jak piszemy i organizujemy go) programowania oparty na koncepcji obiektów.
// Używamy obiektów do modelowania, wyrażania aspektów świata rzeczywistego takich jak uzytkownik czy lista zadań do wykonania, lub do bardziej abstrakcyjnych funkcji jak komponent HTML czy struktura danych.
// Obiekty mogą zawierać dane, które nazywamy właściwościami (properties) oraz kody - który nazywamy metodami. Używając obiektów, pakujemy wszystkie dane do odpowiednich zachowań w jeden duży blok. To sprawia, że działanie bezpośrednio na danych jest bardzo łatwe.
// W OOP obiekty są samodzielnymi fragmentami kodu lub blokami kodu, takimi jak samodzielne małe aplikacje.
// Używamy tych obiektów jako elementów składowych naszej aplikacji i sprawiamy, że obiekty wchodzą ze sobą w interakcje.
// Interakcje te odbywają się za pośrednictwem tzw interfejsu publicznego (API) który jest zbiorem metod do których można uzyskać dostęp poza obiektami i których używamy do komunikacji z obiektem.
// OOP wynaleziono w celu organizacji kodu, aby był bardziej elastyczny i łatwiejszy w utrzymaniu. Pomaga uniknąć tzw 'spaghetti code' czyli szalonego, nie uporządkowanego kodu (rozproszony kod w wielu funkcjach czy w global scope bez żadnej struktury).

//////////////                Classes
// Klasa to mniej więcej plan który może być używany do tworzenia nowych obiektów. Obiekty są tworzone w oparciu o zasady opisane w klasie.
// JS nie obsługuje prawdziwych klas, jest to taki pogląd myślowy. Zawiera ona opis danych, ale nie są to rzeczywiste dane.

// new User('jonas')

// Instancja jest prawdziwym obiektem, którego możemy użyć w kodzie, który został utworzony z klasy. Klasa sama w sobie nie jest obiektem. Mozemy użyć tej klasy do stworzenia tylu instancji ile nam potrzeba - obiekty te mogą zawierać różne dane, ale wszystkie mają tą samą funkcjonalność.

///// Istnieją 4 podstawowe zasady, które moga nas poprowadzić w dobrej implementacji/konstrukcji klasy:

////           Abstraction
// Abstrakcja czyli ukrywanie/ignorowanie szczegółów, które nie mają znaczenia. Pozwala nam uzyskać ogólną perspektywę tego, co wdrażamy, zamiast mieszać ze szczegółami które nie mają znaczenia dla naszej implementacji.
// Na przykładznie obiektu-telefonu, nie potrzeba nam znać danych typu temperatura, napięcie, czy ma wibracje i jak to wszystko działa. Wystarczy nam wiedziec, że ma wyswietlacz, klawisze i że się ładuje.
// Abstrakcji używamy także poza OOP np. eventListener nie wiemy co się dzieje za kulisami i nie musimy tego wiedzieć. Szczegóły niskiego poziomu dotyczące jak coś działa dokładnie, zostały ukryte. Jestesmy użytkownikami i niektóre funkcje możemy użyć bez zrozumienia i konieczności jej samodzielnego wdrażania.

////           Encapsulation
// Hermetyzacja oznacza zachowanie prywatności niktórych właściwości i metod wewnętrznej klasy tak, aby nie były dostępne z zewnątrz klasy. Niektóre metody mogą jednak zostać ujawnione jako API.
// Dzięki zamknęciu tych krytycznych właściwości w ten sposób zapobiegamy przypadkowemu manipulowaniu tym stanem wewnętrzym przez zewnętrzny kod.
// API to wszystkie metody, które nie są prywatne - nie są hermetyzowane.
// Gdyby niektóre metody były dostępne dla całego naszego kodu, wtedy zmiana implementacji metody może uszkodzić kod, który na niej polega. Pomaga to uniknąć błędów oraz kodu spaghetti. Dlatego istnieje hermetyzacja i prywatne metody i właściwości.
// Naszym celem zawsze powinno byc ładne ujęcie większości naszego stanu i metod pozostawiając jedynie podstawowe metody publiczne.

////           Inheritance
// Dziedziczenie udostępnia wszystkie właściwości i metody określonej klasy nadrzędnej, klasie potomnej (jest bardziej specyficzna). Celem tego jest wykorzystanie logiki wspólnej dla obu klas, aby sie nie powtarzać. Klasa potomna posiada więc pewne metody i właściwości rodzica oraz pewne swoje własne.
// Np klasy User i Admin - Admin ma te same funkcje to User, ale ma też kilka dodatkowych opcji, czyli jest też użytkownikiem ale rozszerzonym.

////           Polymorphism
// Polimorfizm oznacza, że klasa potomna może nadpisać metodę odziedziczoną, czyli może być np bardziej złożona. Np admin potrzebował by 2składnikowego logowania a user 1.
// Nadpisywanie jest proste - piszemy nową metodę o tej samej nazwie.