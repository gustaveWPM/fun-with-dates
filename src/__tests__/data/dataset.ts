const DATASET = {
  deepStructureWithDates: {
    nested: {
      deeplyNested: {
        date2: new Date('1998-01-02'),
        date: new Date('1998-02-01'),
        foo: 'foo',
        12: 12
      },

      date: new Date('1998-02-01'),
      foo: 'foo'
    },

    date2: new Date('1998-01-02'),
    date: new Date('1998-02-01'),
    foo: 'foo',
    bar: 'bar'
  },

  flatStructureWithoutDates: {
    fun: (string: string, number: number, { string: string2, number: number2 }: { string: string; number: number }) =>
      `__DUMMY__${number}__${string}__${string2}__${number2}`,
    // eslint-disable-next-line no-magic-numbers
    bigint: BigInt(28),
    foo: 'foo',
    null: null,
    12: 12
  },

  deepStructureWithoutDates: {
    nested: {
      deeplyNested: {
        bar: 'bar',
        foo: 'foo',
        12: 12
      },

      bar: 'bar',
      foo: 'foo'
    },

    baz: 'baz',
    qux: 'qux',
    foo: 'foo',
    bar: 'bar'
  },

  flatStructureWithDates: {
    date2: new Date('1998-01-02'),
    date: new Date('1998-02-01'),
    foo: 'foo',
    bar: 'bar'
  }
} as const;

export default DATASET;
