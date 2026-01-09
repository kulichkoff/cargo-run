package employees

import (
	"cargorun/db/sqlc"
	"context"
)

type Repository struct {
	querier sqlc.Querier
}

func NewRepository(querier sqlc.Querier) *Repository {
	return &Repository{
		querier: querier,
	}
}

func (r *Repository) mapEmployeeRow(row sqlc.Employee) *EmployeeModel {
	return &EmployeeModel{
		ID:        row.ID,
		FirstName: row.FirstName,
		LastName:  row.LastName,
		CreatedAt: row.CreatedAt,
		UpdatedAt: row.UpdatedAt,
	}
}

func (r *Repository) Create(ctx context.Context, dto *createEmployeeDTO) (*EmployeeModel, error) {
	row, err := r.querier.CreateEmployee(ctx, sqlc.CreateEmployeeParams{
		FirstName: dto.FirstName,
		LastName:  dto.LastName,
	})
	if err != nil {
		return nil, err
	}
	return r.mapEmployeeRow(row), nil
}

func (r *Repository) List(ctx context.Context) ([]*EmployeeModel, error) {
	rows, err := r.querier.ListEmployees(ctx, sqlc.ListEmployeesParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		return nil, err
	}
	employeesList := make([]*EmployeeModel, len(rows))
	for i, row := range rows {
		employeesList[i] = r.mapEmployeeRow(row)
	}
	return employeesList, nil
}
