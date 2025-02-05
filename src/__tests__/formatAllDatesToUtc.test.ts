import { describe, expect, it } from 'vitest';

import { formatAllDatesToUtc } from '../formatAllDatesToUtc';
import dataset from './data/dataset';

describe('formatAllDatesToUtc [impl]', () => {
  it('should let the structure unchanged, given an empty structure', () => {
    const input = {};
    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should let the structure unchanged, given a structure without dates', () => {
    const input = dataset.flatStructureWithoutDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should replace all dates by formatted strings, given flat structure with dates', () => {
    const input = dataset.flatStructureWithDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toMatchSnapshot();
  });

  it('should recursively replace all dates by formatted strings, given structure with dates & nestings', () => {
    const input = dataset.deepStructureWithDates;
    const output = formatAllDatesToUtc(input);

    expect(output).toMatchSnapshot();
  });
});
