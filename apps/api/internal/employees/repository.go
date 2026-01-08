package employees

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type EmployeeRepository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *EmployeeRepository {
	return &EmployeeRepository{
		pool: pool,
	}
}

func (r *EmployeeRepository) CreateEmployee(ctx context.Context, dto *createEmployeeDTO) (*EmployeeModel, error) {
	row := r.pool.QueryRow(ctx, "insert into employees (first_name, last_name) values ($1, $2) returning id, first_name, last_name, created_at, updated_at", dto.FirstName, dto.LastName)
	employee := &EmployeeModel{}
	err := row.Scan(&employee.ID, &employee.FirstName, &employee.LastName, &employee.CreatedAt, &employee.UpdatedAt)
	return employee, err
}

func (r *EmployeeRepository) ListEmployees(ctx context.Context) ([]*EmployeeModel, error) {
	rows, err := r.pool.Query(ctx, "select id, first_name, last_name, created_at, updated_at from employees")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	employees := make([]*EmployeeModel, 0, 32)
	for rows.Next() {
		employee := &EmployeeModel{}
		rows.Scan(&employee.ID, &employee.FirstName, &employee.LastName, &employee.CreatedAt, &employee.UpdatedAt)
		employees = append(employees, employee)
	}
	return employees, err
}
