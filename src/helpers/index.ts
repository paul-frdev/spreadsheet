export const isEven = (nums: number): boolean => nums % 2 === 0;
export const sum = (sum: number[]): number => sum.reduce((acc, sum) => acc + sum, 0);
export const average = (arr: number[]): number => sum(arr) / arr.length;

export const median = (arr: number[]): number => {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);

  return isEven(middle) ? Math.round(average([sortedArr[middle - 1], sortedArr[middle]])) : sortedArr[Math.ceil(middle)];
};

/// range list of numbers
export const range = (start: number, end: number): number[] =>
  Array(end - start + 1)
    .fill(start)
    .map((el, idx) => el + idx);


// create range of characters from start to end
export const charRange = (start: string, end: string): string[] =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));
