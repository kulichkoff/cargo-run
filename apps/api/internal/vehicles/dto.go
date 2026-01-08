package vehicles

type createVehicleDTO struct {
	PlateNumber     string  `json:"plateNumber"`
	Make            *string `json:"make,omitempty"`
	Model           *string `json:"model,omitempty"`
	Vin             *string `json:"vin,omitempty"`
	ManufactureYear *uint   `json:"manufactureYear,omitempty"`
}
