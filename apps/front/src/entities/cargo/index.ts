import { PaymentStatus } from '../payment';

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
