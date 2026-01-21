-- name: GetTransaction :one
SELECT * FROM transaction
WHERE id = $1;

-- name: CreateTransaction :one
INSERT INTO transaction (
    amount,
    currency,
    description,
    category,
    type,
    status
) VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: UpdateTransaction :one
UPDATE transaction
SET
    amount = COALESCE(sqlc.narg(amount), amount),
    currency = COALESCE(sqlc.narg(currency), currency),
    description = COALESCE(sqlc.narg(description), description),
    category = COALESCE(sqlc.narg(category), category),
    type = COALESCE(sqlc.narg(type), type),
    status = COALESCE(sqlc.narg(status), status),
    updated_at = NOW()
WHERE id = $1
RETURNING *;
