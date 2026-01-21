package delivery

import (
	"time"
)

type NewCargoItem struct {
	weightKG    *float64
	volumeM3    *float64
	description string
	category    string
}

func CreateNewCargoItem(
	category string,
	description string,
	weightKG *float64,
	volumeM3 *float64,
) NewCargoItem {
	return NewCargoItem{
		weightKG:    weightKG,
		volumeM3:    volumeM3,
		description: description,
		category:    category,
	}
}

type Delivery struct {
	id               int64
	pickupAddress    string
	deliveryAddress  string
	pickupTime       *time.Time
	deliveryDeadline time.Time
	driverID         *int64
	truckID          *int64
	customerID       *int64
	status           DeliveryStatus
	cargo            []CargoItem
}

type NewDeliveryParams struct {
	PickupAddress    string
	DeliveryAddress  string
	PickupTime       *time.Time
	DeliveryDeadline time.Time
	CustomerID       *int64
	InitialCargo     []NewCargoItem
}

func New(params NewDeliveryParams) (*Delivery, error) {

	d := &Delivery{
		status:           StatusCreated,
		pickupAddress:    params.PickupAddress,
		deliveryAddress:  params.DeliveryAddress,
		deliveryDeadline: params.DeliveryDeadline,
		customerID:       params.CustomerID,
	}

	for _, c := range params.InitialCargo {
		d.addCargo(c)
	}

	return d, nil
}

func (d *Delivery) addCargo(c NewCargoItem) {
	d.cargo = append(d.cargo, newCargoItem(
		c.description,
		c.category,
		c.weightKG,
		c.volumeM3,
	))
}

func (d *Delivery) ID() int64 {
	return d.id
}

func (d *Delivery) AddCargoItem(
	description string,
	category string,
	weightKg *float64,
	volumeM3 *float64,
) error {

	if d.status != StatusCreated {
		return ErrCargoModificationNotAllowed
	}

	d.cargo = append(d.cargo, newCargoItem(
		description,
		category,
		weightKg,
		volumeM3,
	))
	return nil
}

func (d *Delivery) AssignDriver(id int64) error {
	if d.status == StatusDelivered || d.status == StatusCanceled {
		return ErrAssignmentNotAllowed
	}
	d.driverID = &id
	return nil
}

func (d *Delivery) AssignTruck(id int64) error {
	if d.status == StatusDelivered || d.status == StatusCanceled {
		return ErrAssignmentNotAllowed
	}
	d.truckID = &id
	return nil
}

func (d *Delivery) MarkPickedUp(pickUpTime *time.Time) error {
	if d.status != StatusCreated {
		return ErrInvalidStateTransition
	}
	pTime := pickUpTime
	if pTime == nil {
		now := time.Now()
		pTime = &now
	}
	d.pickupTime = pTime
	d.status = StatusPickedUp
	return nil
}

func (d *Delivery) MarkDelivered() error {
	if d.status != StatusPickedUp {
		return ErrInvalidStateTransition
	}
	d.status = StatusDelivered
	return nil
}

func (d *Delivery) Cancel() error {
	if d.status == StatusDelivered {
		return ErrCancelNotAllowed
	}
	d.status = StatusCanceled
	return nil
}
