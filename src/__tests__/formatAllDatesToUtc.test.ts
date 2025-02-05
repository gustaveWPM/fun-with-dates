import { describe, expect, it } from 'vitest';

import { formatAllDatesToUtc } from '../formatAllDatesToUtc';
import DATASET from './data/dataset';

describe('formatAllDatesToUtc [impl]', () => {
  it('should let the structure unchanged, given an empty structure', () => {
    const input = {};
    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should let the structure unchanged, given a flat structure without dates', () => {
    const input = DATASET.flatStructureWithoutDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should preserve functions, given a structure with a function', () => {
    const input = DATASET.flatStructureWithoutDates;
    const output = formatAllDatesToUtc(input);

    expect(input.fun()).toBe(output.fun());
  });

  it('should replace all dates by formatted strings, given a flat structure with dates', () => {
    const input = DATASET.flatStructureWithDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toMatchSnapshot();
  });

  it('should let the structure unchanged, given a structure with nestings & without dates', () => {
    const input = DATASET.deepStructureWithoutDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should recursively replace all dates by formatted strings, given a structure with dates & nestings', () => {
    const input = DATASET.deepStructureWithDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toMatchSnapshot();
  });
});
