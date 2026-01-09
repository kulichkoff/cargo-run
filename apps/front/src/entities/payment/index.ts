export enum PaymentStatus {
  Canceled = -10,
  Failed = -1,
  Pending = 0,
  Paid = 10,
}

export const PaymentStatusIterable = [
  PaymentStatus.Canceled,
  PaymentStatus.Failed,
  PaymentStatus.Pending,
  PaymentStatus.Paid,
];

export function getPaymentStatusLabels(): Record<PaymentStatus, string> {
  return {
    [PaymentStatus.Canceled]: 'Отменен',
    [PaymentStatus.Failed]: 'Ошибка',
    [PaymentStatus.Pending]: 'В процессе',
    [PaymentStatus.Paid]: 'Оплачено',
  };
}
