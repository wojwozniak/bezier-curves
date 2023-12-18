import { Coordinates } from "../types/Coordinates";

/**
 * Funkcja sprawdza czy podane współrzędne są zbyt blisko jakiegokolwiek punktu na ekranie
 * @param {Coordinates[]} coords - współrzędne 
 * @param {number} x - współrzędna x punktu do porównania 
 * @param {number} y - współrzędna y punktu do porównania 
 * @returns {boolean}
 */
export const isPointTooClose = (
    coords : Coordinates[],
    x : number,
    y : number
) : boolean => {
    return coords.some((point) => {
        const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
        return distance < 2;
    });
};