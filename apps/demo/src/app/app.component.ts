import {
  Component,
  OnInit
  } from '@angular/core';
import { ProductsClient } from '../products';

@Component({
  selector: 'check24-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  constructor() {}

  public ngOnInit() {

  }
}
