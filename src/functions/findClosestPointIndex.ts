import { Coordinates } from "../types/Coordinates";

/**
 * Funkcja szuka najbliższego punktu do podanych współrzędnych i zwraca jego indeks w tablicy
 * @param {Coordinates[]} coords - współrzędne 
 * @param {number} x - współrzędna x punktu do porównania
 * @param {number} y - współrzędna y punktu do porównania 
 * @returns {number} - indeks najbliższego punktu
 */
export const findClosestPointIndex = (
    coords: Coordinates[],
    x: number,
    y: number
): number => {
    let minDistance = Infinity;
    let closestIndex = -1;

    coords.forEach((point, index) => {
        const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
        if (distance < 7 && distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
};