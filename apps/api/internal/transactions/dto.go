package transactions

import (
	"cargorun/db/sqlc"
)

type CreateTransactionDTO sqlc.CreateFinancialTransactionParams

type UpdateTransactionDTO sqlc.UpdateFinancialTransactionParams
