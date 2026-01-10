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
    address_sequence = COALESCE(sqlc.narg(address_sequence), address_sequence),
    employee_id = COALESCE(sqlc.narg(employee_id), employee_id),
    vehicle_id = COALESCE(sqlc.narg(vehicle_id), vehicle_id),
    start_date = COALESCE(sqlc.narg(start_date), start_date),
    deadline_date = COALESCE(sqlc.narg(deadline_date), deadline_date),
    price = COALESCE(sqlc.narg(price), price),
    payment_status = COALESCE(sqlc.narg(payment_status), payment_status),
    updated_at = now()
WHERE id = $1
RETURNING *;
