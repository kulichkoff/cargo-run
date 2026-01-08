package cargos

import "time"

type createCargoDTO struct {
	AddressSequence []string  `json:"addressSequence"`
	EmployeeID      int       `json:"employeeId"`
	VehicleID       int       `json:"vehicleId"`
	StartDate       time.Time `json:"startDate"`
	DeadlineDate    time.Time `json:"deadlineDate"`
	Price           float64   `json:"price"`
	PaymentStatus   int       `json:"paymentStatus"`
}
