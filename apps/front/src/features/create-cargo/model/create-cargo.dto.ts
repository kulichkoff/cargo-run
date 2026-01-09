import { CargoModel } from '@/entities/cargo';

export type CreateCargoDTO = Omit<CargoModel, 'id' | 'createdAt'>;
