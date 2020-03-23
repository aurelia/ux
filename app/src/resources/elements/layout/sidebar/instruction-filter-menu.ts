import { NavigationInstruction } from 'aurelia-router';

export class InstructionFilterMenuValueConverter {

  public toView(navigationInstructions: NavigationInstruction[]) {

    if (navigationInstructions == null) {
      return [];
    }

    return navigationInstructions[navigationInstructions.length - 1].router.navigation;
  }
}
