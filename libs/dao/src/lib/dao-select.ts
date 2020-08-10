import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { getMemoizeFn } from './dao-memoize';
import { MappingFunction, MemoizationFunction } from './dao-types';
import { naiveObjectComparison } from './helpers';


export function select$<T, R> (
  source$: Observable<T>,
  mappingFunction: MappingFunction<T, R> =  (a) => a as any as R,
  memoizationFunction: MemoizationFunction<R> = getMemoizeFn(naiveObjectComparison)
) {
  return source$.pipe(
    map(mappingFunction),
    distinctUntilChanged(memoizationFunction),
    shareReplay(1));
}

export function selectFromMany$<T, R>(
  sources$: Array<Observable<any>>,
  mappingFunction: MappingFunction<any, R> =  (a) => a as any as R,
  memoizationFunction: MemoizationFunction<R> = getMemoizeFn(naiveObjectComparison)
): Observable<R> {
  const source$ = combineLatest(sources$);

  return select$(source$, mappingFunction, memoizationFunction);
}