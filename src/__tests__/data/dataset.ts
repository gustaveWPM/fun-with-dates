const DATASET = {
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
    // eslint-disable-next-line no-magic-numbers
    c: BigInt(28),
    e: undefined,
    f: () => {},
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

export default DATASET;
