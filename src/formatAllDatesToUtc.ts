type _DistributeDatesToStrings<T> = {
  [K in keyof T]: DatesToStrings<T[K]>;
};

type DatesToStrings<T> = T extends Date ? string : T extends object ? _DistributeDatesToStrings<T> : T;

const formatUtcDate = (d: Date): string => `implement this ${d}`;

function formatEntry<Input extends object>(k: keyof Input, v: Input[typeof k]) {
  if (v instanceof Date) return [k, formatUtcDate(v)];
  if (v && typeof v === 'object') return [k, formatAllDatesToUtc(v)];
  return [k, v];
}

export const formatAllDatesToUtc = <Input extends object>(input: Input): DatesToStrings<Input> =>
  Object.fromEntries(Object.entries(input).map(([k, v]) => formatEntry(k, v)));
