# Edytor krzywych Beziera

## Opis
Część pierwsza rozwiazania zadania na konkurs 2 z Analizy Numerycznej (L)


Autor: Wojciech Woźniak

## Uruchomienie
Można uruchomić lokalnie po sklonowaniu repozytorium i zainstalowaniu zależności:

```
npm install
npm run build
npm run preview
```

Chociaż lepiej skorzystać ze skompilowanej wersji na GitHub Pages: #TODO - link#


## Użytkowanie
Po uruchomieniu aplikacji można wybrać jeden z trzech trybów:
### Dodawanie punktów
Podczas tego trybu, każde kliknięcie w kanvę dodaje nowy punkt do krzywej. Punkty będą łączone krzywą Beziera. Zablokowana jest opcja dodania dwóch puntków w jedno miejsce - min. odległość między punktami to 7px. Najnowszy punkt jest zawsze zaznaczony na czerwono.
### Przesuwanie punktów
Podczas tego trybu można przeciągać punkty krzywej. Kliknij, przesuń myszkę, kliknij ponownie.
### Usuwanie punktów
Podczas tego trybu można usuwać punkty krzywej. Kliknięcie usuwa najbliższy punkt (jeśli jest w odległości mniejszej niż 7px od punktu kliknięcia).

### Skrót klawiszowy
Można też użyć skrótu klawiszowego `Q`, `W` lub `E` aby przełączyć się na odpowiedni tryb.

## Oprócz tego mamy cztery funkcje:

### Wyczyść kanwę
Usuwa wszystkie punkty z krzywej.
### Podgląd krzywej
Ukrywa punkty kontrolne i pokazuje tylko krzywą.
### Eksportuj PNG
Eksportuje obrazek z krzywą do pliku PNG.
### Eksportuj SVG
Eksportuje obrazek z krzywą do pliku SVG.

## Warstwy

Aplikacja obsługuje tworzenie warstw - każda z osobną krzywą - przycisk w prawym górnym rogu.
Jest skrót klawiszowy do zmiany warstwy - `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`. Można stworzyć więcej warstw, ale brakuje już cyfr :(


## Użyte technologie
- React
- react-icons
- vite


## Druga część zadania
Druga część zadania to stworzenie min. 10 liter własnej czcionki - #TODO