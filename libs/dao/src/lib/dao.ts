import { DaoConfig } from './dao.config';
import { DaoFetch } from './dao-fetch';
import { DaoState } from './dao-state';
import {
  filter,
  map,
  tap
  } from 'rxjs/operators';
import { MappingFunction } from './dao-types';
import {
  Observable,
  of,
  Subject
  } from 'rxjs';
import { select$ } from './dao-select';
import { toSubscriable } from './dao-subscriable';

export abstract class Dao<T, E = any, C extends DaoConfig = DaoConfig> {

  public static FORCE_FETCH = true;

  /**
   * Updates without 'pending' flag.
   */
  public static SILENT_UPDATE = true;

  public static DEFAULT_CONFIG: DaoConfig = {
    maxAge: 50
  }

  protected state$: DaoState<T, E>;

  protected fetch$: DaoFetch<T, E>;

  protected destroy$: Subject<void>;

  public readonly data$: Observable<T>;

  constructor(
    private readonly initData: T = null,
    protected config: C = Dao.DEFAULT_CONFIG as C
  ) {
    this.state$ = new DaoState(initData, config.maxAge, this.isEmpty);
    this.fetch$ = new DaoFetch(
      this.state$,
      (forceRefresh: boolean) => this.onFetch(forceRefresh));

    this.data$ = this.createSelector<T>(this.state$.data$);
    this.destroy$ = new Subject();

    this.error$.pipe(filter(Boolean)).subscribe(console.error);
  }

  public get empty$() {
    return this.state$.empty$;
  }

  public get pending$() {
    return this.state$.pending$;
  }

  public update(update: (prevData: T) => Observable<T>, silent: boolean = false) {
    if (!silent) {
      this.state$.pending = true;
    }

    return update(this.data).pipe(tap((data: T) => this.state$.data = data));
  }

  public patch(
    patch: (prevData: T) => Observable<Partial<T>>, 
    silent: boolean = false
  ) {
    return this.update(
      (prevData) => patch(prevData).pipe(
          map((nextPatch) => ({...prevData, ...nextPatch }))),
      silent);
  }

  public get error$() {
    return this.state$.error$;
  }

  public set fetchError(error: any) {
    this.state$.fetchError = error;
  }

  public get updatedAt$() {
    return this.state$.updatedAt$;
  }

  public get empty() {
    return this.state$.empty;
  }

  public get data(): T {
    return this.state$.data;
  }

  public set data(data: T) {
    this.state$.data = data;
  }

  public get pending() {
    return this.state$.pending;
  }

  public get error() {
    return this.state$.fetchError;
  }

  public get updatedAt() {
    return this.state$.updatedAt;
  }

  public get createdAt() {
    return this.state$.createdAt;
  }

  public get expired(): boolean {
    const updatedAt = this.updatedAt ?  this.updatedAt.getTime() : 0;
    const sinceLastUpdate = Date.now() - updatedAt;

    return this.config.maxAge <= 0 || sinceLastUpdate > this.config.maxAge;
  }


  public fetch(forceRefresh = false) {
    this.fetch$.fetch(forceRefresh);

    return;
  }

  public destroy() {
    this.fetch$.complete();
    this.destroy$.next();
  }

  public clear() {
    this.state$.clear(this.initData);
  }

  public createSelector<R, S = T>(
    source$: Observable<S>,
    mappingFunction?: MappingFunction<S, R>
  ): Observable<R> {
    return select$(source$, mappingFunction).pipe(
      toSubscriable(() => {
        return this.fetch();
      }))
  }

  // Lifecycle hooks
  public onFetch(forceRefresh: boolean): Observable<T> { return of(this.data)}

  protected isEmpty(data: T) { return !data }
}