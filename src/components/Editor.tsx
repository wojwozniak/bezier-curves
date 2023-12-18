import { useRef, useEffect, useState, SetStateAction } from 'react';
import useSingleActionHandler from '../hooks/useSingleActionHandler';
import { isPointTooClose } from './../functions/isPointTooClose';
import { findClosestPointIndex } from './../functions/findClosestPointIndex';
import { initCanvas } from './../functions/initCanvas';
import { drawPoints } from './../functions/drawPoints';
import { drawBezierCurve } from './../functions/drawBezierCurve';
import { State } from '../types/State';
import { Coordinates } from '../types/Coordinates';
import { Curve } from '../types/Curve';

interface EditorProps {
  activeMode: State;
  updateActiveMode: React.Dispatch<React.SetStateAction<State>>;
  currentCurve: string;
  setCurveFromKeyboard: React.Dispatch<React.SetStateAction<number>>;
}

const Editor = ({ activeMode, updateActiveMode, currentCurve, setCurveFromKeyboard }: EditorProps) => {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [curveStore, setCurveStore] = useState<Curve[]>([{ label: currentCurve, coordinates: coordinates }]);
  const [oldCurve, setOldCurve] = useState<string>(currentCurve);
  const [screen, setScreen] = useState<string>("Brak ostatniej akcji.");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    initCanvas(canvas, context);

    if (oldCurve !== currentCurve) {
      setScreen("Zmiana warstwy z " + oldCurve + " na " + currentCurve + ".");
      //console.log(curveStore);
      //updateActiveMode({ label: "Dodaj punkt", dispatchTime: Date.now() });
      setSelectedPoint(null);
      const tempCurrentStore = curveStore;

      const curve = curveStore.find(curve => curve.label === oldCurve);
      if (curve) {
        //console.log("Znaleziono krzywą w store")
        curve.coordinates = coordinates;
        setCurveStore(prevCurveStore => {
          const newCurveStore = [...prevCurveStore];
          newCurveStore[newCurveStore.indexOf(curve)] = curve;
          return newCurveStore;
        });
      } else {
        //console.log("Nie znaleziono krzywej w store")
        setCurveStore(prevCurveStore => [...prevCurveStore, { label: oldCurve, coordinates: coordinates }]);
        //console.log("Zapisano krzywą ze starą nazwą w store")
      }

      // Szukamy nowych koordynatów - jeśli nie znajdziemy to dajemy nowe
      const newCoordinates = tempCurrentStore.find(curve => curve.label === currentCurve);
      if (newCoordinates) {
        setCoordinates(newCoordinates.coordinates);
      } else {
        setCoordinates([]);
      }
      setOldCurve(currentCurve);
    }

    if (!(activeMode.label === "Podgląd"
      || activeMode.label === "Eksportuj PNG"
      || activeMode.label === "Eksportuj SVG"
    )) drawPoints(coordinates, context);
    drawBezierCurve(coordinates, context, true);

    let backgroundArgument = activeMode.label === "Podgląd" || activeMode.label === "Eksportuj PNG" || activeMode.label === "Eksportuj SVG" ? true : false;
    const backgroundCurves = curveStore.filter(curve => curve.label !== currentCurve);
    backgroundCurves.forEach(curve => {
      drawBezierCurve(curve.coordinates, context, backgroundArgument);
    });

    const handleCanvasClick = (event: { clientX: number; clientY: number; }) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (activeMode.label === "Dodaj punkt") {
        setCoordinates((prevCoordinates) => {
          if (!isPointTooClose(prevCoordinates, x, y)) {
            return [...prevCoordinates, { x, y }];
          }
          return prevCoordinates;
        });
        setScreen("Dodano punkt. Liczba punktów: " + (coordinates.length + 1));
      } else if (activeMode.label === "Usuń punkt") {
        const indexToRemove = findClosestPointIndex(coordinates, x, y);
        if (indexToRemove !== -1) {
          setCoordinates((prevCoordinates) => {
            const newCoordinates = [...prevCoordinates];
            newCoordinates.splice(indexToRemove, 1);
            return newCoordinates;
          });
          setScreen("Usunięto punkt. Liczba punktów: " + (coordinates.length - 1));
        } else {
          setScreen("Nie kliknięto żadnego punktu. Spróbuj ponownie.");
        }
      } else if (activeMode.label === "Podgląd") {
        setScreen("Próba edycji podczas trybu podglądu - wyłącz tryb podglądu by edytować.")
      } else if (
        activeMode.label === "Wyczyść"
        || activeMode.label === "Eksportuj PNG"
        || activeMode.label === "Eksportuj SVG") {

        setScreen("Kliknięcie bez włączonego trybu - ustaw tryb by wykonać akcję.")
      } else if (activeMode.label === "Edytuj punkt") {
        if (selectedPoint === null) {
          const indexToMove = findClosestPointIndex(coordinates, x, y);
          if (indexToMove !== -1) {
            setSelectedPoint(indexToMove);
            setScreen("Wybrano punkt do przesunięcia.");
          } else {
            setScreen("Nie kliknięto żadnego punktu. Spróbuj ponownie.");
          }
        } else {
          setSelectedPoint(null);
          setScreen("Zakończono przesuwanie punktu.");
        }

      }
    };

    const handleCanvasMove = (event: { clientX: number; clientY: number; }) => {
      if (selectedPoint !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setCoordinates((prevCoordinates) => {
          const newCoordinates = [...prevCoordinates];
          newCoordinates[selectedPoint] = { x, y };
          return newCoordinates;
        });
      }
    };

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMove);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleCanvasMove);
    };

  }, [coordinates, activeMode, selectedPoint, currentCurve]);

  useEffect(() => {
    const handleKeyDown = (event: { key: SetStateAction<string | null>; }) => {
      setPressedKey(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    switch (pressedKey) {
      case 'q':
      case 'Q':
        updateActiveMode({ label: "Dodaj punkt", dispatchTime: Date.now() });
        break;
      case "W":
      case 'w':
        updateActiveMode({ label: "Edytuj punkt", dispatchTime: Date.now() });
        break;
      case "E":
      case 'e':
        updateActiveMode({ label: "Usuń punkt", dispatchTime: Date.now() });
        break;
      case "1":
        setCurveFromKeyboard(1);
        break;
      case "2":
        setCurveFromKeyboard(2);
        break;
      case "3":
        setCurveFromKeyboard(3);
        break;
      case "4":
        setCurveFromKeyboard(4);
        break;
      case "5":
        setCurveFromKeyboard(5);
        break;
      case "6":
        setCurveFromKeyboard(6);
        break;
      case "7":
        setCurveFromKeyboard(7);
        break;
      case "8":
        setCurveFromKeyboard(8);
        break;
      case "9":
        setCurveFromKeyboard(9);
        break;
      default:
        break;
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [pressedKey]);

  useSingleActionHandler(activeMode, setCoordinates, setScreen, canvasRef);

  return (
    <div className="canvasContainer">
      <canvas ref={canvasRef} className="canvas" />
      <p>Ostatnia akcja: {screen}</p>
      <p>Aktywny tryb: {activeMode.label}</p>
    </div>
  );
};

export default Editor;