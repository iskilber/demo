import {
  catchError,
  filter,
  shareReplay,
  switchMap
  } from 'rxjs/operators';
import { DaoState } from './dao-state';
import {
  EMPTY,
  Observable,
  Subject
  } from 'rxjs';

export class DaoFetch<T, E = any> {

  private fetchSubject = new Subject();

  private fetch$ = this.fetchSubject.pipe(
    filter(() => !this.state.pending),
    filter((forceRefresh: boolean) => forceRefresh || this.state.expired),
    shareReplay(1));

  constructor(
    private state: DaoState<any>,
    private onFetch: (forceRefresh: boolean) => Observable<T>
  ) {
    this.fetch$
        .pipe(
          switchMap((force) => onFetch(force).pipe(
            catchError((error) => {
              this.state.fetchError = error;
              return EMPTY;
            })
          )))
        .subscribe(
          (data) => this.state.data = data,
          (error) => 
              console.error('Dao fetched failed and closed the DAO object', error),
          () => console.log('complete fetch for', state));

    this.fetch$.subscribe(() => this.state.pending = true);
  }

  public fetch(forceRefresh = false) {
    this.fetchSubject.next(forceRefresh);
  }


  public complete() {
    this.fetchSubject.complete();
  }
}
