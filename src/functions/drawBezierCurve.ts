import { Coordinates } from "../types/Coordinates";

/**
 * Funkcja rysująca krzywą beziera
 * @param {Coordinates[]} coordinates - współrzędne 
 * @param {CanvasRenderingContext2D} context - kontekst canvas 
 * @param {boolean} isMain - czy krzywa jest główną krzywą na ekranie
 * @returns {void} 
 */
export const drawBezierCurve = (
    coordinates: Coordinates[],
    context: CanvasRenderingContext2D,
    isMain: boolean
): void => {
    if (coordinates.length > 1) {
        context.beginPath();
        context.moveTo(coordinates[0].x, coordinates[0].y);

        /* #TODO: Narysuj bezier customową funkcją */
        for (let i = 1; i < coordinates.length - 2; i++) {
            const xc = (coordinates[i].x + coordinates[i + 1].x) / 2;
            const yc = (coordinates[i].y + coordinates[i + 1].y) / 2;
            context.quadraticCurveTo(coordinates[i].x, coordinates[i].y, xc, yc);
        }

        // Ostatni bezier
        context.quadraticCurveTo(
            coordinates[coordinates.length - 2].x,
            coordinates[coordinates.length - 2].y,
            coordinates[coordinates.length - 1].x,
            coordinates[coordinates.length - 1].y
        );

        context.strokeStyle = isMain ? '#000' : '#aaa';
        context.lineWidth = isMain ? 10 : 1;
        context.stroke();
    }
}