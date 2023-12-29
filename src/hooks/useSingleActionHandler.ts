import { useEffect } from 'react';
import { State } from '../types/State';
import { Coordinates } from '../types/Coordinates';
import { generateBezierPathData } from '@/functions/drawBezierCurve';
import { Curve } from '@/types/Curve';

/**
 * Customowy hook, który obsługuje pojedyncze akcje aplikacji (wyczyszczenie kanwy, eksport SVG, eksport PNG).
 * @param {State} activeMode - aktualny tryb aplikacji
 * @param {React.Dispatch<React.SetStateAction<State>>} setActiveMode - funkcja ustawiająca tryb aplikacji
 * @param {Coordinates[]} coordinates - współrzędne {x, y}
 * @param setCoordinates - funkcja ustawiająca współrzędne
 * @param setScreen - funkcja ustawiająca komunikat na ekranie
 * @param canvasRef - referencja do elementu canvas
 * @param {Curve[]} curveStore - tablica zawierająca współrzędne punktów krzywej Beziera
 * @returns {void}
 */
const useSingleActionHandler = (
    activeMode: State,
    setActiveMode: React.Dispatch<React.SetStateAction<State>>,
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates[]>>,
    setScreen: React.Dispatch<React.SetStateAction<string>>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    curveStore: Curve[],
): void => {
    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }
        if (activeMode.label === "Wyczyść") {
            setCoordinates([]);
            setScreen("Wyczyszczono warstwę.");
        } else if (activeMode.label === "Eksportuj SVG") {
            exportSVG(canvasRef, curveStore);
            setScreen("Eksportowano SVG.");
        } else if (activeMode.label == "Eksportuj PNG") {
            exportPNG(canvasRef);
            setScreen("Eksportowano PNG.");
        }
        if (activeMode.label === "Wyczyść" || activeMode.label === "Eksportuj SVG" || activeMode.label == "Eksportuj PNG") {
            setActiveMode({ label: "Dodaj punkt", dispatchTime: Date.now() });

        }
    }, [activeMode]);
}

export default useSingleActionHandler;

const exportPNG = (canvasRef: React.RefObject<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current!;
    const data = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = data;
    downloadLink.download = 'canvas.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

const exportSVG = (canvasRef: React.RefObject<HTMLCanvasElement>, curveStore: Curve[]): void => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    curveStore.forEach((curve) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); // Create a new path for each curve
        const pathData = generateBezierPathData(curve.coordinates);
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        svg.appendChild(path);
    });

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgString], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'canvas.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}