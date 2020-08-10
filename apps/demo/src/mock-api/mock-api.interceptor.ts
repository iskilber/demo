import {
  catchError,
  delay,
  map
  } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MockApiBadRequestError } from './mock-api.bad-request.error';
import { MockApiProductsController } from './mock-api.products.controller';
import {
  Observable,
  of
  } from 'rxjs';
 

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor(private products: MockApiProductsController) {}

  public intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    switch (request.url) {
      case 'v1/api/products':
        return this.products.fetchProducts(
          this.resolveNumericQueryParam('start', request.params),
          this.resolveNumericQueryParam('offset', request.params)
        ).pipe(
          map((products) => new HttpResponse({ status: 200, body: products })),
          catchError((error) => {
            if (error instanceof MockApiBadRequestError) {
              return of(new HttpResponse({ status: 400, body: error }));
            } else {
              return of(new HttpResponse({ status: 500 }))
            }
          }),
          // Mock backend response time and network latency up to 3 seconds
          // in order to see any pending states
          delay(Math.random() * 1000)
        )
      default:
        return next.handle(request);
    }
  }

  private resolveNumericQueryParam(key: string, params: HttpParams): number {
    const value = Number(params.get(key));

    if (isNaN(value)) {
      throw new MockApiBadRequestError();
    }

    return value;
  }
}