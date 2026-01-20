package deliveryapp

import (
	"cargorun/db/sqlc"
	"cargorun/internal/domain/delivery"
	"context"
)

func toDomainCargo(cargo []CreateCargoItem) []delivery.NewCargoItem {
	newCargoItems := make([]delivery.NewCargoItem, len(cargo))
	for i, cg := range cargo {
		newCargoItems[i] = delivery.CreateNewCargoItem(
			cg.Category,
			cg.Description,
			cg.WeightKg,
			cg.VolumeM3,
		)
	}
	return newCargoItems
}

type DeliveryService struct {
	repo    delivery.Repository
	querier sqlc.Queries
}

func NewService(
	repo delivery.Repository,
	querier sqlc.Queries,
) *DeliveryService {
	return &DeliveryService{
		repo:    repo,
		querier: querier,
	}
}

func (s *DeliveryService) CreateDelivery(
	ctx context.Context,
	cmd CreateDeliveryCommand,
) error {

	d, err := delivery.New(delivery.NewDeliveryParams{
		PickupTime:       cmd.PickupTime,
		PickupAddress:    cmd.PickupAddress,
		DeliveryAddress:  cmd.DeliveryAddress,
		DeliveryDeadline: cmd.DeliveryDeadline,
		CustomerID:       cmd.CustomerID,
		InitialCargo:     toDomainCargo(cmd.Cargo),
	})
	if err != nil {
		return err
	}

	if err := s.repo.Save(ctx, d); err != nil {
		return err
	}

	return nil
}

func (s *DeliveryService) ListDeliveries(
	ctx context.Context,
	query ListDeliveriesQuery,
) (*ListDeliveriesResult, error) {
	offset := query.Limit * (query.Page - 1)
	rows, err := s.querier.ListDeliveriesDetailed(
		ctx,
		sqlc.ListDeliveriesDetailedParams{
			Limit:  query.Limit,
			Offset: offset,
		})
	if err != nil {
		return nil, err
	}

	list := make([]DeliveryListItem, len(rows))
	for i, row := range rows {
		list[i] = DeliveryListItem{
			ID:               row.ID,
			Status:           row.Status,
			PickupAddress:    row.PickupAddress,
			DeliveryAddress:  row.DeliveryAddress,
			PickupTime:       row.PickupTime,
			DeliveryDeadline: row.DeliveryDeadline,
		}
		if row.DriverID != nil {
			list[i].Driver = &DeliveryListDriver{
				ID:        *row.DriverID,
				FirstName: *row.DriverFirstName,
				LastName:  *row.DriverLastName,
			}
		}
		if row.TruckID != nil {
			list[i].Truck = &DeliveryListTruck{
				ID:          *row.TruckID,
				PlateNumber: *row.TruckPlateNumber,
				Make:        row.TruckMake,
			}
		}
		if row.CustomerID != nil {
			list[i].Customer = &DeliveryListCustomer{
				ID:          *row.CustomerID,
				CompanyType: *row.CustomerCompanyType,
				CompanyName: *row.CustomerCompanyName,
				INN:         *row.CustomerInn,
				KPP:         *row.CustomerKpp,
				OGRN:        *row.CustomerOgrn,
			}
		}
	}

	return &ListDeliveriesResult{
		Hits:     list,
		Page:     int(query.Page),
		PageSize: int(query.Limit),
		Total:    -1,
	}, nil
}
