export interface TruckModel {
  id: number;
  plateNumber: string;
  make: string;
  model: string | null;
  vin: string | null;
  year: number | null;
  createdAt: Date;
  updatedAt: Date;
}
