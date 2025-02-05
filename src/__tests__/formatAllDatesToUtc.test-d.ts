import { expectTypeOf, describe, it } from 'vitest';

import type { DatesToStrings } from '../types/DatesToStrings';

import { formatAllDatesToUtc } from '../formatAllDatesToUtc';
import DATASET from './data/dataset';

describe('formatAllDatesToUtc [typing]', () => {
  it('should let the type unchanged, given an empty structure type', () => {
    type TInput = {};
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<TInput>();
  });

  it('should let the type unchanged, given a structure without dates', () => {
    type TInput = typeof DATASET.flatStructureWithoutDates;
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<TInput>();
  });

  it('should replace all dates by strings, given flat structure with dates', () => {
    type TInput = typeof DATASET.flatStructureWithDates;
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<{
      readonly date2: string;
      readonly date: string;
      readonly foo: 'foo';
      readonly bar: 'bar';
    }>();
  });

  it('should recursively replace all dates by formatted strings, given structure with dates & nestings', () => {
    type TInput = typeof DATASET.deepStructureWithDates;
    type TOutput = DatesToStrings<TInput>;

    expectTypeOf<TOutput>().toEqualTypeOf<{
      readonly nested: {
        readonly deeplyNested: {
          readonly date: string;
          readonly foo: 'foo';
          // eslint-disable-next-line no-magic-numbers
          readonly 12: 12;
        };

        readonly date: string;
        readonly foo: 'foo';
      };

      readonly date2: string;
      readonly date: string;
      readonly foo: 'foo';
      readonly bar: 'bar';
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

    const input = DATASET.deepStructureWithDates;
    const output = formatAllDatesToUtc(input);

    expectTypeOf<typeof input>().not.toEqualTypeOf<typeof output>;
    expectTypeOf<Remapped<typeof input>>().toEqualTypeOf<typeof output>;

    expectTypeOf<typeof input.nested.deeplyNested.date>().toEqualTypeOf<Date>;
    expectTypeOf<typeof output.nested.deeplyNested.date>().toEqualTypeOf<string>;
  });
});
