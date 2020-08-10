import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './mock-api.interceptor';
import { MockApiProductsController } from './mock-api.products.controller';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    MockApiProductsController,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor,
      multi: true
    }
  ],
})
export class MockApiModule { }
