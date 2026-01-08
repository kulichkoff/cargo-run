export interface EmployeeModel {
  id: number;
  firstName: string;
  lastName: string;
}

export type CreateEmployeeDTO = Omit<EmployeeModel, 'id'>;
