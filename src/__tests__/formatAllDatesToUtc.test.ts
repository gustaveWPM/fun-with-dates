import { describe, expect, it } from 'vitest';

import { formatAllDatesToUtc } from '../formatAllDatesToUtc';

describe('formatAllDatesToUtc [impl]', () => {
  it('should let the structure unchanged, given an empty structure', () => {
    const input = {};

    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should let the structure unchanged, given a structure without dates', () => {
    const input = {
      // eslint-disable-next-line no-magic-numbers
      c: BigInt(28),
      e: undefined,
      f: () => {},
      b: 'foo',
      d: null,
      a: 12
    };

    const output = formatAllDatesToUtc(input);

    expect(output).toStrictEqual(input);
  });

  it('should replace all dates by formatted strings, given flat structure', () => {
    const data = {
      a: new Date('1998-02-01'),
      d: new Date('1998-01-02'),
      b: 'foo',
      c: 'bar'
    };

    const output = formatAllDatesToUtc(data);

    expect(output).toMatchSnapshot();
  });

  it('should recursively replace all dates by formatted strings, given structure with nestings', () => {
    const data = {
      nested: {
        deeplyNested: {
          a: new Date('1998-02-01'),
          b: 'foo'
        },

        b: new Date('1998-02-01'),
        a: 'foo'
      },

      a: new Date('1998-02-01'),
      d: new Date('1998-01-02'),
      b: 'foo',
      c: 'bar'
    };

    const output = formatAllDatesToUtc(data);

    expect(output).toMatchSnapshot();
  });
});

describe('formatAllDatesToUtc [typing]', () => {
  it('should _, given _', () => {
    expect(true).toBe(true);
  });
});
