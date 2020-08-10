export type EqualityCheck = (a: any, b: any) => boolean;

export type MappingFunction<T, R> = (mappable: T) => R;

export type MemoizationFunction<R> = (previousResult: R, currentResult: R) => boolean;
