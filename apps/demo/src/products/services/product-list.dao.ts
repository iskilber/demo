import {
  BehaviorSubject,
  Observable
  } from 'rxjs';
import { Dao } from '@check24/dao';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  switchMap
  } from 'rxjs/operators';
import {
  Inject,
  Injectable
  } from '@angular/core';
import { ProductListFilter } from './product-list-filter';
import {
  ProductListFilterModel,
  ProductListModel,
  ProductModel
  } from '../model';
import { ProductsClient } from './products.client';

@Injectable()
export class ProductListDao extends Dao<ProductListModel>{

  public products$: Observable<ProductModel[]> = this.createSelector(
    this.data$,
    (list) => list ? list.items : []);

  public total$: Observable<number> = this.createSelector(
    this.data$,
    (list) => list ? list.meta.total : 0);

  constructor(
    private client: ProductsClient,
    private filter$: ProductListFilter
  ) {
    super(null);

    this.filter$.pipe(
      distinctUntilKeyChanged('start'),
      switchMap((filter) => this.appendNextChunk())
    ).toPromise();
  }

  public get filter(): ProductListFilterModel {
    return this.filter$.getValue();
  }

  public onFetch() {
    const { offset, start } = this.filter;

    return this.client.fetchProducts(offset, start);
  }

  public appendNextChunk() {
    return this.update((prevList) => {
      return this.client.fetchProducts(this.filter.offset, this.filter.start).pipe(
        map((nextList) => ({
          ...(prevList || {}),
          items: [...(prevList ? prevList.items : []), ...nextList.items],
          meta: {
            start: prevList ? prevList.meta.start : 0,
            ...nextList.meta,
          }
        }))
      )
    })
  }
}