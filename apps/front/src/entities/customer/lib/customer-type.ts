import { CustomerType } from '../model';

export function getCustomerTypeLocale(type: CustomerType): string {
  switch (type) {
    case CustomerType.Individual:
      return 'ИП';
    case CustomerType.Legal:
      return 'ООО';
    case CustomerType.Partner:
      return 'Партнер';
    case CustomerType.JointStock:
      return 'АО';
  }
}
