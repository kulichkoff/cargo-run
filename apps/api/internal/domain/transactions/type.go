package transactions

type TransactionType string

const (
	TransactionTypeIncome  TransactionType = "income"
	TransactionTypeExpense TransactionType = "expense"
)

func ValidateTransactionType(transactionType string) error {
	switch transactionType {
	case
		string(TransactionTypeIncome),
		string(TransactionTypeExpense):
		return nil
	default:
		return ErrUnexpectedType
	}
}
