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

        for (let t = 0; t <= 1; t += 0.001) {
            let x = 0;
            let y = 0;

            const n = coordinates.length - 1;
            for (let i = 0; i <= n; i++) {
                const binomialCoefficient = binomial(n, i);
                const bernsteinPolynomial = binomialCoefficient * Math.pow(t, i) * Math.pow(1 - t, n - i);

                x += bernsteinPolynomial * coordinates[i].x;
                y += bernsteinPolynomial * coordinates[i].y;
            }

            context.lineTo(x, y);
        }

        context.strokeStyle = '#000';
        context.lineWidth = isMain ? 5 : 1;
        context.stroke();
    }
}

// Dwumian Newtona
function binomial(n: number, k: number) {
    let coeff = 1;
    for (let i = n - k; i < n; i++) {
        coeff *= (i + 1);
    }
    for (let i = 1; i <= k; i++) {
        coeff /= i;
    }
    return coeff;
}

/**
 * Funkcja generująca dane ścieżki SVG
 * @param {Coordinates[]} coordinates - współrzędne  
 * @returns {string} - dane ścieżki SVG {d: ...
 */
export const generateBezierPathData = (coordinates: Coordinates[]): string => {
    if (coordinates.length < 2) return `M 0,0 L 0,0`;
    let pathData = `M ${coordinates[0].x},${coordinates[0].y}`;

    for (let t = 0; t <= 1; t += 0.001) {
        let x = 0;
        let y = 0;
        const n = coordinates.length - 1;

        for (let i = 0; i <= n; i++) {
            const binomialCoefficient = binomial(n, i);
            const bernsteinPolynomial = binomialCoefficient * Math.pow(t, i) * Math.pow(1 - t, n - i);

            x += bernsteinPolynomial * coordinates[i].x;
            y += bernsteinPolynomial * coordinates[i].y;
        }

        pathData += ` L ${x},${y}`;
    }

    return pathData;
}