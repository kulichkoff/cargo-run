package cargos

import "time"

type createCargoDTO struct {
	AddressSequence []string  `json:"addressSequence"`
	EmployeeID      int64     `json:"employeeId"`
	CustomerID      int64     `json:"customerId"`
	VehicleID       int64     `json:"vehicleId"`
	StartDate       time.Time `json:"startDate"`
	DeadlineDate    time.Time `json:"deadlineDate"`
	Price           float64   `json:"price"`
}

type updateCargoDTO struct {
	AddressSequence []string   `json:"addressSequence"`
	EmployeeID      *int64     `json:"employeeId"`
	VehicleID       *int64     `json:"vehicleId"`
	CustomerID      *int64     `json:"customerId"`
	StartDate       *time.Time `json:"startDate"`
	DeadlineDate    *time.Time `json:"deadlineDate"`
	Price           *float64   `json:"price"`
	PaymentStatus   *int32     `json:"paymentStatus"`
}
