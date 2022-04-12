/**
 * Utility type representing optional data, which is
 * represented as a null value in json
 */
export type Maybe<T> = T | null;

/**
 * Utility type to create a new type from an existing
 * one (T), given a list of keys to make optional (K)
 */
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
