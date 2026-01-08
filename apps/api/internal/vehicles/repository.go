package vehicles

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type VehicleRepository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *VehicleRepository {
	return &VehicleRepository{
		pool: pool,
	}
}

func (r *VehicleRepository) CreateVehicle(ctx context.Context, dto *createVehicleDTO) (*VehicleModel, error) {
	row := r.pool.QueryRow(ctx, "insert into vehicles (plate_number, make, model, vin, manufacture_year) values ($1, $2, $3, $4, $5) returning id, plate_number, make, model, vin, manufacture_year, created_at, updated_at", dto.PlateNumber, dto.Make, dto.Model, dto.Vin, dto.ManufactureYear)
	vehicle := &VehicleModel{}
	err := row.Scan(&vehicle.ID, &vehicle.PlateNumber, &vehicle.Make, &vehicle.Model, &vehicle.Vin, &vehicle.ManufactureYear, &vehicle.CreatedAt, &vehicle.UpdatedAt)
	return vehicle, err
}

func (r *VehicleRepository) ListVehicles(ctx context.Context) ([]*VehicleModel, error) {
	rows, err := r.pool.Query(ctx, "select id, plate_number, make, model, vin, manufacture_year, created_at, updated_at from vehicles")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	vehicles := make([]*VehicleModel, 0, 32)
	for rows.Next() {
		vehicle := &VehicleModel{}
		rows.Scan(&vehicle.ID, &vehicle.PlateNumber, &vehicle.Make, &vehicle.Model, &vehicle.Vin, &vehicle.ManufactureYear, &vehicle.CreatedAt, &vehicle.UpdatedAt)
		vehicles = append(vehicles, vehicle)
	}
	return vehicles, err
}
