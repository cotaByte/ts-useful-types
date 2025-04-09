//#region OBJECT
export type SimpleUnion<T, K> = T & K;
export type Merge<A, B> = Omit<A, keyof B> & B;
export type MergeTypes<
  TypesArray extends any[],
  Res = {}
> = TypesArray extends [infer Head, ...infer Rem]
  ? MergeTypes<Rem, Res & Head>
  : Res;

export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
//#endregion OBJECT

//#region ARRAY
export type Union<T extends readonly any[]> = T[number];
//#endregion ARRAY

//#region NUMBER
export type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Exclude<Acc[number] | Acc['length'], 0>
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = F extends T
  ? F
  : Exclude<Enumerate<T>, Enumerate<F>> extends never
  ? never
  : T | Exclude<Enumerate<T>, Enumerate<F>> | F;
//#endregion NUMBER

//#region HTTP
export type HTTPMethod = Union<
  ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
>;
//#endregion HTTP

//#region TYPE ASSERTIONS
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type OptionalNullable<T> = T | undefined | null;
//#endregion TYPE ASSERTIONS
