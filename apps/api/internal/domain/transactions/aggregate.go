package transactions

type Transaction struct {
	ID                   int64
	Amount               float64
	Currency             string
	Description          string
	Category             string
	TransactionType      TransactionType
	Status               TransactionStatus
	CoveredDeliveriesIDs []int64
}

type NewTransactionParams struct {
	ID              int64
	Amount          float64
	Description     string
	Category        string
	TransactionType string
	ForDeliveries   []int64
}

func New(params NewTransactionParams) (*Transaction, error) {
	// Validation

	if err := ValidateTransactionType(params.TransactionType); err != nil {
		return nil, err
	}

	// Create and return
	return &Transaction{
		Amount:               params.Amount,
		Currency:             "RUB",
		Description:          params.Description,
		Category:             params.Category,
		TransactionType:      TransactionType(params.TransactionType),
		Status:               TransactionStatusInitiated,
		CoveredDeliveriesIDs: params.ForDeliveries,
	}, nil
}

func (t *Transaction) MarkCompleted() error {
	t.Status = TransactionStatusCompleted
	return nil
}
