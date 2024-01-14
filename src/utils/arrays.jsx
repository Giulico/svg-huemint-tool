export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export function removeCaseDuplicates(arr) {
  return arr.filter(
    (value, index, self) =>
      index === self.findIndex((v) => v.toLowerCase() === value.toLowerCase())
  );
}

export function arraysAreEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
