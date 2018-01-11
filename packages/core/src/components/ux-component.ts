import { UxTheme } from '../styles/ux-theme';

export interface UxComponent {
  theme: UxTheme;
}

export function markAsUxElement(element: Element & { __ux__?: boolean }) {
  element.__ux__ = true;
}

export function isUxElement(element: Element & { __ux__?: boolean }) {
  return element.hasOwnProperty('__ux__');
}
