package vehicles

type createVehicleDTO struct {
	PlateNumber     string  `json:"plateNumber"`
	Make            *string `json:"make,omitempty"`
	Model           *string `json:"model,omitempty"`
	Vin             *string `json:"vin,omitempty"`
	ManufactureYear *int32   `json:"manufactureYear,omitempty"`
}
