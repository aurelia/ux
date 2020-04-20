import { UxModal } from '../ux-modal';

export function findModal(item: HTMLElement | null): UxModal | null {
  let element = item;
  if (element === null) return null;
  while (element.tagName !== 'BODY' && element.tagName !== 'UX-DRAWER') {
    element = element.parentElement;
    const isModaleElement = element ? modalViewModelFromElement(element) : null;
    if (isModaleElement !== null) {
      return isModaleElement;
    }
    if (element === null) return null;
  }
  return null;
}

export function modalViewModelFromElement(element: HTMLElement): UxModal | null {
  const el: any = element;
  if (!el.au) {
    return null;
  }
  for (let key in el.au) {
    if (el.au[key].viewModel && el.au[key].viewModel instanceof UxModal) {
      return el.au[key].viewModel
    }
  }
  return null;
}
