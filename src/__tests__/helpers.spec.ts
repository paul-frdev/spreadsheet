import { sum, isEven, average, median, range, charRange } from '../helpers';

describe('helpers', () => {
  describe('sum function', () => {
    it('should return the result of array values', () => {
      const input = [1, 2, 2, 5];
      const result = sum(input);
      expect(result).toBe(10);
    });
    it('should return the result of array values', () => {
      const input: number[] = [];
      const result = sum(input);
      expect(result).toBe(0);
    });
    it('should return the result of array values', () => {
      const input = [10];
      const result = sum(input);
      expect(result).toBe(10);
    });
  });
  describe('isEven function', () => {
    it('should return true', () => {
      const input = 2;
      const result = isEven(input);
      expect(result).toBe(true);
    });
    it('should return false', () => {
      const input = 1;
      const result = isEven(input);
      expect(result).toBe(false);
    });
  });
  describe('average function', () => {
    it('should return length of array divided by array.length', () => {
      const input = [1, 2, 3];
      const result = average(input);
      expect(result).toBe(2);
    });
  });
  describe('median function', () => {
    it('should return middle if number odd', () => {
      const input = [1, 2, 3];
      const result = median(input);
      expect(result).toBe(2);
    });
    it('should return middle if numbers of array is even', () => {
      const input = [1, 2, 3, 1];
      const result = median(input);
      expect(result).toBe(2);
    });
  });
  describe('range function', () => {
    it('should return range on numbers in the array', () => {
      const result = range(1, 10);
      expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });
  describe('charRange function', () => {
    it('should return range on characters in the array', () => {
      const result = charRange('A', 'D');
      expect(result).toStrictEqual(['A', 'B', 'C', 'D']);
    });
  });
});
