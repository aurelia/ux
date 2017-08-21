// this function will ensure that we propertly treat a potential string value for a boolean attribute
// as the boolean representation
export function normalizeBooleanAttribute(attributeName: string, value: boolean | string): boolean {
  let ret: boolean;
  if (typeof value === 'string') {
    if (value === '' || value.toLocaleLowerCase() === attributeName.toLocaleLowerCase()) {
      // if string, then it can be true if the value is blank,
      // or the value matches the name of the attribue with case insensitivity
      ret = true;
    } else {
      ret = false;
    }
  } else {
    ret = value as boolean;
  }
  return ret;
}
