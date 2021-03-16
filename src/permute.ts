export function permutator<T>(inputArray: T[]): T[][] {
  const permutations: T[][] = [];

  const permute = (array: T[], permutation: T[] = []) => {
    if (array.length === 0) {
      permutations.push(permutation);
    } else {
      for (let i = 0; i < array.length; i++) {
        const arrayCopy = array.slice();
        const removedElement = arrayCopy.splice(i, 1);
        permute(arrayCopy, permutation.concat(removedElement));
      }
    }
  };

  permute(inputArray);
  return permutations;
}
