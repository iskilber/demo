import { BehaviorSubject } from 'rxjs';
import { ProductListFilterModel } from '../model';

export class ProductListFilter extends BehaviorSubject<ProductListFilterModel> {
  constructor(initStart: number, initOffset: number) {
    super({ start: initStart, offset: initOffset });
  }

  public set start(start: number) {
    this.next({
      ...this.getValue(),
      start
    });
  }

  public get start() {
    return this.getValue().start;
  }

  public set offset(offset: number) {
    this.next({
      ...this.getValue(),
      offset
    });
  }

  public get offset() {
    return this.getValue().offset;
  } 
}