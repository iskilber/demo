import {
  BankLogoComponent,
  ProductComponent,
  ProductListComponent
  } from './components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProductsClient } from './services';
import { WheelScrollDirective } from './directives';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [ProductsClient],
  declarations: [
    ProductListComponent,
    ProductComponent,
    BankLogoComponent,
    WheelScrollDirective
  ],
  exports: [ProductListComponent],
})
export class ProductsModule { }

