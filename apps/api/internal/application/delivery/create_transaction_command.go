package deliveryapp

import (
	"cargorun/internal/domain/transactions"
	transactionsrepo "cargorun/internal/infra/db/transactions"
	"context"
)

type CreateTransactionCommand struct {
	TransactionRepo *transactionsrepo.TransactionsRepository

	DeliveryID  int64
	Amount      float64
	Description string
	Category    string
	Type        string
	Status      string
}

func (c *CreateTransactionCommand) Execute(ctx context.Context) error {
	t, err := transactions.New(transactions.NewTransactionParams{
		Amount:          c.Amount,
		Description:     c.Description,
		Category:        c.Category,
		TransactionType: c.Type,
		ForDeliveries:   []int64{c.DeliveryID},
	})
	if err != nil {
		return err
	}

	if c.Status == string(transactions.TransactionStatusCompleted) {
		if err := t.MarkCompleted(); err != nil {
			return err
		}
	}

	return c.TransactionRepo.Save(ctx, t)
}
