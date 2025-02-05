import { expectTypeOf, describe, it } from 'vitest';

import type { DatesToStrings } from '../types/DatesToStrings';

import { formatAllDatesToUtc } from '../formatAllDatesToUtc';
import dataset from './data/dataset';

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
        readonly optionalDateOrString?: string | Date;
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
        readonly optionalDateOrString?: string;
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

  it('should remap types with strictness, given a structure shape', () => {
    type Remapped<Input extends object> = DatesToStrings<Input>;

    const input = dataset.deepStructureWithDates;
    const output = formatAllDatesToUtc(input);

    expectTypeOf<typeof input>().not.toEqualTypeOf<typeof output>;
    expectTypeOf<Remapped<typeof dataset.deepStructureWithDates>>().toEqualTypeOf<typeof output>;
  });
});
