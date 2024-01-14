export function isValidHexColor(hexColor) {
  if (hexColor === "") {
    return true;
  }
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(hexColor);
}

export function replaceColor(code, oldColor, newColor) {
  const regex = new RegExp(oldColor, "gi");
  return code.replace(regex, newColor);
}
