package transactions

type TransactionStatus string

const (
	TransactionStatusInitiated TransactionStatus = "initiated"
	TransactionStatusCompleted TransactionStatus = "completed"
)
