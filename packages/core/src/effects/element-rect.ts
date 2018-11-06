import { Point } from './point';

/**
 * Provides the utilities for getting element's metrics.
 */
export class ElementRect {
  /**
   * Returns the width of the current element.
   */
  public width: number;

  /**
   * Returns the height of the current element.
   */
  public height: number;
  /**
   * Returns the size (the biggest side) of the current element.
   */
  public size: number;

  /**
   * Initializes a new instance of the `ElementRect` class with the specified `element`.
   */
  constructor(private element: HTMLElement) {
    this.width = this.boundingRect.width;
    this.height = this.boundingRect.height;
    this.size = Math.max(this.width, this.height);
  }

  /**
   * Returns the center coordinates of the current element.
   */
  get center(): Point {
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
  public static euclideanDistance(point1: Point, point2: Point) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  }

  /**
   * Calculates the distance between given point and farthest corner of the current element.
   * @param The point object containing x and y coordinates.
   * @returns Distance from a point to the container's farthest corner.
   */
  public distanceToFarthestCorner({ x = 0, y = 0 }: Point) {
    return Math.max(
      ElementRect.euclideanDistance({ x, y }, { x: 0, y: 0 }),
      ElementRect.euclideanDistance({ x, y }, { x: this.width, y: 0 }),
      ElementRect.euclideanDistance({ x, y }, { x: 0, y: this.height }),
      ElementRect.euclideanDistance({ x, y }, { x: this.width, y: this.height })
    );
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
  public contains(ev: any) {
    const l = this.boundingRect.left;
    const t = this.boundingRect.top;
    const w = this.boundingRect.width;
    const h = this.boundingRect.height;
    const x = ev.x || ev.clientX || 0;
    const y = ev.y || ev.clientY || 0;

    return x >= l && x <= l + w && y >= t && y <= t + h;
  }
}
