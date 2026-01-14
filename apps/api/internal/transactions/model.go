package transactions

import "time"

type TransactionType string

const (
	TransactionTypeIncome   TransactionType = "income"
	TransactionTypeExpense  TransactionType = "expence"
	TransactionTypeTransfer TransactionType = "transfer"
)

type TransactionStatus string

const (
	TransactionStatusCompleted TransactionStatus = "completed"
	TransactionStatusPending   TransactionStatus = "pending"
)

type FinancialTransaction struct {
	ID              int64             `json:"id"`
	CargoID         int64             `json:"cargoId"`
	Currency        *string           `json:"currency"`
	Description     *string           `json:"description"`
	Amount          float64           `json:"amount"`
	Type            TransactionType   `json:"type"`
	Status          TransactionStatus `json:"status"`
	TransactionDate time.Time         `json:"transactionDate"`
	CreatedAt       time.Time         `json:"createdAt"`
	UpdatedAt       time.Time         `json:"updatedAt"`
}
