package vehicles

import (
	"cargorun/db/sqlc"
	"context"
)

type VehicleRepository struct {
	queries sqlc.Querier
}

func NewRepository(querier sqlc.Querier) *VehicleRepository {
	return &VehicleRepository{
		queries: querier,
	}
}

func (r *VehicleRepository) mapVehicleRow(vehicleRow sqlc.Vehicle) *VehicleModel {
	return &VehicleModel{
		ID:              vehicleRow.ID,
		PlateNumber:     vehicleRow.PlateNumber,
		Make:            vehicleRow.Make,
		Model:           vehicleRow.Model,
		Vin:             vehicleRow.Vin,
		ManufactureYear: vehicleRow.ManufactureYear,
		CreatedAt:       vehicleRow.CreatedAt,
		UpdatedAt:       vehicleRow.UpdatedAt,
	}
}

func (r *VehicleRepository) CreateVehicle(ctx context.Context, dto *createVehicleDTO) (*VehicleModel, error) {
	params := sqlc.CreateVehicleParams{
		PlateNumber:     dto.PlateNumber,
		Make:            dto.Make,
		Model:           dto.Model,
		Vin:             dto.Vin,
		ManufactureYear: dto.ManufactureYear,
	}
	vehicleRow, err := r.queries.CreateVehicle(ctx, params)
	if err != nil {
		return nil, err
	}
	return r.mapVehicleRow(vehicleRow), nil
}

func (r *VehicleRepository) ListVehicles(ctx context.Context) ([]*VehicleModel, error) {
	vehiclesRows, err := r.queries.ListVehicles(ctx, sqlc.ListVehiclesParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		return nil, err
	}

	vehicles := make([]*VehicleModel, len(vehiclesRows))
	for i, row := range vehiclesRows {
		vehicles[i] = r.mapVehicleRow(row)
	}
	return vehicles, nil
}
