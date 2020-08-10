import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListModel } from '../model';

@Injectable()
export class ProductsClient {
  constructor(private http: HttpClient) {}

  public fetchProducts(offset: number, start: number): Observable<ProductListModel> {
    return this.http.get<ProductListModel>('v1/api/products', {
      params: { offset: String(offset), start: String(start) }
    });
  }
}