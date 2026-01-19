package deliveryhttp

import "time"

type CreateDeliveryRequest struct {
	PickupAddress    string               `json:"pickupAddress"`
	DeliveryAddress  string               `json:"deliveryAddress"`
	DeliveryDeadline time.Time            `json:"deliveryDeadline"`
	Cargo            []CreateCargoRequest `json:"cargo"`
	CustomerID       *int64               `json:"customerId"`
}

type CreateCargoRequest struct {
	Description string   `json:"description"`
	Category    string   `json:"category"`
	WeightKg    *float64 `json:"weightKg"`
	VolumeM3    *float64 `json:"volumeM3"`
}
