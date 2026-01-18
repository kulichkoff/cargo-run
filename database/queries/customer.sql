-- name: CreateCustomer :one
INSERT INTO customer (
    company_name,
    company_type,
    inn,
    kpp,
    ogrn
) VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: ListCustomers :many
SELECT * FROM customer
ORDER BY created_at
LIMIT $1 OFFSET $2;
