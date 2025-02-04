type _DistributeDatesToStrings<T> = {
  [K in keyof T]: DatesToStrings<T[K]>;
};

export type DatesToStrings<T> = T extends Date ? string : T extends object ? _DistributeDatesToStrings<T> : T;
