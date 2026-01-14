-- name: CreateFinancialTransaction :one
INSERT INTO financial_transactions (
    amount,
    cargo_id,
    type,
    status,
    transaction_date,
    description
) VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: UpdateFinancialTransaction :one
UPDATE financial_transactions
SET
    amount = COALESCE(sqlc.narg(amount), amount),
    type = COALESCE(sqlc.narg(type), type),
    status = COALESCE(sqlc.narg(status), status),
    description = COALESCE(sqlc.narg(description), description),
    transaction_date = COALESCE(sqlc.narg(transaction_date), transaction_date),
    updated_at = now()
WHERE id = $1
RETURNING *;
