import {
  Component,
  Input,
  ViewEncapsulation
  } from '@angular/core';

@Component({
  selector: 'demo-bank-logo',
  templateUrl: './bank-logo.component.svg',
 // styleUrls: ['./bank-logo.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BankLogoComponent {

  @Input()
  public bankId: number;

  public get spriteClassName() {
    return `b${this.bankId}`;
  }

  constructor() { }
}
