import {
  BehaviorSubject,
  Subscription
  } from 'rxjs';

export class DaoSubscriable<T> extends BehaviorSubject<T> {
  constructor(private onSubscribe: () => void) {
    super(null);
  }

  public subscribe(next?: any, error?: any, complete?: any): Subscription {
    this.onSubscribe();

    if (next && !error && !complete) {
      return super.subscribe(next);
    } else {
      return super.subscribe({ next, error, complete });
    }
  }
}

export function toSubscriable<T>(onSubscribe: () => void) {
  return (input$) => {
    const subject = new DaoSubscriable<T>(onSubscribe);

    input$.subscribe(subject);

    return subject.asObservable();
  }
}