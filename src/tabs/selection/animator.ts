import { DOM } from 'aurelia-pal';

let nextAnimationId = 1;

export class SelectionAnimator {

  private readonly element = this.createElement();
  private slidingPromise: Promise<void>|null = null;

  constructor(private readonly container: Element) {
    this.container.appendChild(this.element);
    this.hide();
  }

  private get coordinates() {
    return this.getCoordinates(this.element);
  }

  public dispose() {
    this.element.remove();
  }

  private createElement() {
    const element = DOM.createElement('div') as HTMLElement;
    element.classList.add('indicator');
    element.style.position = 'absolute';
    element.style.transformOrigin = 'left center';
    return element;
  }

  public async transition(from: Element, to: Element) {
    if (this.slidingPromise) {
      await this.slidingPromise;
    }

    const { translation, scale } = this.getTransitionParameters(from, to);
    const animationName = `ux-tabs-indicator-slide-${nextAnimationId++}`;
    const keyFrames = `@keyframes ${animationName} {
      0% {
        transform: translateX(0) scaleX(1);
      }
      100% {
        transform: translateX(${translation}px) scaleX(${scale});
      }
    }`;

    const animationStyle = DOM.injectStyles(keyFrames) as Element;

    from.classList.add('transitioning');
    to.classList.add('transitioning');

    this.show();
    this.moveTo(from);

    this.element.style.animation = `${animationName} 0.3s ease-out`;

    await (this.slidingPromise = listenOnce(this.element, 'animationend', () => {
      this.moveTo(to);
      this.hide();

      from.classList.remove('transitioning');
      to.classList.remove('transitioning');

      animationStyle.remove();
      this.slidingPromise = null;
    }));
  }

  private show() {
    this.element.style.display = 'block';
  }

  private hide() {
    this.element.style.display = 'none';
  }

  private moveTo(target: Element) {
    this.element.style.animation = '';
    const targetCoordinates = this.getCoordinates(target);
    this.element.style.left = `${targetCoordinates.left}px`;
    this.element.style.width = `${targetCoordinates.width}px`;
  }

  private getCoordinates(element: Element) {
    const elementRect = element.getBoundingClientRect();
    const nearestPositionedAncestor = this.findNearestPositionedAncestor(element);
    const offset = nearestPositionedAncestor
      ? nearestPositionedAncestor.getBoundingClientRect()
      : { left: 0, top: 0 };
    return {
      left: elementRect.left - offset.left,
      right: elementRect.right - offset.left,
      top: elementRect.top - offset.top,
      bottom: elementRect.bottom - offset.top,
      width: elementRect.right - elementRect.left,
      height: elementRect.bottom - elementRect.top
    };
  }

  private findNearestPositionedAncestor(element: Element): HTMLElement|null {
    if (!element.parentElement) {
      return null;
    } else if (DOM.getComputedStyle(element.parentElement).position !== 'static') {
      return element.parentElement;
    } else {
      return this.findNearestPositionedAncestor(element.parentElement);
    }
  }

  private getTransitionParameters(from: Element, to: Element) {
    const fromCoordinates = this.getCoordinates(from);
    const toCoordinates = this.getCoordinates(to);

    const translation = toCoordinates.left - fromCoordinates.left;
    const scale = toCoordinates.width / fromCoordinates.width;

    return { translation, scale };
  }
}

function listenOnce(target: Element, event: string, callback: () => void) {
  return new Promise<void>(resolve => {
    const handler = () => {
      target.removeEventListener(event, handler);
      callback();
      resolve();
    };
    target.addEventListener(event, handler);
  });
}
