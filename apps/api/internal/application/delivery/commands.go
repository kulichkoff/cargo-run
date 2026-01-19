package deliveryapp

import "time"

type CreateDeliveryCommand struct {
	PickupAddress    string
	DeliveryAddress  string
	DeliveryDeadline time.Time
	PickupTime       *time.Time
	CustomerID       *int64
	Cargo            []CreateCargoItem
}

type CreateCargoItem struct {
	WeightKg    *float64
	VolumeM3    *float64
	Description string
	Category    string
}
