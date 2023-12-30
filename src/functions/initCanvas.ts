/**
 * Funkcja inicjalizująca kanwę z opcją rysowania kolorowej siatki
 * @param {HTMLCanvasElement} canvas - element canvas 
 * @param {CanvasRenderingContext2D} context - kontekst canvas
 * @param {boolean} drawNet - czy rysować siatkę
 * @returns {void} 
 */
export const initCanvas = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    drawNet: boolean = false // default to false
) : void => {
    canvas.width = 400;
    canvas.height = 400;
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (drawNet) {
        const fractions = [4, 5, 7];
        const colors = ['#FF0000', '#00FF00', '#0000FF'];

        fractions.forEach((fraction, index) => {
            const stepX = canvas.width / fraction;
            const stepY = canvas.height / fraction;
            context.strokeStyle = colors[index];

            for (let x = stepX; x < canvas.width; x += stepX) {
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x, canvas.height);
                context.stroke();
            }

            for (let y = stepY; y < canvas.height; y += stepY) {
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
                context.stroke();
            }
        });
    }
};