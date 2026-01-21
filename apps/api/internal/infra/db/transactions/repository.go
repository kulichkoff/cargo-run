package transactionsrepo

import (
	"cargorun/db/sqlc"
	"cargorun/internal/domain/transactions"
	"context"
	"log/slog"

	"github.com/jackc/pgx/v5/pgxpool"
)

type TransactionsRepository struct {
	tx *pgxpool.Pool
}

func New(tx *pgxpool.Pool) *TransactionsRepository {
	return &TransactionsRepository{
		tx: tx,
	}
}

func (r *TransactionsRepository) Load(
	ctx context.Context,
	id int64,
) (*transactions.Transaction, error) {
	q := sqlc.New(r.tx)
	row, err := q.GetTransaction(ctx, id)
	if err != nil {
		return nil, err
	}
	deliveriesRows, err := q.ListDeliveriesByTransaction(ctx, id)
	if err != nil {
		return nil, err
	}
	deliveriesIDs := r.mapDeliveriesToIDs(deliveriesRows)
	transaction, err := transactions.New(transactions.NewTransactionParams{
		ID:              row.ID,
		Amount:          row.Amount,
		Description:     *row.Description,
		Category:        *row.Category,
		TransactionType: row.Type,
		ForDeliveries:   deliveriesIDs,
	})
	return transaction, err
}

func (r *TransactionsRepository) mapDeliveriesToIDs(deliveries []sqlc.Delivery) []int64 {
	result := make([]int64, len(deliveries))
	for i, row := range deliveries {
		result[i] = row.ID
	}
	return result
}

func (r *TransactionsRepository) Save(
	ctx context.Context,
	t *transactions.Transaction,
) error {
	tx, err := r.tx.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)
	q := sqlc.New(tx)

	var newTransaction sqlc.Transaction
	if t.ID == 0 {
		// Save
		newTransaction, err = q.CreateTransaction(ctx, sqlc.CreateTransactionParams{
			Amount:      t.Amount,
			Currency:    t.Currency,
			Description: &t.Description,
			Category:    &t.Category,
			Type:        string(t.TransactionType),
			Status:      string(t.Status),
		})
		t.ID = newTransaction.ID
		if err := r.saveDeliveriesRef(ctx, q, t); err != nil {
			slog.ErrorContext(
				ctx,
				"Failed to save deliveries refs for new transaction",
				slog.Any("transaction", t),
			)
			return err
		}
	} else {
		// Update
		newTransaction, err = q.UpdateTransaction(ctx, sqlc.UpdateTransactionParams{
			ID:          t.ID,
			Amount:      &t.Amount,
			Currency:    &t.Currency,
			Description: &t.Description,
			Category:    &t.Category,
			Type:        (*string)(&t.TransactionType),
			Status:      (*string)(&t.Status),
		})
		// TODO update deliveries list
	}
	if err != nil {
		return err
	}
	return tx.Commit(ctx)
}

func (r *TransactionsRepository) saveDeliveriesRef(
	ctx context.Context,
	q sqlc.Querier,
	t *transactions.Transaction,
) error {
	paramsList := make([]sqlc.LinkDeliveriesTransactionsParams, len(t.CoveredDeliveriesIDs))
	for i, dID := range t.CoveredDeliveriesIDs {
		paramsList[i] = sqlc.LinkDeliveriesTransactionsParams{
			DeliveryID:    dID,
			TransactionID: t.ID,
		}
	}
	_, err := q.LinkDeliveriesTransactions(ctx, paramsList)
	return err
}
