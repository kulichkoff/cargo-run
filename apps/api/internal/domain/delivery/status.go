package delivery

type DeliveryStatus string

const (
	StatusCreated   DeliveryStatus = "created"
	StatusPickedUp  DeliveryStatus = "picked_up"
	StatusDelivered DeliveryStatus = "delivered"
	StatusCanceled  DeliveryStatus = "canceled"
)
