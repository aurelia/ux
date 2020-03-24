import { UxDrawer } from '../ux-drawer';

export function findDrawer(item: HTMLElement | null): UxDrawer | null {
  let element = item;
  if (element === null) return null;
  while (element.tagName !== 'BODY' && element.tagName !== 'UX-DRAWER') {
    element = element.parentElement;
    if (element === null) return null;
  }
  if (element.tagName === 'UX-DRAWER') {
    const el: any = element;
    if (
      el !== null &&
      el.au !== undefined &&
      el.au['ux-drawer'] !== undefined &&
      el.au['ux-drawer'].viewModel instanceof UxDrawer) {
      return el.au['ux-drawer'].viewModel;
    }
  }
  return null;
}
