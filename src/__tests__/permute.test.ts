import { permutator } from '../permute';

test('permute empty', () => {
  const arr: number[] = [];
  const permuted: number[][] = [[]];
  expect(permutator(arr)).toEqual(permuted);
});

test('permute 2 elements', () => {
  const arr = ['A', 'B'];
  const permuted = [
    ['A', 'B'],
    ['B', 'A'],
  ];
  expect(permutator(arr)).toEqual(permuted);
});

test('permute 3 elements', () => {
  const arr = [1, 2, 3];
  const permuted = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];
  expect(permutator(arr)).toEqual(permuted);
});
