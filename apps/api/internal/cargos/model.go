package cargos

import "time"

type CargoModel struct {
	ID              int64     `json:"id"`
	AddressSequence []string  `json:"addressSequence"`
	EmployeeID      int64     `json:"employeeId"`
	VehicleID       int64     `json:"vehicleId"`
	StartDate       time.Time `json:"startDate"`
	DeadlineDate    time.Time `json:"deadlineDate"`
	Price           float64   `json:"price"`
	PaymentStatus   int32     `json:"paymentStatus"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}
