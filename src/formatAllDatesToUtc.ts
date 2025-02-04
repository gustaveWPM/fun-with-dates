import type { DatesToStrings } from './types/DatesToStrings';

import dayjs from './modules/dayjs';

const formatUtcDate = (d: Date): string => dayjs.utc(d).local().format();

function formatEntry<Input extends object>(k: keyof Input, v: Input[typeof k]) {
  if (v instanceof Date) return [k, formatUtcDate(v)];
  if (v && typeof v === 'object') return [k, formatAllDatesToUtc(v)];
  return [k, v];
}

export const formatAllDatesToUtc = <Input extends object>(input: Input): DatesToStrings<Input> =>
  Object.fromEntries(Object.entries(input).map(([k, v]) => formatEntry(k, v)));
