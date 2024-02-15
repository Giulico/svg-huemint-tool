export function getDefaultPaletteMulti(colorAmount, columnsN) {
  const defaultPaletteMulti = [];
  for (let i = 0; i < columnsN; i++) {
    const row = [];
    for (let j = 0; j < colorAmount; j++) {
      row.push("-");
    }
    defaultPaletteMulti.push(row);
  }
  return defaultPaletteMulti;
}
