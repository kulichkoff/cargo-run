package delivery

import (
	"cargorun/db/sqlc"
	"cargorun/internal/db"
	"context"
)

type Repository interface {
	Load(ctx context.Context, id int64) (*Delivery, error)
	Save(ctx context.Context, d *Delivery) error
}

type DeliveryRepository struct {
	querier *sqlc.Queries
}

func NewRepository() Repository {
	return &DeliveryRepository{
		querier: db.GetQuerier(),
	}
}

func (r *DeliveryRepository) Load(ctx context.Context, id int64) (*Delivery, error) {
	row, err := r.querier.GetDelivery(ctx, id)
	if err != nil {
		return nil, err
	}
	cargoRows, err := r.querier.ListCargoByDelivery(ctx, sqlc.ListCargoByDeliveryParams{
		DeliveryID: id,
		Limit:      100,
		Offset:     0,
	})
	if err != nil {
		return nil, err
	}
	cargoList := make([]CargoItem, len(cargoRows))
	for i, cargo := range cargoRows {
		cargoList[i] = CargoItem{
			id:          cargo.ID,
			description: cargo.Description,
			category:    cargo.Category,
			weightKg:    cargo.Weight,
			volumeM3:    cargo.Volume,
		}
	}
	return &Delivery{
		pickupAddress:    row.PickupAddress,
		deliveryAddress:  row.DeliveryAddress,
		pickupTime:       row.PickupTime,
		deliveryDeadline: row.DeliveryDeadline,
		driverID:         row.DriverID,
		truckID:          row.TruckID,
		customerID:       row.CustomerID,
		status:           DeliveryStatus(row.Status),
		cargo:            cargoList,
	}, nil
}

func (r *DeliveryRepository) Save(ctx context.Context, d *Delivery) error {
	conn := db.GetPool()
	tx, _ := conn.Begin(ctx)
	q := r.querier.WithTx(tx)
	defer tx.Rollback(ctx)

	var err error
	var newDelivery sqlc.Delivery
	if d.id == 0 {
		newDelivery, err = q.CreateDelivery(ctx, sqlc.CreateDeliveryParams{
			PickupAddress:    d.pickupAddress,
			DeliveryAddress:  d.deliveryAddress,
			PickupTime:       d.pickupTime,
			DeliveryDeadline: d.deliveryDeadline,
			DriverID:         d.driverID,
			TruckID:          d.truckID,
			CustomerID:       d.customerID,
		})
	} else {
		newDelivery, err = q.UpdateDelivery(ctx, sqlc.UpdateDeliveryParams{
			ID:               d.id,
			PickupAddress:    &d.pickupAddress,
			DeliveryAddress:  &d.deliveryAddress,
			PickupTime:       d.pickupTime,
			DeliveryDeadline: &d.deliveryDeadline,
			Status:           (*string)(&d.status),
			DriverID:         d.driverID,
			TruckID:          d.truckID,
			CustomerID:       d.customerID,
		})
	}
	if err != nil {
		return err
	}
	d.id = newDelivery.ID
	err = r.saveCargo(ctx, q, d)
	return tx.Commit(ctx)
}

func (r *DeliveryRepository) saveCargo(ctx context.Context, q sqlc.Querier, d *Delivery) error {
	for _, cargoItem := range d.cargo {
		if cargoItem.id == 0 {
			q.CreateCargo(ctx, sqlc.CreateCargoParams{
				Weight:      cargoItem.weightKg,
				Volume:      cargoItem.volumeM3,
				Category:    cargoItem.category,
				Description: cargoItem.description,
				DeliveryID:  d.id,
			})
		} else {
			// TODO update cargo
		}
	}
	return nil
}
