import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { products } from './products.json';

/**
 * Simulates API endpoint
 */
@Injectable()
export class MockApiProductsController {
  public fetchProducts(start: number, offset: number) {
    return of((products as Array<any>).slice(start, start + offset)).pipe(
      map((chunk) => ({
        items: chunk,
        meta: { start, offset, total: products.length }
      }))
    );
  }
}