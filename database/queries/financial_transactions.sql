-- name: CreateFinancialTransaction :one
INSERT INTO financial_transactions (
    amount,
    cargo_id,
    type,
    status,
    transaction_date
) VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: UpdateFinancialTransaction :one
UPDATE financial_transactions
SET
    amount = COALESCE(sqlc.narg(amount), amount),
    type = COLESCE(sqlc.narg(type), type),
    status = COLESCE(sqlc.narg(status), status),
    transaction_date = COLESCE(sqlc.narg(transaction_date), transaction_date),
    updated_at = now()
WHERE id = $1
RETURNING *;
