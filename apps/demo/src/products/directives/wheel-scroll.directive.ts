import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
  tap
  } from 'rxjs/operators';
import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
  } from '@angular/core';
import {
  fromEvent,
  Subject
  } from 'rxjs';

@Directive({ selector: '[demoScroll]' })
export class WheelScrollDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  private scrollEvent$ = fromEvent<Event>(this.elementRef.nativeElement, 'scroll').pipe(
    debounceTime(50),
    takeUntil(this.destroy$));

  @Output()
  public bottom = new EventEmitter();

  @Output()
  public top = new EventEmitter();
  
  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {}

  public ngOnInit() {
    this.scrollEvent$
      .pipe(
        filter(() => {
          const rect = this.elementRef.nativeElement.getBoundingClientRect();
    
          return this.elementRef.nativeElement.scrollTop + rect.height >= 
            this.elementRef.nativeElement.scrollHeight;
        }))
      .subscribe(this.bottom);

    this.scrollEvent$
      .pipe(
        filter(() => {
          return this.elementRef.nativeElement.scrollTop === 0;
        }))
      .subscribe(this.top);
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }
}