import { EqualityCheck } from './dao-types';

export function getMemoizeFn(compare: EqualityCheck) {
  return (previousValue, currentValue): boolean => {
    if (typeof previousValue === 'object' && typeof currentValue === 'object') {
      return compare(previousValue, currentValue);
    }
    return previousValue === currentValue;
  }
}
