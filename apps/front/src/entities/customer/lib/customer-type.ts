import { CompanyType } from '../model';

export function getCustomerTypeLocale(type: CompanyType): string {
  switch (type) {
    case CompanyType.Individual:
      return 'ИП';
    case CompanyType.Legal:
      return 'ООО';
    case CompanyType.Partner:
      return 'Партнер';
    case CompanyType.JointStock:
      return 'АО';
  }
}
