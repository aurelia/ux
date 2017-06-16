import { BindingEngine, Disposable } from 'aurelia-framework';

export interface Selectable {
  element: Element;
  selected: boolean;
}

export class SelectablesObserver<T extends Selectable> {

  constructor(
    private readonly bindingEngine: BindingEngine,
    private readonly selectedChanged: (item: T) => void
  ) {}

  private readonly subscriptions = new Map<T, Disposable[]>();

  public update(items: T[]) {
    this.subscriptions.forEach((subscriptions, item) => {
      if (!items.includes(item)) {
        subscriptions.forEach(s => s.dispose());
        this.subscriptions.delete(item);
      }
    });

    items.forEach(item => {
      if (!this.subscriptions.has(item)) {
        this.subscriptions.set(item, [
          this.registerSelectWhenClicked(item),
          this.observeSelected(item)
        ]);
      }
    });
  }

  private registerSelectWhenClicked(item: T): Disposable {
    item.element.addEventListener('click', () => { item.selected = true; });
    return {
      dispose() {
        item.element.removeEventListener('click', () => { item.selected = true; });
      }
    };
  }

  private observeSelected(item: T): Disposable {
    return this.bindingEngine
      .propertyObserver(item, 'selected')
      .subscribe(() => this.selectedChanged(item));
  }

  public clear() {
    this.subscriptions.forEach((subscriptions, _) => subscriptions.forEach(s => s.dispose()));
    this.subscriptions.clear();
  }
}
