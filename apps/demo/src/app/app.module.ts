import { AppComponent } from './app.component';
import {
  AppMainViewComponent,
  Check24LogoComponent
  } from './components';
import { BrowserModule } from '@angular/platform-browser';
import { MockApiModule } from '../mock-api';
import { NgModule } from '@angular/core';
import { ProductsModule } from '../products';
 

@NgModule({
  declarations: [
    AppComponent,
    AppMainViewComponent,
    Check24LogoComponent
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    MockApiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
