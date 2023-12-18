/**
 * Funkcja inicjalizująca kanwę
 * @param {HTMLCanvasElement} canvas - element canvas 
 * @param {CanvasRenderingContext2D} context - kontekst canvas
 * @returns {void} 
 */
export const initCanvas = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
) : void => {
    canvas.width = 375;
    canvas.height = 375;
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
}