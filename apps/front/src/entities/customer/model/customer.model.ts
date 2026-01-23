export interface CustomerModel {
  id: number;
  companyName: string;
  companyType: CompanyType;
  inn: string;
  kpp: string;
  ogrn: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum CompanyType {
  Individual = 'individual',
  Legal = 'legal',
  Partner = 'partner',
  JointStock = 'joint',
}
