import { EmployeeModel } from '../employee';
import { PaymentStatus } from '../payment';
import { VehicleModel } from '../vehicle';

export interface CargoModel {
  id: number;
  createdAt: Date;
  /**
   * Describes the list of addresses to be visited during cargo delivery
   */
  addressSequence: string[];
  employeeId: number;
  vehicleId: number;
  startDate: Date;
  deadlineDate: Date;
  price: number;
  paymentStatus: PaymentStatus;
}

export interface CargoDetailed extends CargoModel {
  employee: EmployeeModel;
  vehicle: VehicleModel;
}
