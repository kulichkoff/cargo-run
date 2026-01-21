package transactionsapp

import (
	"cargorun/internal/domain/transactions"
	transactionsrepo "cargorun/internal/infra/db/transactions"
	"context"
)

type CreateTransactionCommand struct {
	TransactionsRepo *transactionsrepo.TransactionsRepository

	Amount      float64
	Description string
	Category    string
	Type        string
	Status      *string
	Deliveries  []int64
}

func (c *CreateTransactionCommand) Execute(ctx context.Context) error {
	t, err := transactions.New(transactions.NewTransactionParams{
		Amount:          c.Amount,
		Description:     c.Description,
		Category:        c.Category,
		TransactionType: c.Type,
		ForDeliveries:   c.Deliveries,
	})
	if err != nil {
		return err
	}

	if *c.Status == string(transactions.TransactionStatusCompleted) {
		if err := t.MarkCompleted(); err != nil {
			return err
		}
	}
	return c.TransactionsRepo.Save(ctx, t)
}
