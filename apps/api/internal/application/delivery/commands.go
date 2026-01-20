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

type ListDeliveriesQuery struct {
	Limit int32
	Page  int32
}

type AssignDriverCommand struct {
	DeliveryID int64
	DriverID   int64
}
type AssignTruckCommand struct {
	DeliveryID int64
	TruckID    int64
}
