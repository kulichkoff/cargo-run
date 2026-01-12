export interface CustomerModel {
  id: number;
  companyName: string;
  companyType: CustomerType;
  inn: string;
  kpp?: string;
  ogrn: string;
}

export enum CustomerType {
  Individual = 'individual',
  Legal = 'legal',
  Partner = 'partner',
  JointStock = 'joint',
}
