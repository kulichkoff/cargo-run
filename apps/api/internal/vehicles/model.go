package vehicles

import "time"

type VehicleModel struct {
	ID              int64       `json:"id"`
	PlateNumber     string    `json:"plateNumber"`
	Make            *string   `json:"make,omitempty"`
	Model           *string   `json:"model,omitempty"`
	Vin             *string   `json:"vin,omitempty"`
	ManufactureYear *int32     `json:"manufactureYear,omitempty"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}
