package deliveryhttp

import "time"

type CreateDeliveryRequest struct {
	PickupAddress    string               `json:"pickupAddress"`
	DeliveryAddress  string               `json:"deliveryAddress"`
	DeliveryDeadline time.Time            `json:"deliveryDeadline"`
	PickupTime       *time.Time           `json:"pickupTime"`
	Cargo            []CreateCargoRequest `json:"cargo"`
	CustomerID       *int64               `json:"customerId"`
}

type CreateCargoRequest struct {
	Description string   `json:"description"`
	Category    string   `json:"category"`
	WeightKg    *float64 `json:"weightKg"`
	VolumeM3    *float64 `json:"volumeM3"`
}

type DeliveryListItemResponse struct {
	ID               string    `json:"id"`
	Status           string    `json:"status"`
	PickupAddress    string    `json:"pickupAddress"`
	DeliveryAddress  string    `json:"deliveryAddress"`
	DeliveryDeadline time.Time `json:"deliveryDeadline"`
}

type ListDeliveriesResponse struct {
	Items    []DeliveryListItemResponse `json:"items"`
	Page     int                        `json:"page"`
	PageSize int                        `json:"pageSize"`
	Total    int64                      `json:"total"`
}

type AssignDriverRequest struct {
	DriverID int `json:"driverId"`
}

type AssignTruckRequest struct {
	TruckID int `json:"truckId"`
}
