import { BehaviorSubject } from 'rxjs';
import { DaoStoreConfig } from './dao-store.config';
import {
  deepFreeze,
  naiveObjectComparison
  } from './helpers';

export class DaoStore<T> extends BehaviorSubject<T> {
  constructor(
    initialData: T,
    private config: DaoStoreConfig<T> = { compare: naiveObjectComparison }
  ) {
    super(deepFreeze(initialData));
  }

  public next(newData: T): void {
    const frozenData = deepFreeze(newData);
    if (!this.config.compare(frozenData, this.getValue())) {
      super.next(frozenData);
    }
  }
}
