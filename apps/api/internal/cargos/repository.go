package cargos

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type CargosRepository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *CargosRepository {
	return &CargosRepository{
		pool: pool,
	}
}

func (r *CargosRepository) CreateCargo(ctx context.Context, dto *createCargoDTO) (*CargoModel, error) {
	row := r.pool.QueryRow(ctx, "insert into cargos (address_sequence, employee_id, vehicle_id, start_date, deadline_date, price, payment_status) values ($1, $2, $3, $4, $5, $6, $7) returning id, created_at", dto.AddressSequence, dto.EmployeeID, dto.VehicleID, dto.StartDate, dto.DeadlineDate, dto.Price, dto.PaymentStatus)
	cargo := &CargoModel{
		AddressSequence: dto.AddressSequence,
		EmployeeID:      dto.EmployeeID,
		VehicleID:       dto.VehicleID,
		StartDate:       dto.StartDate,
		DeadlineDate:    dto.DeadlineDate,
		Price:           dto.Price,
		PaymentStatus:   dto.PaymentStatus,
	}
	err := row.Scan(&cargo.ID, &cargo.CreatedAt)
	cargo.UpdatedAt = cargo.CreatedAt
	return cargo, err
}

func (r *CargosRepository) ListCargos(ctx context.Context) ([]*CargoModel, error) {
	rows, err := r.pool.Query(ctx, "select id, address_sequence, employee_id, vehicle_id, start_date, deadline_date, price, payment_status, created_at, updated_at from cargos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	employees := make([]*CargoModel, 0, 32)
	for rows.Next() {
		cargo := &CargoModel{}
		rows.Scan(&cargo.ID, &cargo.AddressSequence, &cargo.EmployeeID, &cargo.VehicleID, &cargo.StartDate, &cargo.DeadlineDate, &cargo.Price, &cargo.PaymentStatus, &cargo.CreatedAt, &cargo.UpdatedAt)
		employees = append(employees, cargo)
	}
	return employees, err

}
