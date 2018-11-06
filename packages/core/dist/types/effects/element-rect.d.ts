import { Point } from './point';
/**
 * Provides the utilities for getting element's metrics.
 */
export declare class ElementRect {
    private element;
    /**
     * Returns the width of the current element.
     */
    width: number;
    /**
     * Returns the height of the current element.
     */
    height: number;
    /**
     * Returns the size (the biggest side) of the current element.
     */
    size: number;
    /**
     * Initializes a new instance of the `ElementRect` class with the specified `element`.
     */
    constructor(element: HTMLElement);
    /**
     * Returns the center coordinates of the current element.
     */
    readonly center: Point;
    /**
     * Returns the size of the current element and its position relative to the viewport.
     */
    readonly boundingRect: ClientRect | DOMRect;
    /**
     * Calculates euclidean distance between two points.
     * @param point1 - Start point
     * @param point2 - End point
     * @returns Distance between two points.
     */
    static euclideanDistance(point1: Point, point2: Point): number;
    /**
     * Calculates the distance between given point and farthest corner of the current element.
     * @param The point object containing x and y coordinates.
     * @returns Distance from a point to the container's farthest corner.
     */
    distanceToFarthestCorner({ x, y }: Point): number;
    /**
     * Determines if the specified point is contained within this element.
     * @param {(Event|Object)} ev - The object containing coordinates of the point.
     * @param {Number} ev.x - The `x` coordinate of the point.
     * @param {Number} ev.y - The `y` coordinate of the point.
     * @param {Number} ev.clientX - The `x` coordinate of the point.
     * @param {Number} ev.clientY - The `y` coordinate of the point.
     * @returns {Boolean} Returns `true` if the `x` and `y` coordinates of point is a
     * point inside this element's rectangle, otherwise `false`.
     */
    contains(ev: any): boolean;
}
