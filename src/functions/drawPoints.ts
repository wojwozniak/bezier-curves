/**
 * Funkcja rysująca punkty na kanwie
 * @param {Coordinates[]} coordinates - współrzędne
 * @param {CanvasRenderingContext2D} context - kontekst canvas
 * @returns {void}
 */
export const drawPoints = (
    coordinates: Coordinates[],
    context: CanvasRenderingContext2D
): void => {
    coordinates.forEach(({ x, y }, index) => {
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fillStyle = index === coordinates.length - 1 ? '#FF0000' : '#000';
        context.strokeStyle = index === coordinates.length - 1 ? '#FF0000' : '#000';
        context.fill();
        context.stroke();
    });
};