package cargos

import "time"

type CargoModel struct {
	ID              int       `json:"id"`
	AddressSequence []string  `json:"addressSequence"`
	EmployeeID      int       `json:"employeeId"`
	VehicleID       int       `json:"vehicleId"`
	StartDate       time.Time `json:"startDate"`
	DeadlineDate    time.Time `json:"deadlineDate"`
	Price           float64   `json:"price"`
	PaymentStatus   int       `json:"paymentStatus"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}
