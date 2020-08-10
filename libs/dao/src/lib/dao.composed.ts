import { combineLatest, Observable } from 'rxjs';
import { Dao } from './dao';
import { DaoBase } from './dao.base';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { MappingFunction } from './dao-types';
import { select$, selectFromMany$ } from './dao-select';
import { toSubscriable } from './dao-subscriable';

export class DaoComposed<T> extends DaoBase {

  protected daos$: Array<Dao<any>>;

  public readonly data$: Observable<T>;

  public pendig$: Observable<boolean>;

  public errors$: Observable<any>;

  constructor(...daos: Dao<any, any, any>[]) {
    super();
    this.daos$ = daos;

    this.data$ = this.createSelectorFromMany<T, T>(
        this.daos$.map((dao) => dao.data$));

    this.pendig$ = combineLatest(this.daos$.map((dao) => dao.pending$)).pipe(
      takeUntil(this.destroy$),
      map((pendings: boolean[]) => pendings.some(Boolean)),
      shareReplay(1));
  }

  public fetch() {
    this.daos$.forEach((dao) => dao.fetch());
  }
}