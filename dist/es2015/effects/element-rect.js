/**
 * Provides the utilities for getting element's metrics.
 */
export class ElementRect {
    /**
     * Initializes a new instance of the `ElementRect` class with the specified `element`.
     */
    constructor(element) {
        this.element = element;
        this.width = this.boundingRect.width;
        this.height = this.boundingRect.height;
        this.size = Math.max(this.width, this.height);
    }
    /**
     * Returns the center coordinates of the current element.
     */
    get center() {
        return {
            x: this.width / 2,
            y: this.height / 2
        };
    }
    /**
     * Returns the size of the current element and its position relative to the viewport.
     */
    get boundingRect() {
        return this.element.getBoundingClientRect();
    }
    /**
     * Calculates euclidean distance between two points.
     * @param point1 - Start point
     * @param point2 - End point
     * @returns Distance between two points.
     */
    static euclideanDistance(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }
    /**
     * Calculates the distance between given point and farthest corner of the current element.
     * @param The point object containing x and y coordinates.
     * @returns Distance from a point to the container's farthest corner.
     */
    distanceToFarthestCorner({ x = 0, y = 0 }) {
        return Math.max(ElementRect.euclideanDistance({ x, y }, { x: 0, y: 0 }), ElementRect.euclideanDistance({ x, y }, { x: this.width, y: 0 }), ElementRect.euclideanDistance({ x, y }, { x: 0, y: this.height }), ElementRect.euclideanDistance({ x, y }, { x: this.width, y: this.height }));
    }
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
    contains(ev) {
        const l = this.boundingRect.left;
        const t = this.boundingRect.top;
        const w = this.boundingRect.width;
        const h = this.boundingRect.height;
        const x = ev.x || ev.clientX || 0;
        const y = ev.y || ev.clientY || 0;
        return x >= l && x <= l + w && y >= t && y <= t + h;
    }
}
