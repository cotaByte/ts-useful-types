//#region OBJECT
/**
 * Performs a simple union of two types.
 * @example
 * type A = { a: number };
 * type B = { b: string };
 * type C = SimpleUnion<A, B>; // { a: number } & { b: string }
 * @param T - The first type.
 * @param K - The second type.
 * @returns The union of the two types.
 */
export type SimpleUnion<T, K> = T & K;
/**
 * Performs a simple merge between two types.
 * @example
 * type A = { a: number ,c:string};
 * type B = { b: string,c:string };
 * type C = Merge<A, B>; // { a: number , b: string, c:string }
 * @param T - The first type.
 * @param K - The second type.
 * @returns The merge resultant of the two types.
 */
export type Merge<A, B> = Omit<A, keyof B> & B;
/**
 * Performs a simple merge between multiple types.
 * @example
 * type A = { a: number ,c:string};
 * type B = { b: string,c:string };
 * type D = { d: string };
 * type C = MergeAll<A, B, D>; // { a: number , b: string, c:string , d: string }
 * @param TypesArray - The  arrays of types to be merged.
 * @returns The merge resultant of the array types.
 */
export type MergeAll<TypesArray extends any[], Res = {}> = TypesArray extends [
  infer Head,
  ...infer Rem
]
  ? MergeAll<Rem, Res & Head>
  : Res;

/**
 * Performs a simple union between multiple types.
 * @example
 * type A = { a: number };
 * type B = { b: string };
 * type C = Union<[A | B]>; // { a: number } | { b: string }
 * @param T - The array of types.
 * @returns The union of the two types.
 */
export type Union<T extends readonly any[]> = T[number];

/**
 * Retrives the keys of an object type.
 * @param T
 * */
export type ValueOf<T> = T[keyof T];

/**
 * A utility type that recursively makes all properties of a given type `T` optional.
 *
 * This is particularly useful when you need to create a partial version of a deeply nested object type.
 *
 * @template T - The type to be transformed into a deep partial version.
 *
 * @example
 * type Example = {
 *   a: {
 *     b: {
 *       c: string;
 *     };
 *   };
 * };
 *
 * type PartialExample = DeepPartial<Example>;
 * // Result:
 * // {
 * //   a?: {
 * //     b?: {
 * //       c?: string;
 * //     };
 * //   };
 * // }
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
//#endregion OBJECT

//#region NUMBER

/**
 * A utility type that generates a union of numbers from `1` to `N` (inclusive).
 *
 * This type recursively builds an array of numbers up to the specified `N`
 * and then creates a union of those numbers, excluding `0`.
 *
 * @template N - The maximum number (inclusive) to include in the union.
 * @template Acc - An accumulator array used internally to build the sequence of numbers.
 *                 Defaults to an empty array and should not be provided manually.
 *
 * @example
 * // Creates a union of numbers from 1 to 5: 1 | 2 | 3 | 4 | 5
 * type Result = Enumerate<5>;// Result is 1 | 2 | 3 | 4 | 5
 *
 * @remarks
 * This type is useful for creating range-like unions of numbers, which can be
 * used for validation, type constraints, or other compile-time checks.
 */
export type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Exclude<Acc[number] | Acc['length'], 0>
  : Enumerate<N, [...Acc, Acc['length']]>;

/**
 * Generates a union of numbers from `F` to `T` (inclusive).
 *
 * @example
 * // Creates a union of numbers from 1 to 5: 1 | 2 | 3 | 4 | 5
 * type Result = IntRange<1, 5>; // Result is 1 | 2 | 3 | 4 | 5
 */
export type IntRange<F extends number, T extends number> = F extends T
  ? F
  : Exclude<Enumerate<T>, Enumerate<F>> extends never
  ? never
  : T | Exclude<Enumerate<T>, Enumerate<F>> | F;
//#endregion NUMBER

//#region HTTP
/**
 * A utility type that represents a union of HTTP methods.
 *
 * This type is useful for defining and validating HTTP methods in APIs,
 * ensuring that only valid HTTP methods are used.
 *
 * @example
 * type MyHttpMethod = HTTPMethod; // 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
 */
export type HTTPMethod = Union<
  ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
>;
//#endregion HTTP

//#region TYPE ASSERTIONS
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type OptionalNullable<T> = T | undefined | null;
//#endregion TYPE ASSERTIONS
