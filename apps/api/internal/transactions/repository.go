package transactions

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

func mapTransactionRow(row sqlc.FinancialTransaction) *FinancialTransaction {
	return &FinancialTransaction{
		ID:              row.ID,
		CargoID:         row.CargoID,
		Currency:        row.Currency,
		Description:     row.Description,
		Amount:          row.Amount,
		Type:            TransactionType(row.Type),
		Status:          TransactionStatus(row.Status),
		TransactionDate: row.TransactionDate,
		CreatedAt:       row.CreatedAt,
		UpdatedAt:       row.UpdatedAt,
	}
}

func (r *Repository) Create(ctx context.Context, dto *CreateTransactionDTO) (*FinancialTransaction, error) {
	row, err := r.querier.CreateFinancialTransaction(ctx, sqlc.CreateFinancialTransactionParams(*dto))
	if err != nil {
		return nil, err
	}
	transaction := mapTransactionRow(row)
	return transaction, nil
}

func (r *Repository) Update(ctx context.Context, dto *UpdateTransactionDTO) (*FinancialTransaction, error) {
	row, err := r.querier.UpdateFinancialTransaction(ctx, sqlc.UpdateFinancialTransactionParams(*dto))
	if err != nil {
		return nil, err
	}
	transaction := mapTransactionRow(row)
	return transaction, nil
}
