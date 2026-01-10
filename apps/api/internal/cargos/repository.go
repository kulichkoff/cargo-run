package cargos

import (
	"cargorun/db/sqlc"
	"context"
)

type CargosRepository struct {
	querier sqlc.Querier
}

func NewRepository(querier sqlc.Querier) *CargosRepository {
	return &CargosRepository{
		querier: querier,
	}
}

func (r *CargosRepository) mapCargoRow(dto sqlc.Cargo) *CargoModel {
	return &CargoModel{
		ID:              dto.ID,
		AddressSequence: dto.AddressSequence,
		EmployeeID:      dto.EmployeeID,
		VehicleID:       dto.VehicleID,
		StartDate:       dto.StartDate,
		DeadlineDate:    dto.DeadlineDate,
		Price:           dto.Price,
		PaymentStatus:   dto.PaymentStatus,
		CreatedAt:       dto.CreatedAt,
		UpdatedAt:       dto.UpdatedAt,
	}
}

func (r *CargosRepository) Create(ctx context.Context, dto *createCargoDTO) (*CargoModel, error) {
	row, err := r.querier.CreateCargo(ctx, sqlc.CreateCargoParams{
		AddressSequence: dto.AddressSequence,
		EmployeeID:      dto.EmployeeID,
		VehicleID:       dto.VehicleID,
		StartDate:       dto.StartDate,
		DeadlineDate:    dto.DeadlineDate,
		Price:           dto.Price,
	})
	if err != nil {
		return nil, err
	}
	return r.mapCargoRow(row), nil
}

func (r *CargosRepository) List(ctx context.Context) ([]*CargoModel, error) {
	rows, err := r.querier.ListCargos(ctx, sqlc.ListCargosParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		return nil, err
	}
	cargos := make([]*CargoModel, len(rows))
	for i, row := range rows {
		cargos[i] = r.mapCargoRow(row)
	}
	return cargos, err

}

func (r *CargosRepository) Get(ctx context.Context, id int64) (*CargoModel, error) {
	row, err := r.querier.GetCargo(ctx, id)
	if err != nil {
		return nil, err
	}
	return r.mapCargoRow(row), nil
}

func (r *CargosRepository) Update(ctx context.Context, id int64, dto *updateCargoDTO) (*CargoModel, error) {
	row, err := r.querier.UpdateCargo(ctx, sqlc.UpdateCargoParams{
		ID:              id,
		AddressSequence: dto.AddressSequence,
		EmployeeID:      dto.EmployeeID,
		VehicleID:       dto.VehicleID,
		StartDate:       dto.StartDate,
		DeadlineDate:    dto.DeadlineDate,
		Price:           dto.Price,
		PaymentStatus:   dto.PaymentStatus,
	})
	if err != nil {
		return nil, err
	}
	return r.mapCargoRow(row), nil
}
