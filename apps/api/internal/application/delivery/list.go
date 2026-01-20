package deliveryapp

import "time"

type DeliveryListDriver struct {
	ID        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type DeliveryListTruck struct {
	ID          int64   `json:"id"`
	PlateNumber string  `json:"plateNumber"`
	Make        *string `json:"make"`
}

type DeliveryListCustomer struct {
	ID          int64  `json:"id"`
	CompanyType string `json:"companyType"`
	CompanyName string `json:"companyName"`
	INN         string `json:"inn"`
	KPP         string `json:"kpp"`
	OGRN        string `json:"ogrn"`
}

type DeliveryListItem struct {
	ID               int64                 `json:"id"`
	Status           string                `json:"status"`
	PickupAddress    string                `json:"pickupAddress"`
	DeliveryAddress  string                `json:"deliveryAddress"`
	PickupTime       *time.Time            `json:"pickupTime"`
	DeliveryDeadline time.Time             `json:"deliveryDeadline"`
	Driver           *DeliveryListDriver   `json:"driver"`
	Truck            *DeliveryListTruck    `json:"truck"`
	Customer         *DeliveryListCustomer `json:"customer"`
}

type ListDeliveriesResult struct {
	Hits     []DeliveryListItem `json:"hits"`
	Page     int                `json:"page"`
	PageSize int                `json:"pageSize"`
	Total    int64              `json:"total"`
}
