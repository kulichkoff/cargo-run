import { TransactionStatus } from "./transaction-status.enum";
import { TransactionType } from "./transaction-type.enum";

export interface CreateTransactionDto {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  deliveries: number[];
  /**
   * @default TransactionStatus.Completed
   */
  status?: TransactionStatus;
}
