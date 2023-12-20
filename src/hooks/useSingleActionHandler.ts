import { useEffect } from 'react';
import { State } from '../types/State';
import { Coordinates } from '../types/Coordinates';

/**
 * Customowy hook, który obsługuje pojedyncze akcje aplikacji (wyczyszczenie kanwy, eksport SVG, eksport PNG).
 * @param {State} activeMode - aktualny tryb aplikacji
 * @param setCoordinates - funkcja ustawiająca współrzędne
 * @param setScreen - funkcja ustawiająca komunikat na ekranie
 * @param canvasRef - referencja do elementu canvas
 * @returns {void}
 */
const useSingleActionHandler = (
    activeMode: State,
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
        } else if (activeMode.label === "Eksportuj SVG") {
            const canvas = canvasRef.current;
            const width = canvas.width.toString();
            const height = canvas.height.toString();
            const data = canvas.toDataURL('image/png');
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
            svg.setAttribute('viewBox', `0 0 ${canvas.width} ${canvas.height}`);
            const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', data);
            image.setAttribute('width', width);
            image.setAttribute('height', height);
            svg.appendChild(image);
            const svgData = svg.outerHTML;
            const preface = '<?xml version="1.0" standalone="no"?>\r\n';
            const svgBlob = new Blob([preface, svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'canvas.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            setScreen("Eksportowano SVG.");
        } else if (activeMode.label == "Eksportuj PNG") {
            const canvas = canvasRef.current;
            const data = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = data;
            downloadLink.download = 'canvas.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            setScreen("Eksportowano PNG.");
        }
    }, [activeMode]);
}

export default useSingleActionHandler;
