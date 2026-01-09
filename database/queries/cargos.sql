-- name: CreateCargo :one
INSERT INTO cargos (
    address_sequence,
    employee_id,
    vehicle_id,
    start_date,
    deadline_date,
    price
) VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetCargo :one
SELECT * FROM cargos
WHERE id = $1;

-- name: ListCargos :many
SELECT * FROM cargos
ORDER BY created_at
LIMIT $1 OFFSET $2;

-- name: UpdateCargo :one
UPDATE cargos
SET
    address_sequence = $2,
    employee_id = $3,
    vehicle_id = $4,
    start_date = $5,
    deadline_date = $6,
    price = $7,
    payment_status = $8,
    updated_ad = now()
WHERE id = $1
RETURNING *;
