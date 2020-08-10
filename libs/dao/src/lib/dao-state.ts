import { DaoStore } from './dao-store';
import { select$ } from './dao-select';

export interface IDaoState<D, E = any> {
  pending: boolean;
  updatedAt?: Date | null;
  createdAt: Date;
  data: D;
  error?: E;
}

export class DaoState<D, E = any> extends DaoStore<IDaoState<D, E>> {

  public pending$ = select$(this, (state) => state.pending);

  public error$ = select$(this, (state) => state.error);

  public updatedAt$ = select$(this, (state) => state.pending);

  public data$ = select$(this, (state) => state.data);

  public empty$ = select$(this, (state) => this.isEmpty(state.data));

  constructor(
    initData: D = null,
    private maxAge: number = 0,
    private isEmpty: (data: D) => boolean
  ) {
    super({ pending: false, createdAt: new Date(), data: initData });
  }

  public get empty(): boolean {
    return this.isEmpty(this.data);
  }

  public get pending(): boolean {
    return this.getValue().pending;
  }

  public get fetchError(): E {
    return this.getValue().error;
  }

  public get updatedAt(): Date | null {
    return this.getValue().updatedAt;
  }

  public get createdAt(): Date {
    return this.getValue().createdAt;
  }

  public get data(): D {
    return this.getValue().data;
  }

  public set data(data: D) {
    this.next({
      ...this.getValue(),
      data,
      error: null,
      updatedAt: new Date(),
      pending: false
    });
  }

  public clear(initData: D) {
    this.next({
      ...this.getValue(),
      data: initData,
      error: null,
      updatedAt: null,
      pending: false
    });
  }

  public set fetchError(error: E) {
    this.next({
      ...this.getValue(),
      error,
      updatedAt: new Date(),
      pending: false
    });
  }

  public set pending(pending: boolean) {
    this.next({ ...this.getValue(), pending })
  }

  public get expired(): boolean {
    const updatedAt = this.updatedAt ?  this.updatedAt.getTime() : 0;
    const sinceLastUpdate = Date.now() - updatedAt;
    return this.maxAge <= 0 || sinceLastUpdate > this.maxAge;
  }
}