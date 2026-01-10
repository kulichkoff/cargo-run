package cargos

import "time"

type createCargoDTO struct {
	AddressSequence []string  `json:"addressSequence"`
	EmployeeID      int64     `json:"employeeId"`
	VehicleID       int64     `json:"vehicleId"`
	StartDate       time.Time `json:"startDate"`
	DeadlineDate    time.Time `json:"deadlineDate"`
	Price           float64   `json:"price"`
	PaymentStatus   int64     `json:"paymentStatus"`
}
