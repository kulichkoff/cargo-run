package cargos

import (
	"cargorun/db/sqlc"
	"cargorun/internal/customers"
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
		CustomerID:      dto.CustomerID,
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
		CustomerID:      dto.CustomerID,
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

func (r *CargosRepository) ListDetailed(ctx context.Context) ([]*CargoDetailed, error) {
	rows, err := r.querier.ListCargosDetailed(ctx, sqlc.ListCargosDetailedParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		return nil, err
	}
	cargos := make([]*CargoDetailed, len(rows))
	for i, row := range rows {
		cargos[i] = &CargoDetailed{
			ID:              row.ID,
			AddressSequence: row.AddressSequence,
			Employee: map[string]interface{}{
				"id":        row.EmployeeID,
				"firstName": row.EmployeeFirstName,
				"lastName":  row.EmployeeLastName,
			},
			Vehicle: map[string]interface{}{
				"id":          row.VehicleID,
				"make":        row.VehicleMake,
				"plateNumber": row.VehiclePlateNumber,
			},
			Customer: customers.CustomerModel{
				ID:          row.CustomerID,
				CompanyName: row.CustomerCompanyName,
				CompanyType: row.CustomerCompanyType,
				Inn:         row.CustomerInn,
				Kpp:         row.CustomerKpp,
				Ogrn:        row.CustomerOgrn,
			},
			StartDate:     row.StartDate,
			DeadlineDate:  row.DeadlineDate,
			Price:         row.Price,
			PaymentStatus: row.PaymentStatus,
			CreatedAt:     row.CreatedAt,
			UpdatedAt:     row.UpdatedAt,
		}
	}
	return cargos, nil
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
