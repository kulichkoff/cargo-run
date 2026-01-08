export interface VehicleModel {
  id: number;
  plateNumber: string;
  /**
   * e.g. Volvo, Isuzu, Renault, Man
   */
  make?: string;
  model?: string;
  manufactureYear?: number;
  vin?: string;

  /**
   * It may also contain these fields:
   *
   * - max_payload_weight in kg / tons
   * - cargo_volume in cubic meters (CBM)
   * - body_type Open, Closed, Container, Refrigerated, Flatbed, Tanker
   * - refrigeration_supported
   * - temperature_range (if refridgerated)
   */
}

export type CreateVehicleDTO = Omit<VehicleModel, 'id'>;
