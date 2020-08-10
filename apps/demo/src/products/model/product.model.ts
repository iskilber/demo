import { BankModel } from './bank.model';

export interface ProductModel {
  goodCreditRating: boolean;
  dacRequired: boolean;
  popupPagenegativeRate: boolean;
  onKnTipp: boolean;
  longerRightOfWithdrawal: boolean;
  longerRightOfWithdrawalInfo: string;
  equalConditionsForAll: boolean;
  allowDebtConversion: boolean;
  selfEmployedPossible: boolean;
  productType: number;
  productId: number;
  isBalloon: boolean;
  hasDetails: boolean;
  bank: BankModel;
}