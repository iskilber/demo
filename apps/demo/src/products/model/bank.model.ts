import { RatingModel } from './rating.model';

export interface BankModel {
  id: number;
  name: string;
  detailedName: string;
  loanerName: string;
  regional: boolean;
  rating: RatingModel;
}