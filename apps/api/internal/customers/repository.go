package customers

import (
	"cargorun/db/sqlc"
	"context"
)

type CustomersRepository struct {
	querier sqlc.Querier
}

func NewRepository(querier sqlc.Querier) *CustomersRepository {
	return &CustomersRepository{
		querier: querier,
	}
}

func (r *CustomersRepository) Create(ctx context.Context, dto *createCustomerDTO) (*CustomerModel, error) {
	row, err := r.querier.CreateCustomer(ctx, sqlc.CreateCustomerParams(*dto))
	if err != nil {
		return nil, err
	}

	customer := CustomerModel(row)
	return &customer, nil
}

func (r *CustomersRepository) List(ctx context.Context) ([]CustomerModel, error) {
	rows, err := r.querier.ListCustomers(ctx, sqlc.ListCustomersParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		return nil, err
	}

	customers := make([]CustomerModel, len(rows))
	for i, row := range rows {
		customers[i] = CustomerModel(row)
	}
	return customers, nil
}
