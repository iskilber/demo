import { MappingFunction } from './dao-types';
import { Observable, Subject } from 'rxjs';
import { select$, selectFromMany$ } from './dao-select';
import { toSubscriable } from './dao-subscriable';

export abstract class DaoBase {

  protected destroy$: Subject<void>;

  public abstract fetch();

  constructor() {
    this.destroy$ = new Subject();
  }

  public destroy() {
    this.destroy$.next();
  }

  public createSelector<T, R>(
    source$: Observable<T>,
    mappingFunction?: MappingFunction<T, R>
  ): Observable<R> {
    return select$(source$, mappingFunction).pipe(
      toSubscriable(() => this.fetch()))
  }

  public createSelectorFromMany<S, R>(
    sources$: Array<Observable<any>>,
    mappingFunction?: MappingFunction<S, R>
  ): Observable<R> {
    return selectFromMany$(sources$, mappingFunction).pipe(
        toSubscriable(() => this.fetch()));
  }
}