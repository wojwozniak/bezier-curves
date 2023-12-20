import { useEffect } from 'react';
import { State } from '../types/State';
import { Coordinates } from '../types/Coordinates';
import { generateBezierPathData } from '@/functions/drawBezierCurve';

/**
 * Customowy hook, który obsługuje pojedyncze akcje aplikacji (wyczyszczenie kanwy, eksport SVG, eksport PNG).
 * @param {State} activeMode - aktualny tryb aplikacji
 * @param {React.Dispatch<React.SetStateAction<State>>} setActiveMode - funkcja ustawiająca tryb aplikacji
 * @param {Coordinates[]} coordinates - współrzędne {x, y}
 * @param setCoordinates - funkcja ustawiająca współrzędne
 * @param setScreen - funkcja ustawiająca komunikat na ekranie
 * @param canvasRef - referencja do elementu canvas
 * @returns {void}
 */
const useSingleActionHandler = (
    activeMode: State,
    setActiveMode: React.Dispatch<React.SetStateAction<State>>,
    coordinates: Coordinates[],
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates[]>>,
    setScreen: React.Dispatch<React.SetStateAction<string>>,
    canvasRef: React.RefObject<HTMLCanvasElement>
): void => {
    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }
        if (activeMode.label === "Wyczyść") {
            setCoordinates([]);
            setScreen("Wyczyszczono warstwę.");
            return;
        } else if (activeMode.label === "Eksportuj SVG") {
            exportSVG(canvasRef, coordinates);
            setScreen("Eksportowano SVG.");
        } else if (activeMode.label == "Eksportuj PNG") {
            exportPNG(canvasRef);
            setScreen("Eksportowano PNG.");
        }
        setActiveMode({ label: "Dodaj punkt", dispatchTime: Date.now() });
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

const exportSVG = (canvasRef: React.RefObject<HTMLCanvasElement>, coordinates: Coordinates[]): void => {
    if (!canvasRef.current || coordinates.length < 2) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = generateBezierPathData(coordinates);
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

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