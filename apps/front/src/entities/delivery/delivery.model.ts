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

export function getDeliveryStatusLocale(status: DeliveryStatus) {
  switch (status) {
    case DeliveryStatus.Created:
      return 'Создан';
    case DeliveryStatus.PickedUp:
      return 'Выдан';
    case DeliveryStatus.Delivered:
      return 'Доставлен';
    case DeliveryStatus.Canceled:
      return 'Отменен';
  }
}

export function getDeliveryStatusColorClass(status: DeliveryStatus) {
  switch (status) {
    case DeliveryStatus.Created:
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
    case DeliveryStatus.PickedUp:
      return 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
    case DeliveryStatus.Delivered:
      return 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300';
    case DeliveryStatus.Canceled:
      return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300';
  }
}
