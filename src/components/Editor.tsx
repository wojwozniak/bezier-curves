import { useRef, useEffect, useState, SetStateAction } from 'react';
import useSingleActionHandler from '../hooks/useSingleActionHandler';
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

const Editor = ({ activeMode, currentCurve, setCurveFromKeyboard }: EditorProps) => {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [curveStore, setCurveStore] = useState<Curve[]>([{ label: currentCurve, coordinates: coordinates }]);
  const [oldCurve, setOldCurve] = useState<string>(currentCurve);
  const [screen, setScreen] = useState<string>("Brak ostatniej akcji.");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    // ### Inicjalizacja canvasa ###
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    initCanvas(canvas, context);

    // ### Aktualizacja - zmiana warstwy ###
    const handleLayerChange = () => {
      setScreen("Zmiana warstwy z " + oldCurve + " na " + currentCurve + ".");
      setSelectedPoint(null);
      const tempCurrentStore = curveStore;

      const curve = curveStore.find(curve => curve.label === oldCurve);
      if (curve) {
        curve.coordinates = coordinates;
        setCurveStore(prevCurveStore => {
          const newCurveStore = [...prevCurveStore];
          newCurveStore[newCurveStore.indexOf(curve)] = curve;
          return newCurveStore;
        });
      } else {
        setCurveStore(prevCurveStore => [...prevCurveStore, { label: oldCurve, coordinates: coordinates }]);
      }

      const newCoordinates = tempCurrentStore.find(curve => curve.label === currentCurve);
      if (newCoordinates) {
        setCoordinates(newCoordinates.coordinates);
      } else {
        setCoordinates([]);
      }
      setOldCurve(currentCurve);
    }
    if (oldCurve !== currentCurve) handleLayerChange();

    // ### Rysowanie krzywej ###
    const draw = () => {
      if (!(activeMode.label === "Podgląd włączony"
        || activeMode.label === "Eksportuj PNG"
        || activeMode.label === "Eksportuj SVG"
      )) drawPoints(coordinates, context);
      drawBezierCurve(coordinates, context, true);

      let backgroundArgument = activeMode.label === "Podgląd włączony"
        || activeMode.label === "Eksportuj PNG"
        || activeMode.label === "Eksportuj SVG"
        ? true : false;
      const backgroundCurves = curveStore.filter(curve => curve.label !== currentCurve);
      backgroundCurves.forEach(curve => {
        drawBezierCurve(curve.coordinates, context, backgroundArgument);
      });
    }
    draw();

    // ### Usuwanie punktu ###
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      if (activeMode.label === "Podgląd") {
        setScreen("Próba edycji podczas trybu podglądu - wyłącz tryb podglądu by edytować.");
        return;
      }
      if (selectedPoint !== null) {
        setScreen("Zakończ przesuwanie punktu zanim spróbujesz usunąć.");
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
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
    }

    // ### Dodawanie i edytowanie punktów ###
    const handleCanvasClick = (event: { clientX: number; clientY: number; }) => {
      if (activeMode.label === "Podgląd") {
        setScreen("Próba edycji podczas trybu podglądu - wyłącz tryb podglądu by edytować.");
        return;
      }

      if (selectedPoint) {
        setSelectedPoint(null);
        setScreen("Zakończono przesuwanie punktu.");
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const findClosest = findClosestPointIndex(coordinates, x, y);
      if (findClosest !== -1) {
        if (selectedPoint === null) {
          setSelectedPoint(findClosest);
          setScreen("Wybrano punkt do przesunięcia.");
        }
      } else {
        setScreen("Dodano punkt. Liczba punktów: " + (coordinates.length + 1));
        setCoordinates((prevCoordinates) => {
          return [...prevCoordinates, { x, y }];
        });
      }
    }

    // ### Przesuwanie punktów ###
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
    canvas.addEventListener('contextmenu', handleRightClick);
    canvas.addEventListener('mousemove', handleCanvasMove);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('contextmenu', handleRightClick);
      canvas.removeEventListener('mousemove', handleCanvasMove);
    };

  }, [coordinates, activeMode, selectedPoint, currentCurve]);

  useEffect(() => {
    const handleKeyDown = (event: { key: SetStateAction<string | null>; }) => {
      setPressedKey(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    switch (pressedKey) {
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
    <div className="flex items-center justify-center flex-col">
      <canvas ref={canvasRef} className="border-2 border-gray-300 bg-white mb-4" />
      <p className='my-2'>Ostatnia akcja: {screen}</p>
      <p className='my-2'>Aktywny tryb: {activeMode.label}</p>
    </div>
  );
};

export default Editor;