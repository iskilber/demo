import { ProductModel } from './product.model';

export interface ProductListModel {
  items: ProductModel[];
  meta: {
    offset: number;
    start: number;
    total: number;
  }
}