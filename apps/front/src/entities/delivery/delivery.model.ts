import { CustomerModel } from '../customer';
import { DriverModel } from '../driver';
import { TruckModel } from '../truck';

export interface DeliveryModel {
  id: number;
  status: DeliveryStatus;
  pickupAddress: string;
  deliveryAddress: string;
  pickupTime: Date | null;
  deliveryDeadline: Date;
  driver: DriverModel | null;
  truck: TruckModel | null;
  customer: CustomerModel | null;
}

export enum DeliveryStatus {
  Created = 'created',
  PickedUp = 'picked_up',
  Delivered = 'delivered',
  Canceled = 'canceled',
}
