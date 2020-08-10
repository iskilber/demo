import { BehaviorSubject } from 'rxjs';
import {
  Component,
  OnInit
  } from '@angular/core';
import {
  ProductListDao,
  ProductListFilter
  } from '../../services';

@Component({
  selector: 'demo-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [
    {
      provide: ProductListFilter,
      useFactory: () => new ProductListFilter(0, 12)
    },
    ProductListDao
  ]
})
export class ProductListComponent implements OnInit {
  constructor(
    public dao: ProductListDao,
    public filter$: ProductListFilter
  ) { }

  public ngOnInit() { 
    this.dao.fetch();
  }

  public handleBottomReached() {
    this.filter$.start = this.filter$.start + this.filter$.offset;
  }

  public handleTopReached() {
    console.log('TOP');
  }
}