import { expectTypeOf, describe, expect, it } from 'vitest';

import type { DatesToStrings } from '../types/DatesToStrings';

import { formatAllDatesToUtc } from '../formatAllDatesToUtc';

const dataset = {
  deepStructureWithDates: {
    nested: {
      deeplyNested: {
        a: new Date('1998-02-01'),
        b: 'foo',
        c: 12
      },

      b: new Date('1998-02-01'),
      a: 'foo'
    },

    a: new Date('1998-02-01'),
    d: new Date('1998-01-02'),
    b: 'foo',
    c: 'bar'
  },

  flatStructureWithoutDates: {
    f: () => {
      console.log('lol');
    },
    // eslint-disable-next-line no-magic-numbers
    c: BigInt(28),
    e: undefined,
    b: 'foo',
    d: null,
    a: 12
  },

  flatStructureWithDates: {
    a: new Date('1998-02-01'),
    d: new Date('1998-01-02'),
    b: 'foo',
    c: 'bar'
  }
} as const;

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

describe('formatAllDatesToUtc [typing]', () => {
  it('should let the type unchanged, given an empty structure type', () => {
    type TInput = {};
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<TInput>();
  });

  it('should let the type unchanged, given a structure without dates', () => {
    type TInput = typeof dataset.flatStructureWithoutDates;
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<TInput>();
  });

  it('should replace all dates by strings, given flat structure with dates', () => {
    type TInput = typeof dataset.flatStructureWithDates;
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<{
      readonly a: string;
      readonly d: string;
      readonly b: 'foo';
      readonly c: 'bar';
    }>();
  });

  it('should recursively replace all dates by formatted strings, given structure with dates & nestings', () => {
    type TInput = typeof dataset.deepStructureWithDates;
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<{
      readonly nested: {
        readonly deeplyNested: {
          readonly a: string;
          readonly b: 'foo';
          // eslint-disable-next-line no-magic-numbers
          readonly c: 12;
        };
        readonly b: string;
        readonly a: 'foo';
      };

      readonly a: string;
      readonly d: string;
      readonly b: 'foo';
      readonly c: 'bar';
    }>();
  });

  it('should distribute optionals, given a structure with optional fields type & types unions', () => {
    type TInput = {
      a?: {
        optionalDateOrString?: string | Date;
        dateOrString: string | Date;
        string: string;
        date: Date;
      };

      optionalDateOrStringOrNull?: string | Date | null;
      readonly dateOrStringOrNull: string | Date | null;
      number: number;
      date: Date;
    };

    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<{
      a?: {
        optionalDateOrString?: string;
        dateOrString: string;
        string: string;
        date: string;
      };

      optionalDateOrStringOrNull?: string | null;
      readonly dateOrStringOrNull: string | null;
      number: number;
      date: string;
    }>();
  });
});
