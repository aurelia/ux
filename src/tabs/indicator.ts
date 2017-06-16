import { DOM } from 'aurelia-pal';

let nextAnimationId = 1;

export class Indicator {

  private readonly element: HTMLElement;
  private anchor: Element|null = null;
  private slidingPromise: Promise<void>|null = null;

  constructor(private readonly container: Element) {
    this.element = this.createElement();
    this.container.appendChild(this.element);
  }

  public dispose() {
    this.element.remove();
  }

  private createElement() {
    const element = DOM.createElement('div') as HTMLElement;
    element.classList.add('indicator');
    element.style.position = 'absolute';
    element.style.bottom = '0px';
    element.style.transformOrigin = 'left center';
    return element;
  }

  public async select(target: Element|null) {
    const previousAnchor = this.anchor;
    this.anchor = target;

    if (previousAnchor && this.anchor) {
      await this.slideTo(this.anchor);
    } else if (previousAnchor && !this.anchor) {
      this.hide();
    } else if (!previousAnchor && this.anchor) {
      this.show();
      this.moveTo(this.anchor);
    }
  }

  public async unselect() {
    await this.select(null);
  }

  public refresh() {
    if (this.anchor) {
      this.moveTo(this.anchor);
    }
  }

  private show() {
    this.element.style.display = 'block';
  }

  private hide() {
    this.element.style.display = 'none';
  }

  private moveTo(target: Element) {
    this.element.style.animation = '';
    const { left, width } = this.getCoordinates(target);
    this.element.style.left = `${left}px`;
    this.element.style.width = `${width}px`;
  }

  private async slideTo(target: Element) {
    if (this.slidingPromise) {
      await this.slidingPromise;
    }

    const { translation, scale } = this.getSlideParameters(this.element, target);
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
    this.element.style.animation = `${animationName} 0.3s ease-out 1`;

    await (this.slidingPromise = listenOnce(this.element, 'animationend', () => {
      this.moveTo(target);
      animationStyle.remove();
      this.slidingPromise = null;
    }));
  }

  private getCoordinates(element: Element) {
    const containerRect = this.container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const left = elementRect.left - containerRect.left;
    const width = elementRect.right - elementRect.left;
    return { left, width };
  }

  private getSlideParameters(from: Element, to: Element) {
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
