package deliveryapp

import (
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
	repo delivery.Repository
}

func NewService(repo delivery.Repository) *DeliveryService {
	return &DeliveryService{
		repo: repo,
	}
}

func (s *DeliveryService) CreateDelivery(
	ctx context.Context,
	cmd CreateDeliveryCommand,
) error {

	d, err := delivery.New(
		cmd.PickupAddress,
		cmd.DeliveryAddress,
		cmd.DeliveryDeadline,
		toDomainCargo(cmd.Cargo),
		cmd.CustomerID,
	)
	if err != nil {
		return err
	}

	if err := s.repo.Save(ctx, d); err != nil {
		return err
	}

	return nil
}
