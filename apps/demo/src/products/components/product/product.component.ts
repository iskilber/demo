import {
  Component,
  Input
  } from '@angular/core';
import { ProductModel } from '../../model';

@Component({
  selector: 'demo-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {

  @Input()
  public product: ProductModel;

  constructor() { }
}